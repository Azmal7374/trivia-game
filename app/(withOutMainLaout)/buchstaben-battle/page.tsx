/* eslint-disable import/order */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client";
import { getSocket } from "@/utils/socket";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { toast } from "sonner"; // Import Sonner for notifications
import Game from "@/components/Games/Game";

const BuchstabenBattleGame: React.FC = () => {
  const [letters, setLetters] = useState<string[]>(["A", "B", "C", "D"]);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [maxScore, setMaxScore] = useState<number>(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [usedWords, setUsedWords] = useState<Set<string>>(new Set()); // Track used words

  const startGame = () => {
    const socket = getSocket();
    if (socket) {
      socket.emit("startGame");
    }
    setGameStarted(true);
    setScore(0);
    setTimeLeft(30);
    setMaxScore(0);
    setWinner(null);
    setUsedWords(new Set()); // Reset used words for each game
  };

  const submitAnswer = (word: string) => {
    const socket = getSocket();
    
    // Ensure socket is not null before using it
    if (!socket) {
      toast.error("Socket not connected!");
      return;
    }

    // Check if the word has been used already
    if (usedWords.has(word.toLowerCase())) {
      toast.error("This word has already been used!"); // Show error message with Sonner
      return;
    }

    socket.emit("answer", { playerId: socket.id, word });

    // Simulate scoring logic: 10 points for a correct and unique word, bonus for speed
    setScore((prevScore) => prevScore + 10);

    // Add the word to the set of used words
    setUsedWords((prevUsedWords) => new Set(prevUsedWords.add(word.toLowerCase())));

    // Update max score
    if (score + 10 > maxScore) {
      setMaxScore(score + 10);
    }
  };

  useEffect(() => {
    const categories = ["City", "Food", "Animal"];
    setCategory(categories[Math.floor(Math.random() * categories.length)]);
  }, [gameStarted]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && gameStarted) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameStarted) {
      // Declare winner when time is up
      setWinner("Player with highest points!");
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, gameStarted]);

  useEffect(() => {
    if (winner) {
      // Show winner message with Sonner
      toast.success(`${winner} has won with ${maxScore} points!`);
    }
  }, [winner, maxScore]);

  // Randomly select a letter for each round
  useEffect(() => {
    if (gameStarted) {
      const letter = letters[Math.floor(Math.random() * letters.length)];
      setSelectedLetter(letter);
    }
  }, [gameStarted, timeLeft]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <motion.div
        className="w-full max-w-2xl p-6 rounded-lg shadow-lg bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Game onGameStart={startGame} onAnswer={submitAnswer} />

        {!gameStarted ? (
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              onClick={startGame}
              color="primary"
              fullWidth
              size="lg"
              className="mb-4"
            >
              Start Game
            </Button>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Select a word starting with: {selectedLetter}</h2>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div
                key={selectedLetter}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  onClick={() => submitAnswer(selectedLetter!)} // Non-null assertion here
                  color="secondary"
                  size="lg"
                  className="w-24 h-24 h2-xl"
                >
                  {selectedLetter}
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Category: {category}</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Time Left: {timeLeft}s</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Score: {score}</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Max Score: {maxScore}</h2>
            </motion.div>

            {/* Show winner message */}
            {winner && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl text-green-500">
                  {winner} has won with {maxScore} points!
                </h2>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BuchstabenBattleGame;
