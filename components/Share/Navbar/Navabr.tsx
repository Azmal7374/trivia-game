/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import NavbarAndCarousel from "./NavabarAndCarousel";

const Navbar = () => {
  return (
  <>
  <NavbarAndCarousel/>
    <div className="bg-white shadow">
      <div className="container mx-auto px-4 flex items-center justify-between py-2">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 font-bold text-xl">Kahoot!</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <button className="relative text-sm font-medium">
            News
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded-full">
              3
            </span>
          </button>
          {["Work", "School", "Higher Education", "Home", "Study", "Discover"].map(
            (link) => (
              <a
                key={link}
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                {link}
              </a>
            )
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-sm font-medium text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-600 hover:text-white"
          >
            Contact sales
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Play
          </a>
          <button className="bg-green-600 text-white text-sm font-medium px-4 py-1 rounded hover:bg-green-700">
            Sign up FREE
          </button>
          <a
            href="#"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Log in
          </a>
          <div className="flex items-center space-x-1 border border-gray-300 px-2 py-1 rounded">
            <span className="text-sm">🌐</span>
            <span className="text-sm">EN</span>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Navbar;
