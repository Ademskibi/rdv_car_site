import React from "react";
import LocalImg from "../../assets/LocalImg (1).jpg";
import LocalImg1 from "../../assets/LocalImg (2).jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-red-50 flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-red-700 mb-10 animate-fadeInDown">
        About Us
      </h1>

      {/* Image Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10 animate-fadeInUp">
      
        <img
          src={LocalImg1}
          alt="Team"
          className="w-full md:w-1/3 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-500"
        />
      </div>

      {/* Text Section */}
      <div className="max-w-4xl text-center space-y-5 text-gray-700 leading-relaxed animate-fadeInUp delay-200">
        <p>
          Welcome to <span className="text-red-700 font-semibold">3alius Car</span>, your trusted partner for all your car repair and maintenance needs. 
          With years of experience in the automotive industry, we pride ourselves on delivering 
          top-notch services to keep your vehicle running smoothly and safely.
        </p>

        <p>
          At <span className="text-red-700 font-semibold">3alius Car</span>, we understand the importance of a well-maintained vehicle. 
          Our team of skilled technicians is dedicated to providing high-quality repairs and maintenance services, 
          using the latest tools and technology to ensure your car is in the best hands.
        </p>

        <p>
          Whether you need routine maintenance, such as oil changes and tire rotations, or more complex repairs like 
          engine diagnostics and transmission work, we have you covered. We work with all makes and models, 
          ensuring that no matter what type of vehicle you drive, we can provide the care it needs.
        </p>
      </div>
    </div>
  );
};

export default About;
