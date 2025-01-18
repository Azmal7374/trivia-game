/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";

import React, { useState, useEffect } from "react";

const Home = () => {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [timer, setTimer] = useState("");
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);
  const [currentUsers, setCurrentUsers] = useState<string[]>([]);

  useEffect(() => {
    // Check if there is a list of current users in the localStorage
    const storedUsers = JSON.parse(localStorage.getItem("currentUsers") || "[]");
    setCurrentUsers(storedUsers);
  }, []);

  const handleQuizSelection = (quiz: string) => {
    setSelectedQuizzes((prev) =>
      prev.includes(quiz) ? prev.filter((q) => q !== quiz) : [...prev, quiz]
    );
  };

  const handleCreateRoom = () => {
    if (!name.trim()) {
      alert("Please enter your name before creating a room!");
      return;
    }

    // Check if the user already exists in the current users list
    if (currentUsers.includes(name)) {
      alert("You have already entered this name!");
      return;
    }

    // Add current user to the list of users
    const updatedUsers = [...currentUsers, name];
    setCurrentUsers(updatedUsers);

    // Save user name and room data to localStorage
    localStorage.setItem("username", name);
    localStorage.setItem("roomTimer", timer);
    localStorage.setItem("selectedQuizzes", JSON.stringify(selectedQuizzes));
    localStorage.setItem("currentUsers", JSON.stringify(updatedUsers));

    // Navigate to the room page
    window.location.href = "/room";
  };

  const handleJoinRoom = () => {
    if (!name.trim() || !roomCode.trim()) {
      alert("Please enter your name and room code to join!");
      return;
    }

    // Check if the user already exists in the current users list
    if (currentUsers.includes(name)) {
      alert("You have already entered this name!");
      return;
    }

    // Add current user to the list of users
    const updatedUsers = [...currentUsers, name];
    setCurrentUsers(updatedUsers);

    // Save user name, room code, and updated users list to localStorage
    localStorage.setItem("username", name);
    localStorage.setItem("roomCode", roomCode);
    localStorage.setItem("currentUsers", JSON.stringify(updatedUsers));

    // Navigate to the room page
    window.location.href = "/room";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h2>Quiz App Home</h2>

      {/* Name Input */}
      <div style={{ marginBottom: "20px", width: "300px" }}>
        <p>Name:</p>
        <Input
          placeholder="Pick a name!"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
      </div>

      {/* Main Container */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "800px",
          marginTop: "20px",
        }}
      >
        {/* Create Room */}
        <Card className="p-[20px] w-[350px]">
          <h4>Create Room</h4>
          <Spacer y={0.5} />
          <h2>Question Timer (seconds):</h2>
          <Input
            placeholder="Enter timer duration"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
            fullWidth
          />
          <Spacer y={1} />
          <h2>Select Quizzes:</h2>
          <CheckboxGroup
            value={selectedQuizzes}
            onChange={setSelectedQuizzes}
            className="mt-[20px]"
          >
            <Checkbox value="General Knowledge">General Knowledge</Checkbox>
            <Checkbox value="Science">Science</Checkbox>
            <Checkbox value="History">History</Checkbox>
            <Checkbox value="Geography">Geography</Checkbox>
          </CheckboxGroup>
          <Spacer y={1.5} />
          <Button
            color="primary"
            onPress={() => {
              if (!selectedQuizzes.length) {
                alert("Please select at least one quiz!");
                return;
              }
              // Pass the first selected quiz as the category
              localStorage.setItem("quizCategory", selectedQuizzes[0]);
              handleCreateRoom();
            }}
          >
            Create a Room
          </Button>
        </Card>

        {/* Join Room */}
        <Card className="p-[20px] w-[350px]">
          <h4>Join Room</h4>
          <Spacer y={0.5} />
          <h2>Room Code:</h2>
          <Input
            placeholder="Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            fullWidth
          />
          <Spacer y={1.5} />
          <Button color="primary" onPress={handleJoinRoom}>
            Join a Room
          </Button>
        </Card>
      </div>

      {/* Display Current Users */}
      <div style={{ marginTop: "30px", width: "300px" }}>
        <h4>Current Users:</h4>
        <ul>
          {currentUsers.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
