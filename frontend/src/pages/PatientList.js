import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaUserMd, FaSearch, FaSpinner, FaEdit, FaTrashAlt, FaCheck, FaTimes } from "react-icons/fa";

 const evaluatePatientRisk = (glucose, haemoglobin, cholesterol) => {
  const g = Number(glucose) || 0;
  const h = Number(haemoglobin) || 0;
  const c = Number(cholesterol) || 0;

  // CRITICAL RISK
  if (g >= 126 || (h > 0 && h < 11.0) || c >= 240) {
    return {
      status: "CRITICAL RISK",
      color: "bg-rose-500/10 border-rose-500/20 text-rose-400",
      reason: "Critical biomarkers detected (Diabetes, Anemia, or High Cholesterol).",
      remedies: `
        [ACTIONS]: Urgent clinical consultation. 
        [BLOOD/HEMO]: Increase iron-rich foods: Red meat (moderately), beans, lentils, spinach, and fortified cereals. Vitamin C (citrus) improves absorption.
        [CHOLESTEROL]: Eliminate saturated fats (butter, fatty meats, cream). Increase soluble fiber (oats, barley).
        [DIET DO]: Lean proteins, leafy greens, berries, olive oil. [DIET DON'T]: Processed snacks, sugary drinks, fried foods, trans-fats.
        [EXERCISE]: Consult physician first. Gentle walking (20 min). 
        [MEDICATIONS]: Strict adherence to prescribed insulin, iron supplements, or statins.`
    };
  }
  
  // MEDIUM RISK
  if ((g >= 100 && g < 126) || (c >= 200 && c < 240) || (h >= 11.0 && h < 12.0)) {
    return {
      status: "MEDIUM RISK",
      color: "bg-amber-500/10 border-amber-500/20 text-amber-400",
      reason: "Elevated levels identified. Early intervention is required.",
      remedies: `
        [ACTIONS]: Follow-up labs in 4 weeks. Monitor vitals.
        [BLOOD/HEMO]: Eat more beetroot, pomegranate, pumpkin seeds, and cooked greens. Avoid tea/coffee with meals (blocks iron absorption).
        [CHOLESTEROL]: Increase Omega-3 intake (fatty fish, chia seeds, walnuts). Use avocado or almond oil instead of butter.
        [DIET DO]: Whole grains, legumes, fruits, vegetables, nuts. [DIET DON'T]: Deep-fried food, white bread, pastries, excessive red meat.
        [EXERCISE]: 150 mins/week moderate cardio (brisk walking/swimming). 
        [MEDICATIONS]: Generally lifestyle-focused; monitor blood sugar/pressure twice weekly.`
    };
  }

  // HEALTHY
  return {
    status: "HEALTHY",
    color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    reason: "All core biomarkers within optimal range.",
    remedies: `
        [ACTIONS]: Keep up with regular annual physicals.
        [BLOOD/HEMO]: Maintain variety in diet. Ensure adequate B12 and folate (eggs, dairy, meat/plant-based equivalents).
        [CHOLESTEROL]: Maintain active lifestyle. Eat fiber-rich snacks like apples or nuts.
        [DIET DO]: Balanced whole foods, hydration (2-3L water). [DIET DON'T]: Excessive refined sugar and processed junk.
        [EXERCISE]: Consistent daily movement (minimum 30 min activity). 
        [MEDICATIONS]: None needed; continue healthy habits.`
  };
};

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "", email: "", glucose: "", haemoglobin: "", cholesterol: ""
  });

  // --- DATA VALIDATION HELPER ---
  const validateForm = (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert("Invalid email format.");
      return false;
    }
    if (isNaN(data.glucose) || isNaN(data.haemoglobin) || isNaN(data.cholesterol) || 
        Number(data.glucose) < 0 || Number(data.haemoglobin) < 0 || Number(data.cholesterol) < 0) {
      alert("Biomarker values must be positive numbers.");
      return false;
    }
    return true;
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/patients")
      .then((res) => {
        if (!res.ok) throw new Error("Data sync failure.");
        return res.json();
      })
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading patient registries:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/patients/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      if (response.ok) {
        setPatients(patients.filter((p) => p.id !== id));
      } else {
        alert("Server rejected delete.");
      }
    } catch (err) {
      console.error("Error deleting patient row:", err);
    }
  };

  const startEditing = (patient) => {
    setEditingId(patient.id);
    setEditFormData({
      name: patient.name || patient.full_name || "",
      email: patient.email || "",
      glucose: patient.glucose || "",
      haemoglobin: patient.haemoglobin || "",
      cholesterol: patient.cholesterol || ""
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveUpdate = async (id) => {
    // --- TRIGGER VALIDATION ---
    if (!validateForm(editFormData)) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/patients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        setPatients(patients.map((p) => (p.id === id ? { ...p, ...editFormData } : p)));
        setEditingId(null);
      } else {
        alert("Failed to save patient changes onto database server.");
      }
    } catch (err) {
      console.error("Error updating patient profile data:", err);
    }
  };

  const filteredPatients = patients.filter((p) =>
    (p.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-[#0b0f19] text-slate-100 overflow-hidden relative">
      <Navbar />
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-950/40">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                  <FaUserMd size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-white tracking-tight">Evaluated Patient Registries</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Historical records dynamically categorized by the smart analytics module.</p>
                </div>
              </div>
              <div className="relative max-w-xs w-full">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                <input
                  type="text"
                  placeholder="Search patient name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all placeholder-slate-600"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex flex-col items-center justify-center p-20 gap-3 text-slate-400 text-xs font-semibold">
                  <FaSpinner size={24} className="animate-spin text-blue-500" />
                  Loading Secured System Databases...
                </div>
              ) : filteredPatients.length === 0 ? (
                <div className="text-center p-16 text-slate-500 text-xs font-medium">
                  No medical patient rows found matching the filter criteria.
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/20 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                      <th className="px-4 py-4 w-12">ID</th>
                      <th className="px-5 py-4 w-56">Patient Information</th>
                      <th className="px-4 py-4 w-48">Biomarkers (GLU/HGB/CHOL)</th>
                      <th className="px-5 py-4">AI Clinical Analysis & Suggested Remedies</th>
                      <th className="px-4 py-4 text-center w-28">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {filteredPatients.map((patient, index) => {
                      const isEditing = editingId === patient.id;
                      const risk = evaluatePatientRisk(
                        isEditing ? editFormData.glucose : patient.glucose,
                        isEditing ? editFormData.haemoglobin : patient.haemoglobin,
                        isEditing ? editFormData.cholesterol : patient.cholesterol
                      );

                      return (
                        <tr key={patient.id || index} className="hover:bg-slate-800/10 transition-colors align-top">
                          <td className="px-4 py-4 text-xs font-bold text-slate-500 font-mono">#{index + 1}</td>
                          <td className="px-5 py-4">
                            {isEditing ? (
                              <div className="space-y-2">
                                <input type="text" name="name" value={editFormData.name} onChange={handleEditFormChange} className="bg-slate-950 text-xs text-white p-1.5 rounded border border-slate-700 w-full" />
                                <input type="email" name="email" value={editFormData.email} onChange={handleEditFormChange} className="bg-slate-950 text-xs text-slate-300 p-1.5 rounded border border-slate-700 w-full" />
                              </div>
                            ) : (
                              <>
                                <div className="text-xs font-bold text-slate-200">{patient.name || "N/A"}</div>
                                <div className="text-[11px] text-slate-400 mt-0.5 font-medium leading-relaxed">
                                  {patient.email || "no-email@example.com"}
                                  <br />
                                  <span className="text-slate-500">Sex:</span> {patient.biological_sex || "N/A"} • <span className="text-slate-500">DOB:</span> {patient.dob || "N/A"}
                                </div>
                              </>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-1.5 max-w-[150px]">
                              <span className="bg-slate-950/80 border border-slate-800/60 text-slate-400 px-2 py-1 rounded-md text-[10px] font-mono flex items-center justify-between">
                                GLU: {isEditing ? <input type="number" name="glucose" value={editFormData.glucose} onChange={handleEditFormChange} className="bg-slate-900 text-white w-14 text-right px-1 border border-slate-700 rounded" /> : <strong className="text-slate-200 font-bold">{patient.glucose}</strong>}
                              </span>
                              <span className="bg-slate-950/80 border border-slate-800/60 text-slate-400 px-2 py-1 rounded-md text-[10px] font-mono flex items-center justify-between">
                                HGB: {isEditing ? <input type="number" step="0.1" name="haemoglobin" value={editFormData.haemoglobin} onChange={handleEditFormChange} className="bg-slate-900 text-white w-14 text-right px-1 border border-slate-700 rounded" /> : <strong className="text-slate-200 font-bold">{patient.haemoglobin}</strong>}
                              </span>
                              <span className="bg-slate-950/80 border border-slate-800/60 text-slate-400 px-2 py-1 rounded-md text-[10px] font-mono flex items-center justify-between">
                                CHOL: {isEditing ? <input type="number" name="cholesterol" value={editFormData.cholesterol} onChange={handleEditFormChange} className="bg-slate-900 text-white w-14 text-right px-1 border border-slate-700 rounded" /> : <strong className="text-slate-200 font-bold">{patient.cholesterol}</strong>}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 space-y-2 max-w-xl">
                            <div className="flex items-center gap-2"><span className={`px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider border rounded-full ${risk.color}`}>• {risk.status}</span></div>
                            <div className="text-slate-300 text-[11px] leading-relaxed"><strong className="text-slate-400 font-bold">Reason:</strong> {risk.reason}</div>
                            <div className="text-slate-300 text-[11px] leading-relaxed bg-slate-950/40 border border-slate-800/40 p-2 rounded-xl"><strong className="text-blue-400 font-bold">Suggested Remedies:</strong> {risk.remedies}</div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            {isEditing ? (
                              <div className="flex items-center justify-center gap-2 mt-1">
                                <button onClick={() => handleSaveUpdate(patient.id)} title="Save Changes" className="p-2 bg-emerald-950/80 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-lg border border-emerald-800 transition-colors"><FaCheck size={12} /></button>
                                <button onClick={cancelEditing} title="Cancel Editing" className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg border border-slate-700 transition-colors"><FaTimes size={12} /></button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2 mt-1">
                                <button onClick={() => startEditing(patient)} title="Edit Patient Record" className="p-2 bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white rounded-lg border border-slate-700 transition-colors"><FaEdit size={12} /></button>
                                <button onClick={() => { if(window.confirm("Are you sure?")) handleDelete(patient.id); }} title="Delete Patient Record" className="p-2 bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white rounded-lg border border-slate-700 transition-colors"><FaTrashAlt size={12} /></button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PatientList;