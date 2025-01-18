/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client"

import { Button } from "@nextui-org/button";

const Lobby = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Create a Lobby</h1>
      <Button
        onClick={() => (window.location.href = "/game")}
        className="mb-4"
      >
        Start Quiz
      </Button>
      <p className="text-sm text-gray-500">
        Share the QR code to allow players to join your lobby.
      </p>
    </div>
    );
};

export default Lobby;