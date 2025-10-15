import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Diagnostics = () => {
  const [formData, setFormData] = useState({
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

  const [previewImages, setPreviewImages] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🔽 Dynamic matricule inputs
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
    if (selectedType === "Tunis" || selectedType === "lybia" || selectedType === "algerie") {
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

      setMessage("✅ Appointment successfully created!");
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
      setError("❌ Failed to create appointment. Please try again.");
    }
  };

  const isDateDisabled = (date) => {
    const formatted = date.toISOString().split("T")[0];
    return disabledDates.includes(formatted);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">🛠 Schedule a Diagnostics</h2>

      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
      {message && <p className="text-green-500 mb-2 text-center">{message}</p>}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="First_Name"
          placeholder="First Name"
          value={formData.First_Name}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="Last_Name"
          placeholder="Last Name"
          value={formData.Last_Name}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* 🔽 Dynamic Matricule Section */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Matricule Type</label>
          <select
            value={selectedType}
            onChange={handleSelectChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">-- Select Type --</option>
            <option value="Tunis">Tunis</option>
            <option value="lybia">Lybia</option>
            <option value="algerie">Algerie</option>
            <option value="o">Other</option>
          </select>

          {(selectedType === "Tunis" ||
            selectedType === "lybia" ||
            selectedType === "algerie") && (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                placeholder="Left part"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-1/3"
              />
              <span className="font-bold">{selectedType}</span>
              <input
                type="text"
                placeholder="Right part"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-1/3"
              />
            </div>
          )}

          {selectedType === "o" && (
            <div className="mt-2">
              <input
                type="text"
                placeholder="Enter value"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
              <p className="mt-2 text-gray-600 text-sm">
                Result: <b>{selectedType && input1 ? `${selectedType} : ${input1}` : ""}</b>
              </p>
            </div>
          )}
        </div>

        <input
          type="text"
          name="Model"
          placeholder="Car Model"
          value={formData.Model}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="Motor_type"
          value={formData.Motor_type}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Motor Type</option>
          <option value="Diesel">Diesel</option>
          <option value="Essence">Essence</option>
          <option value="Electric">Electric</option>
        </select>

        <DatePicker
          selected={formData.Date_RDV ? new Date(formData.Date_RDV) : null}
          onChange={(date) => {
            const formatted = date.toISOString().split("T")[0];
            if (disabledDates.includes(formatted)) {
              alert("❌ This date is already booked for the selected service.");
              return;
            }
            setFormData((prev) => ({ ...prev, Date_RDV: formatted }));
          }}
          placeholderText="Select a date"
          dateFormat="yyyy-MM-dd"
          filterDate={(date) => !isDateDisabled(date)}
          minDate={new Date()}
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="file"
          name="Images"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="border border-gray-300 rounded-lg p-2"
        />

        <div className="flex gap-2 flex-wrap">
          {previewImages.map((src, i) => (
            <img key={i} src={src} alt="preview" className="w-20 h-20 object-cover rounded-lg" />
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors duration-300"
        >
          Submit Appointment
        </button>
      </form>
    </div>
  );
};

export default Diagnostics;
