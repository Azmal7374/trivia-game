/* eslint-disable prettier/prettier */
"use client"

import { useState } from "react";

const NavbarAndCarousel = () => {
  const [selectedTab, setSelectedTab] = useState("At work");

  const tabs = ["For all", "At work", "At school", "At home"];
  const carouselItems = [
    { title: "Women in Leadership", mode: "Classic mode", color: "bg-purple-500" },
    { title: "Goal Setting", mode: "Classic mode", color: "bg-red-500" },
    { title: "Minimizing Time Wasters", mode: "Classic mode", color: "bg-blue-500" },
    { title: "Nobel Peace Prize 2024", mode: "Classic mode", color: "bg-yellow-500" },
    { title: "Tips and Tricks for Working From Home", mode: "Self-study", color: "bg-green-500" },
    { title: "Festive Film Challenge", mode: "Classic mode", color: "bg-gray-500" },
  ];

  return (
    <div className="bg-white hidden lg:block text-white p-4 border rounded-lg">
      {/* Navbar */}
     <div className="bg-blue-600">
     <div className="flex   justify-between px-6 py-4 gap-4">
        {/* Logo */}
        <div className="flex flex-col items-center space-x-4">
          <span className="font-bold text-xl">Kahoot!</span>
          <span className="text-xs px-2 py-1 bg-yellow-500 rounded">GO!</span>
          <span className="text-sm">Free 10 minute sessions</span>
        </div>
        {/* Tabs */}
        <div className="flex flex-col ">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`text-sm px-3 py-1 rounded w-max ${
                selectedTab === tab ? "bg-blue-700" : ""
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="overflow-x-scroll flex space-x-6 px-6 py-4 scrollbar-hide">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`w-60 h-36 flex flex-col items-center justify-center rounded-lg text-center ${item.color}`}
          >
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="text-sm">{item.mode}</p>
          </div>
        ))}
        {/* Create and Join Buttons */}
        <div className="w-60 h-36 flex flex-col items-center justify-center rounded-lg bg-blue-700 text-center">
          <h2 className="text-lg font-bold">Create a Kahoot!</h2>
        </div>
        <div className="w-60 h-36 flex flex-col items-center justify-center rounded-lg bg-yellow-500 text-center">
          <h2 className="text-lg font-bold">Join game</h2>
        </div>
      </div>
       
      </div>

      {/* Carousel */}
     </div>
    </div>
  );
};

export default NavbarAndCarousel;
