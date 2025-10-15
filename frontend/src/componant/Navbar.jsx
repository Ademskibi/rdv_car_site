import React, { useState, useEffect } from "react";
import navbar from "../assets/navbar.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-all duration-500 z-50 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md shadow-2xl shadow-red-500/10 py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo with glow effect */}
        <div className="flex items-center space-x-3">
          <img
            src={navbar}
            alt="3alius Car Logo"
            className="h-16 object-contain filter drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]"
          />
        
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-8 font-semibold">
          {['Our Service', 'About Us', 'Contact'].map((item, index) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative text-white hover:text-red-500 transition-colors duration-300 group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25">
          Book Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;