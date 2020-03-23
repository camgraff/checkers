const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.port || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const initialBoard = require("./initialBoardConfig");

var roomsMap = {};
var socketToRoom = {};

io.on('connection', (socket) => {
    console.log(socket.id + ' connected');

    socket.emit('connection');

    socket.on('join-room', (room,) => {
        socket.join(room);
        // Initialize room
        if (io.sockets.adapter.rooms[room].length === 1) {
            roomsMap[room] = {
                board: initialBoard,
                player1: null,
                player2: null,
                turn: 1
            };
        }
        // Make sure the game is not already full
        if (io.sockets.adapter.rooms[room].length > 2) {
            socket.leave(room);
            socket.emit('err', 'This game already has 2 players');
            socket.disconnect();
        } else {
            // Assign the user a player position
            if (roomsMap[room].player1 === null) {
                roomsMap[room].player1 = socket.id;
                socket.emit('player-number', 1);
                if (roomsMap[room].turn === 1) {
                    socket.emit('endturn');
                }
            } else {
                roomsMap[room].player2 = socket.id;
                socket.emit('player-number', 2);
                if (roomsMap[room].turn === 2) {
                    socket.emit('endturn');
                }
            }
            socketToRoom[socket.id] = room;

            // Send initial board config
            socket.emit('boardConfig', roomsMap[room].board);
        }
    });

    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
        if (!roomsMap[socketToRoom[socket.id]]) {
            return;
        }
        if (roomsMap[socketToRoom[socket.id]].player1 === socket.id) {
            roomsMap[socketToRoom[socket.id]].player1 = null;
        } else if (roomsMap[socketToRoom[socket.id]].player2 === socket.id){
            roomsMap[socketToRoom[socket.id]].player2 = null;
        }
    });

    socket.on('boardConfig', (board) => {
        roomsMap[socketToRoom[socket.id]].board = board; 
    });
    
    socket.on('move', (cell, piece) => {
        socket.to(socketToRoom[socket.id]).emit('move', cell, piece);
    });

    socket.on('endturn', () => {
        socket.to(socketToRoom[socket.id]).emit('endturn');
        if (roomsMap[socketToRoom[socket.id]].turn === 1) {
            roomsMap[socketToRoom[socket.id]].turn = 2;
        } else {
            roomsMap[socketToRoom[socket.id]].turn = 1;
        }
    });
});

app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
