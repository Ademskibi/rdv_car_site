import React from "react";
import { Award, Users, Clock, Shield } from "lucide-react";
import LocalImg from "../../assets/LocalImg (1).jpg";
import LocalImg1 from "../../assets/LocalImg (2).jpg";

const About = () => {
  const stats = [
    { icon: Clock, value: "15+", label: "Years Experience" },
    { icon: Users, value: "10K+", label: "Happy Clients" },
    { icon: Award, value: "50+", label: "Awards Won" },
    { icon: Shield, value: "100%", label: "Satisfaction Guarantee" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-red-900/10 flex flex-col items-center justify-center py-20 px-6 relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Title */}
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
          ABOUT <span className="text-red-500">BALIUS CAR</span>
        </h1>
        <div className="w-32 h-1.5 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-6 rounded-full"></div>
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto font-light">
          Pioneering automotive excellence with cutting-edge technology and unmatched expertise
        </p>
      </div>

      {/* Image Gallery Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16 max-w-7xl w-full relative z-10">
        {/* Main Image */}
        <div className="relative group flex-1">
          <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <img
            src={LocalImg1}
            alt="Balius Car Garage"
            className="relative w-full h-[500px] object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
            <h3 className="text-2xl font-bold text-white mb-2">State-of-the-Art Facility</h3>
            <p className="text-gray-300">Advanced equipment for premium service</p>
          </div>
        </div>

        {/* Secondary Image */}
        <div className="relative group flex-1">
          <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <img
            src={LocalImg}
            alt="Expert Technicians"
            className="relative w-full h-[500px] object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
            <h3 className="text-2xl font-bold text-white mb-2">Certified Experts</h3>
            <p className="text-gray-300">Highly trained professional team</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full mb-16 relative z-10">
        {stats.map((stat, index) => (
          <div key={index} className="group text-center">
            <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-500 hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-red-500/10 rounded-2xl border border-red-500/20">
                <stat.icon className="w-8 h-8 text-red-500" />
              </div>
              <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 font-semibold">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Section */}
      <div className="max-w-7xl w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column */}
          <div className="space-y-6">
            {/* Who We Are */}
            <div className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-500">
              <h2 className="text-3xl font-bold text-white mb-6">Who We Are</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                <span className="text-red-500 font-semibold">Balius Car</span> est une société spécialisée dans la mécanique automobile, la vente de moteurs et de pièces de rechange.
                Nous proposons une gamme complète de services :
                <br />
                🔧 Montage et installation de moteurs<br />
                ⚡ Services électriques et diagnostic électronique<br />
                🛠️ Entretien complet des véhicules<br />
                🚗 Tuning et amélioration des performances
              </p>
            </div>

            {/* Workshop & Facilities */}
            <div className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-500">
              <h2 className="text-3xl font-bold text-white mb-6">Where Innovation Meets Precision</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our premises are designed to exceptional quality standards, creating a unique atmosphere that transports you to a cutting-edge automotive world. Every detail is meticulously considered, reminiscent of a laboratory dedicated to next-generation cars.
                Inspired by the precision and organization of Formula 1 pit lanes, our workshop features spacious, impeccably maintained workspaces. Their design reflects the importance we place on luxury, performance, and the meticulous care of each vehicle.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Why Choose Us */}
            <div className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-500">
              <h2 className="text-3xl font-bold text-white mb-6">Why Choose Us</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                We understand that your vehicle is more than just transportation—it's your freedom. 
                That's why we treat every repair with the precision and care it deserves, using only 
                the finest parts and most advanced diagnostic equipment available.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center relative z-10">
        <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-16 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-red-500/30">
          DISCOVER OUR SERVICES
        </button>
      </div>
    </div>
  );
};

export default About;
