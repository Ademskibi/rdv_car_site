import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fastServiceImg from "../assets/FastService.png";
import ReplaceEngineImg from "../assets/ReplaceEngine.png";
import DiagnosticsImg from "../assets/Diagnostics.png";
import ReclamationImg from "../assets/Reclamation.png";
import Navbar from "./Navbar";
import garageVideo from "../assets/garage_irl.mp4";
import About from "./User/About";
import Contact from "./User/Contact";

const MainPage = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  const services = [
    {
      title: "Fast Service",
      desc: "Quick and efficient repairs",
      img: fastServiceImg,
      link: "/fast-service",
    },
    {
      title: "Diagnostics",
      desc: "Advanced vehicle analysis",
      img: DiagnosticsImg,
      link: "/diagnostics",
    },
    {
      title: "Engine Replacement",
      desc: "Professional engine services",
      img: ReplaceEngineImg,
      link: "/replace-engine",
    },
    {
      title: "Reclamation",
      desc: "Warranty & support services",
      img: ReclamationImg,
      link: "/reclamation",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      <Navbar />

      {/* 🎥 Hero Section */}
      <section className="w-full h-screen relative">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={garageVideo} type="video/mp4" />
        </video>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider">
            <span className="text-red-500 animate-pulse">3ALIUS</span>
            <span className="text-white">CAR</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 font-light tracking-widest">
            FUTURE OF AUTOMOTIVE EXCELLENCE
          </p>
        </div>
      </section>

      {/* 🔧 Services Section */}
      <section id="our-service" className="w-full py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              OUR <span className="text-red-500">SERVICES</span>
            </h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Premium automotive services with cutting-edge technology and expert craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => navigate(service.link)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:from-red-900/20 hover:to-black transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <div
                  className="w-full h-64 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.img})` }}
                ></div>
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{service.desc}</p>
                  <div className="flex items-center text-red-500 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm font-semibold">LEARN MORE</span>
                    <span className="ml-2">→</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About and Contact Sections */}
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
