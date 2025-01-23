/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';

let mockSocket: any = null; // Mock socket object

export const connectSocket = () => {
    if (!mockSocket) {
        console.log('Mock socket connected');
        mockSocket = {
            id: 'mockSocketId', // Mock socket ID
            on: (event: string, callback: Function) => {
                if (event === 'connect') {
                    callback(); // Simulate the connect event
                }
            },
            emit: (event: string, data: any) => {
                console.log(`Mock socket emitted event: ${event}`, data);
            },
            disconnect: () => {
                console.log('Mock socket disconnected');
            },
        };
    }
    return mockSocket;
};

export const disconnectSocket = () => {
    if (mockSocket) {
        mockSocket.disconnect();
        console.log('Mock socket disconnected');
    }
};

export const getSocket = () => {
    if (!mockSocket) {
        console.log('Mock socket not connected, connecting...');
        connectSocket();
    }
    return mockSocket;
};