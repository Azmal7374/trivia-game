/* eslint-disable react/jsx-sort-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import  { useEffect, useState } from 'react';
import Quiz from './Quiz';
import Chat from './Chat';

interface QuizRoomProps { 
  roomId: string;
  userName: string;
  quizCategory: string;
  onResetRoom: () => void;
}

const QuizRoom: React.FC<QuizRoomProps> = ({ roomId, quizCategory, onResetRoom }) => {
  const [quizStarted, setQuizStarted] = useState(false);
 // eslint-disable-next-line padding-line-between-statements
  const [username, setUsername] = useState("");
   const [quizzes, setQuizzes] = useState<string[]>([]);
   const [timer, setTimer] = useState("");
 
 useEffect(() => {
    // Retrieve user and room data from localStorage
    const storedName = localStorage.getItem("username") || "Unknown User";
    // const storedQuizzes = JSON.parse(
    //   localStorage.getItem("selectedQuizzes") || "[]"
    // );
    const storedTimer = localStorage.getItem("roomTimer") || "No Timer Set";

    setUsername(storedName);
    // setRoomCode(storedRoomCode);
    // setQuizzes(storedQuizzes);
    setTimer(storedTimer);
  }, []);

  return (
    <div>
      <h1>Quiz Room: {roomId}</h1>
      <p>Welcome, {username}!</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {quizStarted ? (
            <Quiz quizCategory={quizCategory} />
          ) : (
            <button onClick={() => setQuizStarted(true)}>Start Quiz</button>
          )}
        </div>
        <div>
          <h3>Current Users:</h3>
          <ul>
            <li>{username}</li>
          </ul>
        </div>
      </div>
      <Chat userName={username} roomId={roomId} />
      <button onClick={onResetRoom}>Reset Room</button>
    </div>
  );
};

export default QuizRoom;
