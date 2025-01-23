/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner"; // Import Sonner for notifications

const StadtLandFlussGame = () => {
  const [category, setCategory] = useState<string>("City");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set()); // Track used words
  const [inputValue, setInputValue] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false); // Game Over state

  const startGame = () => {
    setCategory("City"); // You can randomly select a category from a list
    const letters = ["A", "B", "C", "D", "E"]; // Just an example, expand as needed
    setSelectedLetter(letters[Math.floor(Math.random() * letters.length)]);
    setScore(0);
    setTimeLeft(10);
    setUsedWords(new Set());
    setGameOver(false); // Reset game over state
  };

  const submitAnswer = () => {
    if (!inputValue) {
      toast.error("Please enter a word!"); // Error notification
      return;
    }

    if (inputValue.charAt(0).toUpperCase() !== selectedLetter) {
      toast.error(`The word must start with ${selectedLetter}!`); // Error notification for letter mismatch
      return;
    }

    if (usedWords.has(inputValue.toLowerCase())) {
      toast.error("This word has already been used!"); // Error notification for used word
      return;
    }

    // Add word to used words and increase score
    setUsedWords((prev) => new Set(prev.add(inputValue.toLowerCase())));
    setScore((prev) => prev + 10); // Increment score
    toast.success("Great job!"); // Success notification

    setInputValue(""); // Clear input after submission
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && !gameOver) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameOver(true); // Game over when time is up
      toast.info("Time's up!"); // Time's up notification
    }

    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <motion.div
        className="w-full max-w-lg p-6 rounded-lg shadow-lg bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          exit={{ y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
            Stadt-Land-Fluss (City, Country, River, etc.)
          </h2>
          <p className="text-center mb-4 text-gray-600">
            একটি জনপ্রিয় পেন-এন্ড-পেপার গেম যা সাধারণত বন্ধুদের সাথে খেলা হয়। এটি একটি দ্রুত-গতির শব্দ খোঁজার গেম যেখানে খেলোয়াড়দেরকে একটি নির্দিষ্ট বিষয়ের উপর ভিত্তি করে শব্দ খুঁজে বের করতে হয়।
          </p>
          <Button
            onClick={startGame}
            color="primary"
            fullWidth
            size="lg"
            className="mb-6"
            disabled={gameOver} // Disable button when game is over
          >
            Start Game
          </Button>
        </motion.div>

        {/* Game Section */}
        {!gameOver ? (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-center text-lg font-medium">Category: {category}</h3>
            <h3 className="text-center text-lg font-medium mb-4">
              Select a word starting with: {selectedLetter}
            </h3>

            <Input
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Enter a word starting with ${selectedLetter}`}
              isClearable
              aria-label="Word input"
              className="mb-4"
            />

            <Button
              onClick={submitAnswer}
              color="secondary"
              fullWidth
              size="lg"
              disabled={!inputValue}
            >
              Submit Word
            </Button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-center">Time Left: {timeLeft}s</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-center">Score: {score}</h2>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
              Game Over!
            </h2>
            <h3 className="text-center text-lg font-medium mb-4">
              Your Final Score: {score}
            </h3>
            <Button
              onClick={startGame}
              color="primary"
              fullWidth
              size="lg"
            >
              Restart Game
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default StadtLandFlussGame;
