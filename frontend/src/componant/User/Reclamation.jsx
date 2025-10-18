import React, { useState } from "react";
import axios from "axios";
import { AlertTriangle, Send, User, Mail, MessageCircle, Shield } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

const Reclamation = () => {
  const [formData, setFormData] = useState({
    Full_Name: "",
    Email: "",
    phone: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (phone) => {
    setFormData((prev) => ({ ...prev, phone }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setMessage("");

    if (!formData.phone) {
      setError("❌ Please enter a valid phone number.");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reclamations", formData);

      console.log("Réclamation submitted:", formData);
      setMessage("✅ Your complaint has been submitted successfully! We'll contact you within 24 hours.");
      setFormData({ Full_Name: "", Email: "", phone: "", description: "" });
    } catch (error) {
      console.error("Erreur lors de l'envoi de la réclamation :", error);
      setError("❌ An error occurred. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-red-900/10 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-2xl border border-red-500/20 mb-4">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            FILE A <span className="text-red-500">COMPLAINT</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            We take your concerns seriously. Let us make things right.
          </p>
        </div>

        {/* Form */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-8 shadow-2xl">

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-red-400 text-center">{error}</p>
              </div>
            )}
            {message && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <p className="text-green-400 text-center">{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Full Name */}
              <div className="group">
                <label className="flex items-center text-gray-300 mb-2 text-sm font-semibold">
                  <User className="w-4 h-4 mr-2 text-red-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="Full_Name"
                  value={formData.Full_Name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div className="group">
                <label className="flex items-center text-gray-300 mb-2 text-sm font-semibold">
                  <Mail className="w-4 h-4 mr-2 text-red-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col items-start">
                <label className="mb-2 font-bold text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4 text-red-500"/> Phone Number
                </label>
                <PhoneInput
                  country="tn"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  enableSearch
                  containerClass="w-full"
                  inputClass="!w-full !bg-gray-800 !border !border-gray-700 !rounded-xl !py-4 !pl-14 !pr-4 !text-white"
                  buttonClass="!bg-gray-700 !border !border-gray-600 !rounded-l-xl"
                  dropdownClass="!bg-gray-800 !border !border-gray-700"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Description */}
              <div className="group">
                <label className="flex items-center text-gray-300 mb-2 text-sm font-semibold">
                  <MessageCircle className="w-4 h-4 mr-2 text-red-500" />
                  Complaint Details
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 resize-none"
                  placeholder="Please describe your issue in detail..."
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-red-500/25 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    SUBMITTING...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    SUBMIT COMPLAINT
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reclamation;
