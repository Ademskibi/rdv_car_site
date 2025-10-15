import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-start py-0 px-6">
      {/* Title with 10px top margin */}
      <h1 className="mt-[10px] text-4xl sm:text-5xl font-extrabold text-white animate-fadeInDown">
        Contact Us
      </h1>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-6xl justify-items-center mt-[10px] mb-[10px]">
        {/* Location */}
        <div className="flex flex-col items-center justify-center w-[200px] h-[200px] p-4 bg-gray-900 rounded-3xl shadow-lg hover:scale-105 hover:shadow-red-500 transition-transform duration-300">
          <MapPin className="w-10 h-10 mb-3 text-red-500" />
          <h2 className="text-lg font-semibold mb-1 text-white text-center">Location</h2>
          <p className="text-gray-300 text-center text-sm">
            123 Main Street, Tunis, Tunisia
          </p>
        </div>

        {/* Phone */}
        <div className="flex flex-col items-center justify-center w-[200px] h-[200px] p-4 bg-gray-900 rounded-3xl shadow-lg hover:scale-105 hover:shadow-red-500 transition-transform duration-300">
          <Phone className="w-10 h-10 mb-3 text-red-500" />
          <h2 className="text-lg font-semibold mb-1 text-white text-center">Phone</h2>
          <p className="text-gray-300 text-center text-sm">+216 12 345 678</p>
        </div>

        {/* Email */}
        <div className="flex flex-col items-center justify-center w-[200px] h-[200px] p-4 bg-gray-900 rounded-3xl shadow-lg hover:scale-105 hover:shadow-red-500 transition-transform duration-300">
          <Mail className="w-10 h-10 mb-3 text-red-500" />
          <h2 className="text-lg font-semibold mb-1 text-white text-center">Email</h2>
          <p className="text-gray-300 text-center text-sm">contact@3aliuscar.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
