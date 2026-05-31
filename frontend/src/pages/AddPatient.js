import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaHeartbeat, FaShieldAlt, FaTimes, FaSpinner } from "react-icons/fa";

function AddPatient() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    biological_sex: "",
    dob: "",
    email: "", 
    glucose: "",
    haemoglobin: "",
    cholesterol: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSaving(true);

    try {
      // Points exactly to your local Flask backend API port
      const response = await fetch("http://127.0.0.1:5000/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          biological_sex: formData.biological_sex,
          dob: formData.dob,
          glucose: Number(formData.glucose) || 0,
          haemoglobin: Number(formData.haemoglobin) || 0,
          cholesterol: Number(formData.cholesterol) || 0
        })
      });

      if (!response.ok) {
        throw new Error("Server rejected the data pipeline payload transaction.");
      }

      setSuccessMessage("Record evaluated and saved successfully!");
      setTimeout(() => {
        setIsSaving(false);
        navigate("/"); // Redirects to dashboard automatically
      }, 1200);

    } catch (err) {
      setIsSaving(false);
      setErrorMessage("Could not sync with database server. Make sure app.py is running!");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0b0f19] text-slate-100 overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <Navbar />
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden">
            
            {/* 🌌 High-Tech Image Banner Backdrop */}
            <div className="relative bg-cover bg-center px-8 py-7 flex flex-col justify-center min-h-[120px]"
                 style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop')` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-indigo-950/40" />
              <div className="flex items-center gap-4 relative z-10 p-6">
                            {/* 🔴 RED HEARTBEAT ANIMATED LOGO */}
                            <div className="p-3 bg-rose-500/20 rounded-xl border border-rose-500/40 shadow-lg shadow-rose-950/60 text-rose-500 animate-pulse flex-shrink-0">
                              <FaHeartbeat size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">Intake New Patient Record</h2>
                  <p className="text-slate-300 text-xs mt-0.5">Input baseline clinical features for automated model risk analysis calculations.</p>
                </div>
              </div>
            </div>

            {errorMessage && <div className="mx-8 mt-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-bold">⚠️ {errorMessage}</div>}
            {successMessage && <div className="mx-8 mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold">✓ {successMessage}</div>}

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/40 pb-2">Personal Credentials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div>
                    <label className="block text-slate-400 text-[11px] font-bold uppercase mb-2">Full Name</label>
                    <input type="text" name="name" required placeholder="John Doe" value={formData.name} onChange={handleChange} className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] font-bold uppercase mb-2">Biological Sex</label>
                    <select name="biological_sex" required value={formData.biological_sex} onChange={handleChange} className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50">
                      <option value="">Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] font-bold uppercase mb-2">Date of Birth</label>
                    <input type="date" name="dob" required value={formData.dob} onChange={handleChange} className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 [color-scheme:dark]" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] font-bold uppercase mb-2">Email Address</label>
                    <input type="email" name="email" required placeholder="johndoe@example.com" value={formData.email} onChange={handleChange} className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800/40 pb-2">AI Diagnostic Biomarkers</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-slate-400 text-[11px] font-bold uppercase mb-2">Glucose Level (mg/dL)</label>
                    <input type="number" name="glucose" placeholder="Normal: <100" value={formData.glucose} onChange={handleChange} className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] font-bold uppercase mb-2">Haemoglobin (g/dL)</label>
                    <input type="number" step="0.1" name="haemoglobin" placeholder="Normal: 12.0 - 17.5" value={formData.haemoglobin} onChange={handleChange} className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] font-bold uppercase mb-2">Cholesterol (mg/dL)</label>
                    <input type="number" name="cholesterol" placeholder="Normal: <200" value={formData.cholesterol} onChange={handleChange} className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-slate-800/60 pt-6 gap-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <FaShieldAlt size={13} className="animate-pulse" />
                  <span className="text-slate-500 font-medium">Secured Encryption Mode:</span> HIPAA Secure Channel
                </div>
                <div className="flex items-center gap-3">
                  <a href="/" className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 border border-slate-800 text-slate-400 text-xs font-bold rounded-xl"><FaTimes size={11} /> Cancel</a>
                  <button type="submit" disabled={isSaving} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-bold rounded-xl uppercase tracking-wider">
                    {isSaving ? <><FaSpinner size={12} className="animate-spin" /> Saving...</> : "Execute AI Evaluation"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddPatient;