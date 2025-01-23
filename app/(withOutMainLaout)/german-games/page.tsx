/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client"
import Link from "next/link";
import { motion } from "framer-motion";

const Page = () => {
    return (
        <div className="p-8">
            <div className="text-center">
                <h3 className="text-3xl font-semibold">Choose a Game</h3>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mt-8">
                {/* Game 1 - Quizduell */}
                <Link href="/quizduell" passHref>
                    <motion.div
                        className="w-full sm:w-72 md:w-80 lg:w-96 xl:w-96"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        style={{
                            borderRadius: '10px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        <img
                            src="https://img.freepik.com/free-photo/two-dice_1048-3254.jpg?ga=GA1.1.1302518135.1720608685&semt=ais_hybrid"
                            alt="Quizduell"
                            className="w-full h-auto"
                        />
                        <div className="text-center py-2">
                            <p className="text-xl">Quizduell</p>
                        </div>
                    </motion.div>
                </Link>

                {/* Game 2 - Buchstaben-Battle */}
                <Link href="/buchstaben-battle" passHref>
                    <motion.div
                        className="w-full sm:w-72 md:w-80 lg:w-96 xl:w-96"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        style={{
                            borderRadius: '10px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        <img
                            src="https://img.freepik.com/free-photo/wooden-domino-keys-with-letter-printed-them-out-wooden-box_114579-84991.jpg?ga=GA1.1.1302518135.1720608685&semt=ais_hybrid"
                            alt="Buchstaben Battle"
                            className="w-full h-auto"
                        />
                        <div className="text-center py-2">
                            <p className="text-xl">Buchstaben-Battle</p>
                        </div>
                    </motion.div>
                </Link>

                {/* Game 3 - Stadt-Land-Fluss */}
                <Link href="/stadt-land-fluss" passHref>
                    <motion.div
                        className="w-full sm:w-72 md:w-80 lg:w-96 xl:w-96"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        style={{
                            borderRadius: '10px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        <img
                            src="https://img.freepik.com/free-vector/children-ourdoor-nature-background_1308-53705.jpg?ga=GA1.1.1302518135.1720608685&semt=ais_hybrid"
                            alt="Stadt Land Fluss"
                            className="w-full h-auto"
                        />
                        <div className="text-center py-2">
                            <p className="text-xl">Stadt-Land-Fluss</p>
                        </div>
                    </motion.div>
                </Link>
            </div>
        </div>
    );
};

export default Page;
