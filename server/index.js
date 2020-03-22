const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.port || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    
    socket.on('move', (cell, piece) => {
        socket.broadcast.emit('move', cell, piece);
    })
});



app.use(router);

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
