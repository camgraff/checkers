const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.port || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

var connectionMap = {
    'player1': null,
    'player2': null
};

var currentBoard = null;
var whoseTurn = 'player1';

io.on('connection', (socket) => {
    if (io.engine.clientsCount > 2) {
        socket.emit('err', { message: 'reach the limit of connections' });
        socket.disconnect();
        console.log('Disconnected...');
        return;
    }

    if (currentBoard !== null) {
        socket.emit('boardConfig', currentBoard);
    }

    socket.emit('connection');
    console.log('User connected');

    if (connectionMap.player1 === null) {
        connectionMap.player1 = socket.id;
        socket.emit('player-number', 1);
        if (whoseTurn == 'player1') {
            socket.emit('endturn');
        }
    } else {
        connectionMap.player2 = socket.id;
        socket.emit('player-number', 2);
        if (whoseTurn == 'player2') {
            socket.emit('endturn');
        }
    }

    socket.on('boardConfig', (board) => {
        currentBoard = board;
    });
    

    socket.on('disconnect', () => {
        console.log('User disconnected');
        if (connectionMap.player1 === socket.id) {
            connectionMap.player1 = null;
        } else {
            connectionMap.player2 = null;
        }
        if (io.engine.clientsCount === 0) {
            reset();
        }
    });
    
    socket.on('move', (cell, piece) => {
        socket.broadcast.emit('move', cell, piece);
    });

    socket.on('endturn', () => {
        socket.broadcast.emit('endturn');
        if (whoseTurn === 'player1') {
            whoseTurn = 'player2';
        } else {
            whoseTurn = 'player1';
        }
    });
});

function reset() {
    currentBoard = null;
    whoseTurn = 'player1';
}



app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
