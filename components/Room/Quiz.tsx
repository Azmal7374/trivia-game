/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";

interface QuizProps {
  quizCategory: string;
}

const mockQuizzes: Record<string, { question: string; options: string[]; correct: string }[]> = {
  "general knowledge": [
    { question: "What is the capital of France?", options: ["Paris", "Rome", "Berlin"], correct: "Paris" },
    { question: 'Who wrote "1984"?', options: ["Orwell", "Huxley", "Shakespeare"], correct: "Orwell" },
  ],
  science: [
    { question: "What planet is closest to the sun?", options: ["Mars", "Mercury", "Venus"], correct: "Mercury" },
    { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2"], correct: "H2O" },
  ],
  history: [
    { question: "Who was the first president of the USA?", options: ["Lincoln", "Washington", "Jefferson"], correct: "Washington" },
    { question: "In which year did World War II end?", options: ["1945", "1939", "1950"], correct: "1945" },
  ],
};

const Quiz: React.FC<QuizProps> = ({ quizCategory }) => {
  const [timer, setTimer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizzes, setQuizzes] = useState<{ question: string; options: string[]; correct: string }[]>([]);
  // console.log(first)
  useEffect(() => {
    const storedTimer = localStorage.getItem("roomTimer") || "No Timer Set";
    const normalizedQuizCategory = quizCategory?.trim().toLowerCase();
    if (mockQuizzes[normalizedQuizCategory]) {
      setQuizzes(mockQuizzes[normalizedQuizCategory]);
    } 
    else if(storedTimer){
              setTimer(storedTimer);
    }
    else {
      setQuizzes([]);
    }
  },
   [quizCategory]);

  if (!quizCategory) {
    return <div>Please select a quiz category to start.</div>;
  }

  if (quizzes.length === 0) {
    return <div>No quizzes available for the selected category: {quizCategory}</div>;
  }

  const handleLockIn = () => {
    if (selectedOption === quizzes[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }
    if (currentQuestion + 1 < quizzes.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption("");
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-gray-100 rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-4 text-center">Quiz: {quizCategory}</h1>
      {showResult ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          <p className="text-lg">Your Score: {score} / {quizzes.length}</p>
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowResult(false);
              setSelectedOption("");
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-bold">{quizzes[currentQuestion].question}</h2>
            <div className="mt-2">
              {quizzes[currentQuestion].options.map((option) => (
                <label
                  key={option}
                  className={`block p-2 border rounded-md cursor-pointer mb-2 ${
                    selectedOption === option ? "bg-blue-100 border-blue-400" : "hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="quiz-option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={handleLockIn}
            disabled={!selectedOption}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            Lock In
          </button>
          <div className="mt-4 text-center text-gray-600">
            Question {currentQuestion + 1} of {quizzes.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;