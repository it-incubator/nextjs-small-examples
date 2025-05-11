const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // replace with your frontend origin
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

io.on('connection', (socket) => {
    console.log('✅ Client connected:', socket.id);

    const interval = setInterval(() => {
        const time = new Date().toISOString();
        socket.emit('serverTime', {time});
    }, 5000);

    socket.on('disconnect', () => {
        console.log('❌ Client disconnected:', socket.id);
        clearInterval(interval);
    });
});

server.listen(3001, () => {
    console.log('🚀 Socket.IO server running on http://localhost:3001');
});
