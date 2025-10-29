import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Clock,
  Calendar,
  Upload,
  User,
  FileText,
  Car,
  Zap,
  MessageCircle,
} from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { setHours, setMinutes } from "date-fns";

const FastService = () => {
  const [formData, setFormData] = useState({
    First_Name: "",
    Last_Name: "",
    phone: "",
    Matricule: "",
    Model: "",
    Motor_type: "",
    Type: false,
    description: "",
    Date_RDV: "",
    Poste: "Fast service",
    Images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Matricule parts
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
    } else if (
      selectedType === "lybia" ||
      selectedType === "algerie" ||
      selectedType === "other"
    ) {
      setFormData((prev) => ({
        ...prev,
        Matricule: `${selectedType} : ${input1}`,
      }));
    }
  };

  useEffect(() => {
    updateMatricule();
  }, [selectedType, input1, input2]);

  // Fetch disabled dates
  useEffect(() => {
    const fetchDisabledDates = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/rdv/disabled-dates/${encodeURIComponent(formData.Poste)}`
        );
        const formatted = res.data.map((date) =>
          new Date(date).toISOString().split("T")[0]
        );
        setDisabledDates(formatted);
      } catch (err) {
        console.error("Error fetching disabled dates:", err);
      }
    };
    fetchDisabledDates();
  }, [formData.Poste]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, Images: files }));
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");
  setIsSubmitting(true);

  try {
    const dataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "Images") {
        // Append each image file
        value.forEach((file) => dataToSend.append("Images", file));
      } else if (value !== undefined && value !== null) {
        // Convert boolean to string for FormData
        if (typeof value === "boolean") {
          dataToSend.append(key, value.toString());
        } 
        // Convert date to ISO string if it's a Date object
        else if (value instanceof Date) {
          dataToSend.append(key, value.toISOString());
        } 
        else {
          dataToSend.append(key, value);
        }
      }
    });

    const res = await axios.post("http://localhost:5000/api/rdv", dataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setMessage(
      "✅ Fast service appointment scheduled successfully! We'll contact you to confirm."
    );
    setFormData({
      First_Name: "",
      Last_Name: "",
      phone: "",
      Matricule: "",
      Model: "",
      Motor_type: "",
      Type: false,
      description: "",
      Date_RDV: "",
      Poste: "Fast service",
      Images: [],
    });
    setPreviewImages([]);
    setSelectedType("");
    setInput1("");
    setInput2("");
  } catch (err) {
    console.error("Error creating RDV:", err);
    setError("❌ Failed to schedule appointment. Please try again.");
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
            <Clock className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            FAST <span className="text-red-500">SERVICE</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            Quick maintenance and repairs with express service options
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
              {/* Name Inputs */}
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
                    placeholder="Enter your first name"
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white"
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
                    placeholder="Enter your last name"
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white"
                  />
                </div>
              </div>

              {/* Phone Number */}
                <div className="md:col-span-2 flex flex-col items-start">
                  <label className="mb-2 font-bold text-gray-300">Phone Number</label>
                  <PhoneInput
                    country="tn"
                    value={formData.phone}
                    onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
                    enableSearch
                    containerClass="w-full"
                    inputClass="!w-full !bg-gray-800 !border !border-gray-700 !rounded-xl !py-4 !pl-14 !pr-4 !text-white"
                    buttonClass="!bg-gray-700 !border !border-gray-600 !rounded-l-xl"
                    dropdownClass="!bg-gray-800 !border !border-gray-700"
                    placeholder="Enter phone number"
                  />
                </div>

              {/* Vehicle Plate Section */}
              <div className="group">
                <label className="flex items-center text-gray-300 mb-2 text-sm font-semibold">
                  <FileText className="w-4 h-4 mr-2 text-red-500" />
                  Vehicle Plate (Matricule)
                </label>

                <select
                  value={selectedType}
                  onChange={handleSelectChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white mb-3"
                  required
                >
                  <option value="">-- Select Plate Type --</option>
                  <option value="Tunis">Tunisia</option>
                  <option value="lybia">Libya</option>
                  <option value="algerie">Algeria</option>
                  <option value="other">Other</option>
                </select>

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
                      maxLength="4"
                    />
                  </div>
                )}

                {(selectedType === "lybia" ||
                  selectedType === "algerie" ||
                  selectedType === "other") && (
                  <div className="mt-2 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                    <input
                      type="text"
                      placeholder="Enter plate number"
                      value={input1}
                      onChange={(e) => setInput1(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white"
                    />
                  </div>
                )}
              </div>

              {/* Model & Motor Type */}
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
                    placeholder="e.g., BMW X5"
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white"
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
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white"
                  >
                    <option value="">Select Motor Type</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Essence">Essence</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="group">
                <label className="flex items-center text-gray-300 mb-2 text-sm font-semibold">
                  <MessageCircle className="w-4 h-4 mr-2 text-red-500" />
                  Service Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe the service you need..."
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white"
                />
              </div>

              {/* Date Picker */}
             <div className="group">
  <label className="flex items-center text-gray-300 mb-2 text-sm font-semibold">
    <Calendar className="w-4 h-4 mr-2 text-red-500" />
    Service Date & Time
  </label>

  <DatePicker
    selected={formData.Date_RDV ? new Date(formData.Date_RDV) : null}
    onChange={(date) => {
      if (!date) return;
      const formatted = date.toISOString().split("T")[0];
      if (disabledDates.includes(formatted)) {
        alert("❌ This date is already booked.");
        return;
      }
      setFormData((prev) => ({ ...prev, Date_RDV: date.toISOString() }));
    }}
    minDate={new Date()}
    placeholderText="Select service date and time"
    filterDate={(date) => !isDateDisabled(date)}
    showTimeSelect
    timeFormat="HH:mm"
    timeIntervals={30} // each 30 mins
    dateFormat="MMMM d, yyyy h:mm aa"
     minTime={setHours(setMinutes(new Date(), 0), 9)}   // Earliest = 9:00 AM
     maxTime={setHours(setMinutes(new Date(), 0), 17)}
    required
    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white"
  />
</div>


              {/* Image Upload */}
              <div className="group">
                <label className="flex items-center text-gray-300 mb-2 text-sm font-semibold">
                  <Upload className="w-4 h-4 mr-2 text-red-500" />
                  Upload Vehicle Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center">
                  <input
                    type="file"
                    name="Images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="fastservice-images"
                  />
                  <label htmlFor="fastservice-images" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">
                      Click to upload vehicle photos
                    </p>
                  </label>
                </div>
              </div>

              {/* Image Preview */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {previewImages.map((src, i) => (
                    <div
                      key={i}
                      className="relative group border border-gray-700 rounded-xl overflow-hidden"
                    >
                      <img
                        src={src}
                        alt="preview"
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 rounded-xl hover:scale-105 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Scheduling...
                  </>
                ) : (
                  <>
                    <Clock className="w-5 h-5" />
                    Schedule Fast Service
                  </>
                )}
              </button>

              <p className="text-center text-gray-400 text-sm mt-3">
                ⚡ Most services completed within 2–4 hours
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastService;