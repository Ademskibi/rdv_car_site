import React, { useState } from "react";
import FastService from "./FastService";
import Diagnostics from "./Diagnostics";
import ReplaceEngine from "./ReplaceEngine";
import fastServiceImg from "../assets/FastService.png";
import ReplaceEngineImg from "../assets/ReplaceEngine.png";
import DiagnosticsImg from "../assets/Diagnostics.png";
import Navbar from "./Navbar";

const MainPage = () => {
  const [openBox, setOpenBox] = useState(null);

  const handleOpen = (box) => setOpenBox(box);
  const handleClose = () => setOpenBox(null);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center relative">
      <Navbar />

      {/* Add spacing to avoid navbar overlap */}
      <div className="mt-28 grid grid-cols-1 sm:grid-cols-2 gap-10 p-10 justify-items-center">
        {/* 🟥 Fast Service */}
        <div
          onClick={() => handleOpen("box1")}
          className="cursor-pointer w-[24rem] h-[16rem] border border-gray-300 rounded-xl flex items-center justify-center shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 bg-cover bg-center"
          style={{
            backgroundImage: `url(${fastServiceImg})`,
          }}
        ></div>

        {/* 🟦 Diagnostics */}
        <div
          onClick={() => handleOpen("box2")}
          className="cursor-pointer w-[24rem] h-[16rem] border border-gray-300 rounded-xl flex items-center justify-center shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 bg-cover bg-center"
          style={{
            backgroundImage: `url(${DiagnosticsImg})`,
          }}
        ></div>

        {/* 🟩 Replace Engine */}
        <div
          onClick={() => handleOpen("box3")}
          className="cursor-pointer w-[24rem] h-[16rem] border border-gray-300 rounded-xl flex items-center justify-center shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 bg-cover bg-center"
          style={{
            backgroundImage: `url(${ReplaceEngineImg})`,
          }}
        ></div>

        {/* 🟨 Box 4 */}
        <div
          onClick={() => handleOpen("box4")}
          className="cursor-pointer w-[24rem] h-[16rem] border border-gray-300 rounded-xl flex items-center justify-center shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 bg-gray-100"
        >
          <p className="text-2xl font-semibold">Box 4</p>
        </div>
      </div>

      {/* Modal Overlay */}
      {openBox && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto relative p-6 animate-fadeIn">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold"
            >
              ×
            </button>

            {/* Modal Content */}
            {openBox === "box1" && <FastService />}
            {openBox === "box2" && <Diagnostics />}
            {openBox === "box3" && <ReplaceEngine />}
            {openBox === "box4" && (
              <div className="p-4 text-center">
                <h2 className="text-2xl font-semibold mb-4">Box 4 Content</h2>
                <p>Any custom component can go here too.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
