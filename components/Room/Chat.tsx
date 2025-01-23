/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Create a Socket.IO client instance
const clientSocket = io('http://localhost:3000'); // Replace with your server URL if needed

interface ChatProps {
  userName: string;
  roomId: string;
  roomCreator: string;  // New prop to store the room creator's name
}

const Chat: React.FC<ChatProps> = ({ userName, roomId, roomCreator }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ user: string; text: string; time: string; to?: string }[]>([]);
  const [users, setUsers] = useState<{ user: string; joinTime: string }[]>([]); // Updated to store user join times
  const [userJoinTime, setUserJoinTime] = useState<string>(''); // Store join time of the current user
  const [roomCreationTime, setRoomCreationTime] = useState<string>(''); // Store room creation time
  const [privateMessageTo, setPrivateMessageTo] = useState<string>(''); // Store the user to send private message

  useEffect(() => {
    // Retrieve the join time from localStorage for the current user
    const joinTime = localStorage.getItem(`joinTime-${userName}`);
    if (joinTime) {
      setUserJoinTime(joinTime); // Set the join time when component loads
    }

    // Set the room creation time from localStorage for the room creator
    const creationTime = localStorage.getItem(`roomCreationTime-${roomCreator}`);
    if (creationTime) {
      setRoomCreationTime(creationTime); // Set the room creation time when component loads
    }

    // Retrieve the list of users from localStorage
    const currentUsers = JSON.parse(localStorage.getItem('currentUsers') || '[]');
    setUsers(currentUsers.map((userName: string) => ({ user: userName, joinTime: '' })));

    // Join the room
    clientSocket.emit('joinRoom', { userName, roomId });

    // Emit the 'userJoined' message when the user joins
    const currentTime = new Date().toLocaleTimeString();
    localStorage.setItem(`joinTime-${userName}`, currentTime); // Save the join time to localStorage
    clientSocket.emit('userJoined', { user: userName, joinTime: currentTime });

    // If this is the room creator, save the room creation time
    if (!creationTime) {
      const roomCreationTime = new Date().toLocaleString();
      localStorage.setItem(`roomCreationTime-${roomCreator}`, roomCreationTime); // Save the room creation time to localStorage
      setRoomCreationTime(roomCreationTime);
    }

    // Listen for updated user list with join times
    clientSocket.on('roomUsers', ({ users }: { users: { user: string; joinTime: string }[] }) => {
      setUsers(users);
    });

    // Listen for new messages
    clientSocket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Listen for user join notifications
    clientSocket.on('userJoined', ({ user, joinTime }: { user: string; joinTime: string }) => {
      setMessages((prev) => [
        ...prev,
        { user: 'System', text: `${user} entered the room at ${joinTime}.`, time: new Date().toLocaleTimeString() },
      ]);
    });

    // Listen for user leave notifications
    clientSocket.on('userLeft', ({ user }: { user: string }) => {
      setMessages((prev) => [
        ...prev,
        { user: 'System', text: `${user} left the room.`, time: new Date().toLocaleTimeString() },
      ]);
    });

    return () => {
      // Notify server on disconnect
      clientSocket.emit('leaveRoom', { userName, roomId });
      clientSocket.off('message');
      clientSocket.off('roomUsers');
      clientSocket.off('userJoined');
      clientSocket.off('userLeft');
    };
  }, [roomId, userName, roomCreator]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const currentTime = new Date().toLocaleTimeString();
    const newMessage = {
      user: userName,
      text: message,
      roomId,
      time: currentTime,
      to: privateMessageTo || undefined, // Send a private message if "privateMessageTo" is set
    };

    // Emit the message
    clientSocket.emit('chatMessage', newMessage);

    setMessages((prev) => [...prev, newMessage]); // Update local state
    setMessage(''); // Clear input
  };

  return (
    <div>
      <div
        style={{
          border: '1px solid black',
          padding: '10px',
          marginBottom: '10px',
        }}
      >
        <h3>Room: {roomId}</h3>
        <p>
          <strong>Room Created by {roomCreator}</strong> at {roomCreationTime}
        </p>
        <ul>
          {users.map((user, index) => (
            <li key={index} style={{ color: user.user === userName ? 'blue' : 'black' }}>
              {user.user} {user.user === userName && '(You)'} - Joined at {user.joinTime}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          height: '150px',
          overflowY: 'scroll',
          border: '1px solid black',
          padding: '10px',
          marginBottom: '10px',
        }}
      >
        {userJoinTime && (
          <p>
            <strong style={{ color: 'green' }}>You joined at {userJoinTime}</strong>
          </p>
        )}
        {messages.map((msg, index) => (
          <p
            key={index}
            style={{
              color: msg.user === userName ? 'blue' : msg.to ? 'purple' : 'black', // Different color based on sender or private message
              fontWeight: msg.user === userName ? 'bold' : 'normal',
            }}
          >
            <strong>{msg.user}</strong> {msg.to ? `(To ${msg.to})` : ''}: {msg.text}{' '}
            <span style={{ fontSize: '0.8rem', color: 'gray' }}>({msg.time})</span>
          </p>
        ))}
      </div>

      <div>
        <label htmlFor="privateUser">Send private message to: </label>
        <select
          id="privateUser"
          value={privateMessageTo}
          onChange={(e) => setPrivateMessageTo(e.target.value)}
        >
          <option value="">Select a user</option>
          {users.map((user, index) => (
            <option key={index} value={user.user}>
              {user.user}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: '80%' }}
      />
      <button onClick={sendMessage} style={{ marginLeft: '10px' }}>
        Send
      </button>
    </div>
  );
};

export default Chat;
