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

    const intervalTime = setInterval(() => {
        const time = new Date().toISOString();
        socket.emit('serverTime', {time});
    }, 1000);

    const intervalNotifications = setInterval(() => {
        const time = new Date().toISOString();
        socket.emit('notification', {item: 'New notification ' + new Date().getTime() });
    }, 5000);

    const intervalNotInteresting = setInterval(() => {
        const time = new Date().toISOString();
        socket.emit('not-interesting', { title: `you don't need it` });
    }, 5000);

    // 3) Обработчик подключения к комнате
    socket.on('joinRoom', (roomName) => {
        console.log(`🔑 Socket ${socket.id} joining room "${roomName}"`);
        socket.join(roomName);
        if (!socket.roomIntervals) {
            socket.roomIntervals = {};
        }


        // Если в эту комнату никто раньше не отправил сообщений, можно создать новый
        // (в данном примере мы создаём отдельный интервал на каждого клиента, но
        //  для реального приложения обычно делают один глобальный интервал на комнату)
        if (!socket.roomIntervals[roomName]) {
            // Например, раз в 3 секунды посылаем сообщение в комнату
            const roomInterval = setInterval(() => {
                const payload = {
                    room: roomName,
                    message: `Message for room "${roomName}" at ` + new Date().toISOString(),
                };
                // Отправляем во ВСЕ сокеты, которые сейчас в этой комнате:
                io.to(roomName).emit('roomMessage', payload);
            }, 3000);

            socket.roomIntervals[roomName] = roomInterval;
        }
    });

    // 4) Обработчик выхода из комнаты
    socket.on('leaveRoom', (roomName) => {
        console.log(`🚪 Socket ${socket.id} leaving room "${roomName}"`);
        socket.leave(roomName);

        // Очистить interval, если он есть
        if (socket.roomIntervals[roomName]) {
            clearInterval(socket.roomIntervals[roomName]);
            delete socket.roomIntervals[roomName];
        }
    });

    // 5) При окончательном отключении нужно почистить всё
    socket.on('disconnect', () => {
        console.log('❌ Client disconnected:', socket.id);

        clearInterval(intervalTime);
        clearInterval(intervalNotifications);
        clearInterval(intervalNotInteresting);

        // Очищаем все интервалы, которые создавались для комнат
        if (socket.roomIntervals) {
            Object.values(socket.roomIntervals).forEach((intId) => clearInterval(intId));
        }
    });
});

server.listen(3001, () => {
    console.log('🚀 Socket.IO server running on http://localhost:3001');
});
