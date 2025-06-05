// socket.ts
import { io, Socket } from 'socket.io-client';

let sharedSocket: Socket | null = null;

export function getSharedSocket(): Socket {
    if (sharedSocket) return sharedSocket;
    sharedSocket = io('http://localhost:3001');
    return sharedSocket;
}
