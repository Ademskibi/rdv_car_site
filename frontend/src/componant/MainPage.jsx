import React, { useState, useRef, useEffect } from "react";
import FastService from "./User/FastService.jsx";
import Diagnostics from "./User/Diagnostics.jsx";
import ReplaceEngine from "./User/ReplaceEngine.jsx";
import Reclamation from "./User/Reclamation.jsx";  
import About from "./User/About.jsx";
import Contact from "./User/Contact.jsx";
import fastServiceImg from "../assets/FastService.png";
import ReplaceEngineImg from "../assets/ReplaceEngine.png";
import DiagnosticsImg from "../assets/Diagnostics.png";
import ReclamationImg from "../assets/Reclamation.png";
import Navbar from "./Navbar";
import garageVideo from "../assets/garage_irl.mp4"; // Add your video file

const MainPage = () => {
  const [openBox, setOpenBox] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const handleOpen = (box) => setOpenBox(box);
  const handleClose = () => setOpenBox(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slow motion effect
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      <Navbar />
      
      {/* 🎥 Hero Video Section */}
      <section className="w-full h-screen relative">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
          poster="../assets/video-poster.jpg" // Fallback image
        >
          <source src={garageVideo} type="video/mp4" />
        </video>
        
        {/* Animated Overlay Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider">
            <span className="text-red-500 animate-pulse">3ALIUS</span>
            <span className="text-white">CAR</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 font-light tracking-widest">
            FUTURE OF AUTOMOTIVE EXCELLENCE
          </p>
          <div className="animate-bounce mt-8">
            <div className="w-6 h-10 border-2 border-red-500 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-red-500 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 Services Section */}
      <section id="our-service" className="w-full py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              OUR <span className="text-red-500">SERVICES</span>
            </h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Premium automotive services with cutting-edge technology and expert craftsmanship
            </p>
          </div>

          {/* Futuristic Service Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Fast Service Card */}
            <div
              onClick={() => handleOpen("box1")}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:from-red-900/20 hover:to-black transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <div 
                className="w-full h-64 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${fastServiceImg})` }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Fast Service</h3>
                <p className="text-gray-300 text-sm mb-4">Quick and efficient repairs</p>
                <div className="flex items-center text-red-500 group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-sm font-semibold">LEARN MORE</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>

            {/* Diagnostics Card */}
            <div
              onClick={() => handleOpen("box2")}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:from-red-900/20 hover:to-black transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <div 
                className="w-full h-64 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${DiagnosticsImg})` }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Diagnostics</h3>
                <p className="text-gray-300 text-sm mb-4">Advanced vehicle analysis</p>
                <div className="flex items-center text-red-500 group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-sm font-semibold">LEARN MORE</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>

            {/* Replace Engine Card */}
            <div
              onClick={() => handleOpen("box3")}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:from-red-900/20 hover:to-black transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <div 
                className="w-full h-64 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${ReplaceEngineImg})` }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Engine Replacement</h3>
                <p className="text-gray-300 text-sm mb-4">Professional engine services</p>
                <div className="flex items-center text-red-500 group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-sm font-semibold">LEARN MORE</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>

            {/* Reclamation Card */}
            <div
              onClick={() => handleOpen("box4")}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:from-red-900/20 hover:to-black transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <div 
                className="w-full h-64 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${ReclamationImg})` }}
              ></div>
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Reclamation</h3>
                <p className="text-gray-300 text-sm mb-4">Warranty & support services</p>
                <div className="flex items-center text-red-500 group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-sm font-semibold">LEARN MORE</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {openBox && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl shadow-2xl w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto relative animate-scaleIn">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors duration-300 shadow-lg"
            >
              ×
            </button>
            
            {/* Animated Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-transparent rounded-2xl opacity-50 blur-sm"></div>
            
            {/* Modal Content */}
            <div className="relative bg-gray-900 rounded-2xl p-8">
              {openBox === "box1" && <FastService />}
              {openBox === "box2" && <Diagnostics />}
              {openBox === "box3" && <ReplaceEngine />}
              {openBox === "box4" && <Reclamation />}
            </div>
          </div>
        </div>
      )}

      <section id="about-us" className="w-full py-20 bg-black">
        <About />
      </section>
         
      <section id="contact" className="w-full py-20 bg-gradient-to-t from-black to-gray-900">
        <Contact />
      </section>
    </div>
  );
};

export default MainPage;