import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Gauge, Calendar, Upload, User, FileText, Car, Wrench, Zap } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
const Diagnostics = () => {
   const [formData, setFormData] = useState({
     First_Name: "",
     Last_Name: "",
     Phone: "", // added phone here
     Matricule: "",
     Model: "",
     Motor_type: "",
     Type: false,
     Date_RDV: "",
     Poste: "Engine replacement",
     Images: [],
   });

  const [previewImages, setPreviewImages] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic matricule inputs
  const [selectedType, setSelectedType] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleSelectChange = (e) => {
    const val = e.target.value;
    setSelectedType(val);
    setInput1("");
    setInput2("");
    setFormData((prev) => ({ ...prev, Matricule: "" }));
  };

  const updateMatricule = () => {
    if (selectedType === "Tunis") {
      setFormData((prev) => ({
        ...prev,
        Matricule: `${input1} Tunis ${input2}`,
      }));
    } else if (selectedType === "lybia" || selectedType === "algerie") {
      setFormData((prev) => ({
        ...prev,
        Matricule: `${input1} ${selectedType} ${input2}`,
      }));
    } else if (selectedType === "o") {
      setFormData((prev) => ({
        ...prev,
        Matricule: `${selectedType} : ${input1}`,
      }));
    }
  };

  useEffect(() => {
    updateMatricule();
  }, [selectedType, input1, input2]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, Images: files }));
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchDisabledDates = async () => {
      if (!formData.Poste) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/rdv/disabled-dates/${encodeURIComponent(formData.Poste)}`
        );
        const formatted = res.data.map((date) => new Date(date).toISOString().split("T")[0]);
        setDisabledDates(formatted);
      } catch (err) {
        console.error("Error fetching disabled dates:", err);
      }
    };
    fetchDisabledDates();
  }, [formData.Poste]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "Images") {
          value.forEach((file) => dataToSend.append("Images", file));
        } else {
          dataToSend.append(key, value);
        }
      });

      await axios.post("http://localhost:5000/api/rdv", dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Diagnostic appointment scheduled successfully! We'll contact you to confirm.");
      setFormData({
        First_Name: "",
        Last_Name: "",
        Matricule: "",
        Model: "",
        Motor_type: "",
        Type: false,
        Date_RDV: "",
        Poste: "Diagnostics",
        Images: [],
      });
      setPreviewImages([]);
      setSelectedType("");
      setInput1("");
      setInput2("");
    } catch (err) {
      console.error("Error creating RDV:", err);
      setError("❌ Failed to schedule diagnostic appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDateDisabled = (date) => {
    const formatted = date.toISOString().split("T")[0];
    return disabledDates.includes(formatted);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-red-900/10 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-2xl border border-red-500/20 mb-4">
            <Gauge className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            VEHICLE <span className="text-red-500">DIAGNOSTICS</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            Advanced diagnostic scanning and analysis using state-of-the-art equipment
          </p>
        </div>

        {/* Form Container */}
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

            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="flex items-center text-gray-300 mb-2 text-sm font-semibold">
                    <User className="w-4 h-4 mr-2 text-red-500" />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="First_Name"
                    value={formData.First_Name}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                    placeholder="Enter your first name"
                    required
                  />
                </div>

                <div className="group">
                  <label className="flex items-center text-gray-300 mb-2 text-sm font-semibold">
                    <User className="w-4 h-4 mr-2 text-red-500" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="Last_Name"
                    value={formData.Last_Name}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                 <div className="md:col-span-2 flex flex-col items-start">
                                   <label className="mb-2 font-bold text-gray-300">Phone Number</label>
                                   <PhoneInput
                                    country="tn"
                  value={formData.Phone}
                  onChange={(phone) =>
                    setFormData((prev) => ({ ...prev, Phone: phone }))
                  }
                  enableSearch
                  containerClass="w-full"
                  inputClass="!w-full !bg-gray-800 !border !border-gray-700 !rounded-xl !py-4 !pl-14 !pr-4 !text-white"
                  buttonClass="!bg-gray-700 !border !border-gray-600 !rounded-l-xl"
                  dropdownClass="!bg-gray-800 !border !border-gray-700"
                  placeholder="Enter phone number"
                                   />
                                 </div>
              </div>

              {/* Dynamic Matricule Section */}
              <div className="group">
                 <label className="flex items-center text-gray-300 mb-2 text-sm font-semibold">
                                                <FileText className="w-4 h-4 mr-2 text-red-500" />
                                                Vehicle Plate (Matricule)
                                              </label>
                                              
                                              <select
                                                value={selectedType}
                                                onChange={handleSelectChange}
                                                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 mb-3"
                                                required
                                              >
                                                <option value="" className="bg-gray-800">-- Select Plate Type --</option>
                                                <option value="Tunis" className="bg-gray-800">Tunisia</option>
                                                <option value="lybia" className="bg-gray-800">Libya</option>
                                                <option value="algerie" className="bg-gray-800">Algeria</option>
                                                <option value="o" className="bg-gray-800">Other</option>
                                              </select>
                              
                                              {/* Tunis style: two parts */}
                                              {selectedType === "Tunis" && (
                                                <div className="flex items-center gap-3 mt-2 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                                                  <input
                                                    type="text"
                                                    placeholder="123"
                                                    value={input1}
                                                    onChange={(e) => setInput1(e.target.value)}
                                                    className="bg-gray-700 border border-gray-600 rounded-lg p-3 w-1/3 text-white text-center font-bold"
                                                    maxLength="3"
                                                  />
                                                  <span className="font-bold text-red-500 text-lg">تونس</span>
                                                  <input
                                                    type="text"
                                                    placeholder="456"
                                                    value={input2}
                                                    onChange={(e) => setInput2(e.target.value)}
                                                    className="bg-gray-700 border border-gray-600 rounded-lg p-3 w-1/3 text-white text-center font-bold"
                                                    maxLength="3"
                                                  />
                                                </div>
                                              )}
                              
                                              {/* Other countries */}
                                              {(selectedType === "lybia" || selectedType === "algerie" || selectedType === "other") && (
                                                <div className="mt-2 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                                                  <input
                                                    type="text"
                                                    placeholder="Enter plate number"
                                                    value={input1}
                                                    onChange={(e) => setInput1(e.target.value)}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                                                  />
                                                  <p className="mt-3 text-gray-400 text-sm">
                                                    Plate Number: <b className="text-red-400">{selectedType && input1 ? `${selectedType} : ${input1}` : "Not set"}</b>
                                                  </p>
                                                </div>
                                              )}
                                            </div>

              {/* Vehicle Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="flex items-center text-gray-300 mb-2 text-sm font-semibold">
                    <Car className="w-4 h-4 mr-2 text-red-500" />
                    Car Model
                  </label>
                  <input
                    type="text"
                    name="Model"
                    value={formData.Model}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                    placeholder="e.g., BMW X5, Toyota Camry"
                    required
                  />
                </div>

                <div className="group">
                  <label className="flex items-center text-gray-300 mb-2 text-sm font-semibold">
                    <Zap className="w-4 h-4 mr-2 text-red-500" />
                    Motor Type
                  </label>
                  <select
                    name="Motor_type"
                    value={formData.Motor_type}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 appearance-none"
                    required
                  >
                    <option value="" className="bg-gray-800">Select Motor Type</option>
                    <option value="Diesel" className="bg-gray-800">Diesel</option>
                    <option value="Essence" className="bg-gray-800">Essence</option>
                    <option value="Electric" className="bg-gray-800">Electric</option>
                    <option value="Hybrid" className="bg-gray-800">Hybrid</option>
                  </select>
                </div>
              </div>

              {/* Date Picker */}
              <div className="group">
                <label className="flex items-center text-gray-300 mb-2 text-sm font-semibold">
                  <Calendar className="w-4 h-4 mr-2 text-red-500" />
                  Diagnostic Date
                </label>
                <DatePicker
                  selected={formData.Date_RDV ? new Date(formData.Date_RDV) : null}
                  onChange={(date) => {
                    const formatted = date.toISOString().split("T")[0];
                    if (disabledDates.includes(formatted)) {
                      alert("❌ This date is already booked for diagnostics service.");
                      return;
                    }
                    setFormData((prev) => ({ ...prev, Date_RDV: formatted }));
                  }}
                  placeholderText="Select diagnostic date"
                  dateFormat="MMMM d, yyyy"
                  filterDate={(date) => !isDateDisabled(date)}
                  minDate={new Date()}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                  required
                />
              </div>

              {/* File Upload */}
              <div className="group">
                <label className="flex items-center text-gray-300 mb-2 text-sm font-semibold">
                  <Upload className="w-4 h-4 mr-2 text-red-500" />
                  Upload Vehicle Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-red-500/50 transition-colors duration-300">
                  <input
                    type="file"
                    name="Images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="diagnostic-images"
                  />
                  <label htmlFor="diagnostic-images" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Click to upload vehicle photos</p>
                    <p className="text-gray-500 text-xs mt-1">Show us any warning lights or issues</p>
                  </label>
                </div>
              </div>

              {/* Image Previews */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {previewImages.map((src, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={src}
                        alt="preview"
                        className="w-full h-24 object-cover rounded-lg border border-gray-700 group-hover:border-red-500 transition-colors duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-2xl shadow-red-500/25 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    SCHEDULING DIAGNOSTICS...
                  </>
                ) : (
                  <>
                    <Gauge className="w-5 h-5" />
                    SCHEDULE VEHICLE DIAGNOSTICS
                  </>
                )}
              </button>

              {/* Additional Info */}
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  🔍 Comprehensive diagnostic report included with every service
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;