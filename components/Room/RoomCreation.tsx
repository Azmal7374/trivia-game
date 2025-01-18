/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

interface RoomCreationProps {
  onRoomCreation: (roomId: string, userName: string, quizCategory: string) => void;
}

const RoomCreation: React.FC<RoomCreationProps> = ({ onRoomCreation }) => {
  const [userName, setUserName] = useState('');
  const [quizCategory, setQuizCategory] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);

  const createRoom = () => {
    const roomId = `ROOM_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    onRoomCreation(roomId, userName, quizCategory);
  };

  return (
    <div>
      <h1>Create Quiz Room</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="Select time limit (minutes)"
        value={timeLimit}
        onChange={(e) => setTimeLimit(parseInt(e.target.value))}
      />
      <br />
      <select value={quizCategory} onChange={(e) => setQuizCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="General Knowledge">General Knowledge</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
      </select>
      <br />
      <button onClick={createRoom}>Create Room</button>
    </div>
  );
};

export default RoomCreation;
