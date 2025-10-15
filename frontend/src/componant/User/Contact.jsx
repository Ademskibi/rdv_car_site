import React from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-red-900/20 flex flex-col items-center justify-center py-16 px-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Title */}
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
          GET IN <span className="text-red-500">TOUCH</span>
        </h1>
        <div className="w-32 h-1.5 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-6 rounded-full"></div>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
          Ready to serve your automotive needs with premium quality and expertise
        </p>
      </div>

      {/* Enhanced Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 w-full max-w-9xl relative z-10">
        
        {/* Location Card */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
          <div className="relative flex flex-col items-center justify-center w-full min-h-[320px] p-8 bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800 hover:border-red-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="mb-6 p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
              <MapPin className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white text-center">OUR GARAGE</h2>
            <p className="text-gray-300 text-center text-base leading-relaxed font-light">
              123 Automotive Avenue<br />
              Downtown District<br />
              Tunis, Tunisia 1001
            </p>
          </div>
        </div>

        {/* Phone Card */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
          <div className="relative flex flex-col items-center justify-center w-full min-h-[320px] p-8 bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800 hover:border-red-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="mb-6 p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
              <Phone className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white text-center">CALL US</h2>
            <p className="text-gray-300 text-center text-base leading-relaxed font-light">
              +216 12 345 678<br />
              +216 98 765 432<br />
              <span className="text-red-400 text-sm mt-2 block">24/7 Emergency Line</span>
            </p>
          </div>
        </div>

        {/* Email Card */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
          <div className="relative flex flex-col items-center justify-center w-full min-h-[320px] p-8 bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800 hover:border-red-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="mb-6 p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
              <Mail className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white text-center">EMAIL US</h2>
            <p className="text-gray-300 text-center text-base leading-relaxed font-light">
              contact@3aliuscar.com<br />
              support@3aliuscar.com<br />
              <span className="text-red-400 text-sm mt-2 block">Quick Response</span>
            </p>
          </div>
        </div>

        {/* Hours Card */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
          <div className="relative flex flex-col items-center justify-center w-full min-h-[320px] p-8 bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800 hover:border-red-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="mb-6 p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
              <Clock className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white text-center">WORKING HOURS</h2>
            <p className="text-gray-300 text-center text-base leading-relaxed font-light">
              Mon - Fri: 7:00 AM - 10:00 PM<br />
              Saturday: 8:00 AM - 8:00 PM<br />
              Sunday: Emergency Only
            </p>
          </div>
        </div>

        {/* Quick Contact Card */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
          <div className="relative flex flex-col items-center justify-center w-full min-h-[320px] p-8 bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800 hover:border-red-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
            <div className="mb-6 p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
              <MessageCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white text-center">QUICK CHAT</h2>
            <p className="text-gray-300 text-center text-base leading-relaxed font-light mb-4">
              WhatsApp & Messenger
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25">
              Message Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center relative z-10">
        <p className="text-gray-400 text-lg mb-6">Need immediate assistance?</p>
        <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-red-500/30">
          BOOK APPOINTMENT NOW
        </button>
      </div>
    </div>
  );
};

export default Contact;