/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client"
import { disconnectSocket, getSocket } from "@/utils/socket";
import { useEffect, useState } from "react";

const QuizduellGame: React.FC = () => {
    const [questions, setQuestions] = useState<{ question: string; options: string[] }[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        const socket = getSocket();

        if (socket) {
            // Listen for "answer" event (mocking it)
            socket.on('answer', (data: { playerId: string; answer: string }) => {
                console.log(`Player ${data.playerId} answered: ${data.answer}`);
            });
        }

        // Cleanup on component unmount
        return () => {
            disconnectSocket();
        };
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (timeLeft > 0 && !gameOver) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && !gameOver) {
            handleSubmitAnswer(''); // Automatically submit answer if time runs out
        }

        return () => {
            clearInterval(timer); // Clear timer on component unmount
        };
    }, [timeLeft, gameOver]);

    const startGame = () => {
        const socket = getSocket();

        console.log('Emitting startGame event to the mock socket');
        socket.emit('startGame'); // Emit the startGame event (mocked)

        setQuestions([
            { question: 'What is the capital of Germany?', options: ['Berlin', 'Munich', 'Hamburg'] },
            { question: 'Which planet is closest to the sun?', options: ['Earth', 'Venus', 'Mercury'] },
            { question: 'What is the largest ocean?', options: ['Atlantic', 'Pacific', 'Indian'] },
            { question: 'Who wrote "Romeo and Juliet"?', options: ['Shakespeare', 'Dickens', 'Austen'] },
            { question: 'What is the square root of 64?', options: ['6', '7', '8'] },
            { question: 'Which element has the chemical symbol "O"?', options: ['Oxygen', 'Osmium', 'Ozone'] },
            { question: 'What is the capital of Japan?', options: ['Tokyo', 'Kyoto', 'Osaka'] },
            { question: 'How many continents are there?', options: ['5', '6', '7'] },
            { question: 'Which gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen'] },
            { question: 'What is the hardest natural substance?', options: ['Gold', 'Iron', 'Diamond'] },
        ]);
        setCurrentQuestionIndex(0);
        setScore(0);
        setGameOver(false);
        setTimeLeft(10);
    };

    const handleSubmitAnswer = (answer: string) => {
        const socket = getSocket();

        socket.emit('answer', { playerId: 'player1', answer });

        const correctAnswer = questions[currentQuestionIndex].options[0];
        if (answer === correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(10);
        } else {
            setGameOver(true);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        {!gameOver ? (
            <div className="text-center text-white max-w-lg mx-auto">
                <h1 className="text-4xl font-semibold mb-6">QuizduellGame - কুইজডুয়েল গেমে স্বাগতম!</h1>
                <p className="text-xl mb-4">
                    আপনি কি আপনার জ্ঞানের পরীক্ষা দিতে প্রস্তুত? আসুন শুরু করি!
                </p>
                <p className="text-lg mb-6">
                    প্রতিটি প্রশ্নের জন্য আপনার কাছে 10 সেকেন্ড থাকবে। দ্রুত সঠিক উত্তর দিন এবং স্কোর করুন!
                </p>
                <button
                    className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition-all ease-in-out duration-300"
                    onClick={startGame}
                >
                    গেম শুরু করুন
                </button>
                {currentQuestion && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold">{currentQuestion.question}</h2>
                        <div className="mt-2 text-lg">শুরু হতে বাকি সময়: {timeLeft}s</div>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSubmitAnswer(option)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-200 ease-in-out"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        ) : (
            <div className="text-center text-white max-w-lg mx-auto">
                <h2 className="text-3xl font-semibold mb-4">গেম শেষ!</h2>
                <p className="text-xl mb-4">অভিনন্দন! আপনার চূড়ান্ত স্কোর: {score}</p>
                <p className="text-lg mb-4">
                    আরো ভালো স্কোর করতে চান? নিচে ক্লিক করুন এবং আবার খেলুন!
                </p>
                <button
                    className="bg-green-500 text-white px-6 py-3 rounded-md shadow-md mt-6 hover:bg-green-600 transition-all ease-in-out duration-300"
                    onClick={startGame}
                >
                    আবার খেলুন
                </button>
            </div>
        )}
    </div>
    
    
    
    );
};

export default QuizduellGame;