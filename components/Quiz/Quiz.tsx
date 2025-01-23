/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Card } from "@nextui-org/card";
import { Spacer } from "@nextui-org/spacer";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import QrScanner from "qr-scanner"; // For scanning QR codes
import jsQR from "jsqr"; // For processing QR codes from images

const Quiz: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [roomCode, setRoomCode] = useState<string>("");
  const [timer, setTimer] = useState<string>("");
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);
  const [currentUsers, setCurrentUsers] = useState<string[]>([]);
  const [roomLink, setRoomLink] = useState<string>("");
  const [scannerError, setScannerError] = useState<string>("");
  const [isScannerActive, setIsScannerActive] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const savedRoomId = localStorage.getItem("roomId");
    const savedUsers = JSON.parse(localStorage.getItem("currentUsers") || "[]");
    setCurrentUsers(savedUsers);

    if (savedRoomId) {
      setRoomLink(`${window.location.origin}/room?roomId=${savedRoomId}`);
    }
  }, []);

  useEffect(() => {
    if (isScannerActive) {
      const video = document.getElementById("qr-video") as HTMLVideoElement;
      const qrScanner = new QrScanner(video, (result) => {
        const scannedRoomId = result.data;
        setRoomCode(scannedRoomId);

        if (scannedRoomId === roomCode) {
          window.location.href = `/room?roomId=${scannedRoomId}`;
        }
      });

      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
          qrScanner.start();
        })
        .catch((err) => {
          setScannerError("Failed to access camera: " + err.message);
        });

      return () => qrScanner.destroy();
    }
  }, [isScannerActive, roomCode]);

  const handleCreateRoom = () => {
    if (!name.trim()) {
      alert("Please enter your name before creating a room!");
      return;
    }

    const newRoomId = `Room-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const updatedUsers = [name];
    const roomCreationTime = new Date().toLocaleString();

    localStorage.setItem("roomId", newRoomId);
    localStorage.setItem("roomTimer", timer);
    localStorage.setItem("selectedQuizzes", JSON.stringify(selectedQuizzes));
    localStorage.setItem("roomCreator", JSON.stringify(name));
    localStorage.setItem("roomCreationTime", roomCreationTime);
    localStorage.setItem("currentUsers", JSON.stringify(updatedUsers));

    setRoomLink(`${window.location.origin}/room?roomId=${newRoomId}`);
    window.location.href = "/room";
  };

  const handleJoinRoom = () => {
    if (!name.trim() || !roomCode.trim()) {
      alert("Please enter both your name and the room code to join!");
      return;
    }

    const savedRoomId = localStorage.getItem("roomId");
    const savedQuizzes = JSON.parse(localStorage.getItem("selectedQuizzes") || "[]");
    const savedUsers = JSON.parse(localStorage.getItem("currentUsers") || "[]");

    if (roomCode !== savedRoomId) {
      alert("Invalid Room Code. Please enter the correct code!");
      return;
    }

    if (savedUsers.includes(name)) {
      alert("This name is already in use in this room!");
      return;
    }

    const updatedUsers = [...savedUsers, name];
    localStorage.setItem("currentUsers", JSON.stringify(updatedUsers));

    localStorage.setItem("username", name);
    localStorage.setItem("selectedQuizzes", JSON.stringify(savedQuizzes));

    window.location.href = "/room";
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        const image = new Image();
        image.src = imageData;
        image.onload = () => {
          const qrCodeData = jsQR(imageData, image.width, image.height);
          if (qrCodeData) {
            setRoomCode(qrCodeData.data);
            window.location.href = `/room?roomId=${qrCodeData.data}`;
          } else {
            setScannerError("No QR code detected in the image.");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-8">
      <h2 className="text-2xl font-bold">Quiz App Home</h2>

      <div className="w-full max-w-md">
        <p className="mb-2">Name:</p>
        <Input
          placeholder="Pick a name!"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
      </div>

      <div className="flex flex-wrap justify-center gap-8 w-full max-w-4xl">
        {/* Create Room Card */}
        <Card className="p-4 w-full max-w-sm">
          <h4 className="text-lg font-semibold">Create Room</h4>
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
            className="mt-4"
          >
            <Checkbox value="General Knowledge">General Knowledge</Checkbox>
            <Checkbox value="Science">Science</Checkbox>
            <Checkbox value="History">History</Checkbox>
            <Checkbox value="Geography">Geography</Checkbox>
          </CheckboxGroup>
          <Spacer y={1.5} />
          <Button color="primary" onPress={handleCreateRoom}>
            Create a Lobby
          </Button>
        </Card>

        {/* Join Room Card */}
        <Card className="p-4 w-full max-w-sm">
          <h4 className="text-lg font-semibold">Join Lobby</h4>
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
            Join a Lobby
          </Button>
          <Spacer y={1.5} />
          <div>
            <h3>Or Scan QR Code:</h3>
            <Button color="primary" onPress={() => setIsScannerActive(true)}>
              Scan QR Code
            </Button>
            {isScannerActive && (
              <div>
                <video id="qr-video" className="w-full h-auto"></video>
                {scannerError && <p className="text-red-500">{scannerError}</p>}
              </div>
            )}
          </div>
          <Spacer y={1.5} />
          <div>
            <h3>Or Upload QR Code Image:</h3>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
