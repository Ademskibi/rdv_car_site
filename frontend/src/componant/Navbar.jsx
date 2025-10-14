import React from "react";
import navbar from "../assets/navbar.png";

const Navbar = () => {
  return (
    <nav
      className="fixed top-0 left-0 w-full bg-black text-white flex flex-col items-center justify-center shadow-md z-50"
      style={{ height: "120px" }} // Increased height to fit image + list
    >
      {/* Logo */}
      <img
        src={navbar}
        alt="Balius Car Logo"
        style={{ height: "70px" }}
        className="object-contain mb-2"
      />

      {/* Navigation Links */}
      <ul className="flex space-x-6 font-bold text-white">
        <li className="cursor-pointer hover:text-red-500 transition-colors">Our Service</li>
        <li className="cursor-pointer hover:text-red-500 transition-colors">About Us</li>
        <li className="cursor-pointer hover:text-red-500 transition-colors">Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
