import React, { useEffect, useState } from "react";
import axios from "axios";

const RDVTable = () => {
  const [rdvs, setRdvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchRDVs();
  }, []);

  const fetchRDVs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rdv");
      setRdvs(res.data);
    } catch (err) {
      console.error("Error fetching RDVs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    setActionLoading(id);
    try {
      await axios.put(`http://localhost:5000/api/rdv/confirm/${id}`, { status: action });
      await fetchRDVs();
    } catch (err) {
      console.error(`Error ${action} RDV:`, err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (id) => {
    setActionLoading(id);
    try {
      await axios.put(`http://localhost:5000/api/rdv/cancel/${id}`);
      await fetchRDVs();
    } catch (err) {
      console.error("Error cancel RDV:", err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading RDVs...</p>;

  const filteredRdvs = rdvs.filter((rdv) => rdv.Type === false);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Appointments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Matricule</th>
              <th className="py-3 px-4 text-left">Model</th>
              <th className="py-3 px-4 text-left">Motor Type</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Poste</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRdvs.map((rdv) => (
              <tr key={rdv._id} className="border-b hover:bg-gray-100 transition">
                <td className="py-3 px-4">{rdv.First_Name} {rdv.Last_Name}</td>
                <td className="py-3 px-4">{rdv.Matricule}</td>
                <td className="py-3 px-4">{rdv.Model}</td>
                <td className="py-3 px-4">{rdv.Motor_type}</td>
                <td className="py-3 px-4">{new Date(rdv.Date_RDV).toLocaleDateString()}</td>
                <td className="py-3 px-4">{rdv.Poste}</td>
                <td className="py-3 px-4 capitalize">
                  {rdv.status ? rdv.status : "Pending"}
                </td>

                {/* 🖼️ Image Column */}
                <td className="py-3 px-4">
                  {rdv.Images && rdv.Images.length > 0 ? (
                    <img
                      src={rdv.Images[0]} // show first image
                      alt="RDV"
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>

                <td className="py-3 px-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleAction(rdv._id, "approved")}
                    disabled={actionLoading === rdv._id}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleCancel(rdv._id)}
                    disabled={actionLoading === rdv._id}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RDVTable;
