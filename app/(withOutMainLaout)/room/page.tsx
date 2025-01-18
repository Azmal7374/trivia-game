/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
"use client";

import Chat from "@/components/Room/Chat";
import Quiz from "@/components/Room/Quiz";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";

interface QuizRoomProps {
  onResetRoom: () => void;
}

const Room: React.FC<QuizRoomProps> = ({ onResetRoom }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [username, setUsername] = useState("");
  const [quizzes, setQuizzes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [roomId, setRoomId] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // Track current category
  const [timer, setTimer] = useState(10); // Timer for each question (default 10)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null); // Timer interval to be cleared
  const [isLocked, setIsLocked] = useState(false); // Lock timer after answer
  const [quizEnded, setQuizEnded] = useState(false); // Flag to track quiz completion

  // Generate a unique room name
  const generateUniqueRoomName = () => {
    return `Room-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  useEffect(() => {
    // Retrieve user and room data from localStorage
    const storedTimer = parseInt(localStorage.getItem("roomTimer") || "10", 10); // Defaults to 10 if not found
    const storedName = localStorage.getItem("username") || "Unknown User";
    const storedQuizzes = JSON.parse(localStorage.getItem("selectedQuizzes") || "[]");
    let storedRoomId = localStorage.getItem("roomId");
    if (!storedRoomId) {
      // Generate a new room name if not available in localStorage
      storedRoomId = generateUniqueRoomName();
      localStorage.setItem("roomId", storedRoomId);
    }

    setUsername(storedName);
    setQuizzes(storedQuizzes);
    setRoomId(storedRoomId);
    setSelectedCategory(storedQuizzes); // Store selected categories
    setTimer(storedTimer); // Initialize timer from localStorage
  }, []);

  useEffect(() => {
    if (quizStarted && timer > 0 && !isLocked) {
      // Set up the timer for each question
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval); // Stop the timer when it reaches 0
            handleNextQuestion(); // Move to the next question
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000); // Decrease the timer every second

      setTimerInterval(interval);

      return () => clearInterval(interval); // Clear the interval when quiz ends or when moving to the next question
    }
  }, [quizStarted, timer, isLocked]);

  const handleStartQuiz = () => {
    if (selectedCategory.length > 0) {
      setQuizStarted(true);
      setCurrentCategoryIndex(0); // Start with the first category
      setCurrentQuestionIndex(0);
      setQuizEnded(false); // Reset quiz ended state
      setTimer(parseInt(localStorage.getItem("roomTimer") || "10", 10)); // Reset timer
      setIsLocked(false); // Unlock timer when starting quiz
    }
  };

  const handleLockInAnswer = () => {
    setIsLocked(true); // Lock the timer after answering
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < quizzes.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimer(parseInt(localStorage.getItem("roomTimer") || "10", 10)); // Reset timer for the next question
      setIsLocked(false); // Unlock the timer for the next question
    } else {
      if (currentCategoryIndex + 1 < selectedCategory.length) {
        // Move to the next category quiz
        setCurrentCategoryIndex((prev) => prev + 1);
        setCurrentQuestionIndex(0); // Reset question index
        setTimer(parseInt(localStorage.getItem("roomTimer") || "10", 10)); // Reset timer
        setIsLocked(false); // Unlock timer
      } else {
        setQuizStarted(false); // End quiz when all categories are completed
        setQuizEnded(true); // Mark quiz as ended
      }
    }
  };

  const handleResetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setCurrentCategoryIndex(0); // Reset category index
    setQuizEnded(false); // Reset quiz ended state
    setTimer(parseInt(localStorage.getItem("roomTimer") || "10", 10)); // Reset timer
    setIsLocked(false); // Unlock timer
  };

  return (
    <div className="px-10">
      <div className="flex items-center justify-center gap-20">
        <div className="text-center mt-4">
          <h1>Quiz Room: {roomId}</h1>
          <p>Welcome, {username}!</p>
          <p>Saved Categories: {quizzes.join(", ") || "No categories saved."}</p>
        </div>
        <div>
          <h3>Current Users:</h3>
          <ul>
            <li>{username}</li>
          </ul>
        </div>
      </div>

      <div className="w-full mt-10 p-4 bg-gray-100 rounded-md shadow-lg">
        {quizStarted ? (
          <>
            <div className="text-center">
              <h2>Category: {selectedCategory[currentCategoryIndex]}</h2>
              <h3>Time Left: {timer}s</h3>
            </div>
            <div className="mt-6">
              <Quiz
                quizCategory={selectedCategory[currentCategoryIndex]}
                currentQuestionIndex={currentQuestionIndex}
                onNextQuestion={handleNextQuestion}
                onLockInAnswer={handleLockInAnswer}
              />
            </div>
            {quizEnded && (
              <div className="mt-4 text-center">
                <h3>Quiz Ended!</h3>
                <Button onClick={handleResetQuiz} className="w-32 bg-green-500 text-white hover:bg-green-600">
                  Reset Room
                </Button>
              </div>
            )}
          </>
        ) : (
          !quizEnded && (
            <>
              <h3 className="text-lg font-semibold">Select a Category to Start Quiz:</h3>
              <div className="flex flex-col gap-4 mt-4">
                {selectedCategory.length > 0 ? (
                  <Button
                    onClick={handleStartQuiz}
                    className="w-32 bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Start Quiz
                  </Button>
                ) : (
                  <p className="text-gray-600">No categories available. Add categories below.</p>
                )}
              </div>
            </>
          )
        )}
      </div>

      <div className="mt-12">
        <Chat userName={username} roomId={roomId} />
      </div>
    </div>
  );
};

export default Room;
