/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useChatSocket = (roomId: string, userName: string, isCreator: boolean) => {
  const [messages, setMessages] = useState<
    { user: string; text: string; time: string; isCreator: boolean }[]
  >([]);
  const socket = io('http://localhost:4000');

  useEffect(() => {
    socket.emit('joinRoom', { userName, roomId, isCreator });

    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, userName, isCreator]);

  const sendMessage = (message: string) => {
    if (message.trim()) {
      socket.emit('chatMessage', {
        user: userName,
        text: message,
        roomId,
        time: new Date().toLocaleString(),
        isCreator,
      });
    }
  };

  return { messages, sendMessage };
};

export default useChatSocket;
