/* eslint-disable react/jsx-sort-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
"use client";
import { useEffect, useState } from "react";
import Chat from "@/components/Room/Chat";
import Quiz from "@/components/Room/Quiz";
import { Button } from "@nextui-org/button";
import { QRCodeCanvas } from "qrcode.react";

interface QuizRoomProps {
  onResetRoom: () => void;
}

const Room: React.FC<QuizRoomProps> = ({ onResetRoom }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [username, setUsername] = useState("");
  const [quizzes, setQuizzes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [roomId, setRoomId] = useState(""); // Room ID from localStorage
  const [currentUsers, setCurrentUsers] = useState<string[]>([]); // List of current users
  const [quizEnded, setQuizEnded] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("roomCreator") || "";
    const storedQuizzes = JSON.parse(
      localStorage.getItem("selectedQuizzes") || "[]"
    );
    const storedRoomId = localStorage.getItem("roomId");

    if (!storedRoomId) {
      alert("No Room ID found. Please create or join a room from the Home page.");
      window.location.href = "/";
      return;
    }

    const storedUsers = JSON.parse(
      localStorage.getItem("currentUsers") || "[]"
    );

    // Clean the stored username (trim extra quotes or spaces)
    const cleanName = storedName.replace(/["']/g, "").trim();

    // Check if username is valid and not empty
    if (!storedUsers.includes(cleanName) && cleanName !== "") {
      const updatedUsers = [...storedUsers, cleanName];
      localStorage.setItem("currentUsers", JSON.stringify(updatedUsers));
      setUsername(cleanName);
      setWelcomeMessage(`Welcome to the room, ${cleanName}!`);
    } else {
      setUsername(cleanName);
      setWelcomeMessage(`Welcome back, ${cleanName}!`);
    }

    setQuizzes(storedQuizzes);
    setRoomId(storedRoomId);
    setCurrentUsers(storedUsers);
    setSelectedCategory(storedQuizzes);
  }, []);

  const roomCreator = JSON.parse(
    localStorage.getItem("roomCreator") || "[]"
  );

  const handleStartQuiz = () => {
    if (selectedCategory.length > 0) {
      setQuizStarted(true);
      setQuizEnded(false);
    }
  };

  const handleResetQuiz = () => {
    setQuizStarted(false);
    setQuizEnded(false);
  };

  return (
    <div className="px-4 sm:px-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-6">
        <div className="text-center sm:text-left">
          <h1 className="text-xl font-bold">Quiz Room: {roomId}</h1>
          <h2 className="text-lg font-semibold">Lobby Leader: {roomCreator}</h2>
          <p className="text-gray-600">{welcomeMessage}</p>
        </div>

        {/* QR Code Section */}
        {roomId && (
          <div className="flex flex-col items-center sm:items-end">
            <QRCodeCanvas
              value={`${window.location.origin}/room?roomId=${roomId}`}
              size={128} // Smaller size for QR Code
              className="shadow-md"
            />
            <p className="text-sm text-gray-600 mt-2 hidden">
              {`${window.location.origin}/room?roomId=${roomId}`}
            </p>
          </div>
        )}

  {/* Current Users Section */}
  <div className=" bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold ">Current Users:</h3>
        <ul className="list-decimal list-inside">
          {currentUsers.map((user, index) => (
            <li
              key={index}
              className=" text-blue-700 px-3 py-1 rounded-md"
            >
              {user}
            </li>
          ))}
        </ul>
      </div>
      </div>

    

      {/* Quiz Section */}
      <div className="w-full mt-10 p-4 bg-gray-50 rounded-md shadow-lg">
        {quizStarted ? (
          <div>
            <Quiz quizCategory={selectedCategory} />
            {quizEnded && (
              <div className="mt-4 text-center">
                <h3>Quiz Ended!</h3>
                <Button
                  onClick={handleResetQuiz}
                  className="w-32 bg-green-500 text-white hover:bg-green-600"
                >
                  Reset Room
                </Button>
              </div>
            )}
          </div>
        ) : (
          !quizEnded && (
            <div>
              <h3 className="text-lg font-semibold">
                Select a Category to Start Quiz:
              </h3>
              <div className="flex flex-col gap-4 mt-4">
                {selectedCategory.length > 0 ? (
                  <Button
                    onClick={handleStartQuiz}
                    className="w-32 bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Start Quiz
                  </Button>
                ) : (
                  <p className="text-gray-600">
                    No categories available. Add categories below.
                  </p>
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* Chat Section */}
      <div className="mt-12">
        <Chat userName={username} roomId={roomId} roomCreator="" />
      </div>
    </div>
  );
};

export default Room;
