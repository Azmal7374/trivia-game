/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"

import { Button } from "@nextui-org/button";
import { useState } from "react";

const dummyQuestions = [
  {
    question: "What is the capital of Germany?",
    options: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
    correct: 0,
  },
  {
    question: "What is the capital of Pakistan?",
    options: ["Islamabad", "Karachi", "Lahore", "Peshawar"],
    correct: 0,
  },
  {
    question: "What is the capital of Bangladesh?",
    options: ["Dhaka", "Chittagong", "Khulna", "Sylhet"],
    correct: 0,
  },
];

const Game = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null); // Explicit type annotation

  const handleNext = () => {
    setSelectedOption(null);
    setCurrentQuestion((prev) => prev + 1);
  };

  const question = dummyQuestions[currentQuestion];
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-6 w-3/4">
        <div>
          <h1 className="text-xl font-bold">{question.question}</h1>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <Button
                key={index}
                className={`${
                  selectedOption === index ? "bg-blue-500" : ""
                }`}
                onClick={() => setSelectedOption(index)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Button onClick={handleNext}>Next Question</Button>
    </div>
  );
};

export default Game;
