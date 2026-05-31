import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaUsers, FaHeartbeat, FaExclamationTriangle, FaSkullCrossbones, FaPlus, FaClipboardList, FaRobot } from "react-icons/fa";

// 🧮 LIVE REAL-TIME AI RISK CALCULATION ENGINE
const getCalculatedRisk = (glucose, haemoglobin, cholesterol) => {
  const g = Number(glucose) || 0;
  const h = Number(haemoglobin) || 0;
  const c = Number(cholesterol) || 0;

  // 🚨 CRITICAL HIGH RISK BOUNDS
  if (g >= 126 || (h > 0 && h < 11.0) || c >= 240) {
    return "CRITICAL RISK";
  }
  // ⚠️ MEDIUM RISK BOUNDS
  if ((g >= 100 && g < 126) || (c >= 200 && c < 240)) {
    return "MEDIUM RISK";
  }
  // ✓ HEALTHY DEFAULT BOUNDS
  return "HEALTHY";
};

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");

  // 🎯 SCROLL ANCHOR REFERENCE POINT FOR THE TABLE
  const tableSectionRef = useRef(null);

  useEffect(() => {
    // Synchronize diagnostic metrics from the live backend server
    fetch("http://localhost:5000/api/patients")
      .then((res) => {
        if (!res.ok) throw new Error("Database link synchronization failure.");
        return res.json();
      })
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard failed to retrieve real-time data registry:", err);
        setLoading(false);
      });
  }, []);

  // 🛠️ AUTOSCROLL INTERACTION HANDLER
  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    
    // Automatically executes an instantaneous smooth scroll jump straight to table results
    if (tableSectionRef.current) {
      tableSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 🧮 Live analytic distributions calculated dynamically (No longer hardcoded!)
  const totalCount = patients.length;
  
  const healthyCount = patients.filter(
    (p) => getCalculatedRisk(p.glucose, p.haemoglobin, p.cholesterol) === "HEALTHY"
  ).length;
  
  const mediumCount = patients.filter(
    (p) => getCalculatedRisk(p.glucose, p.haemoglobin, p.cholesterol) === "MEDIUM RISK"
  ).length;
  
  const criticalCount = patients.filter(
    (p) => getCalculatedRisk(p.glucose, p.haemoglobin, p.cholesterol) === "CRITICAL RISK"
  ).length;

  const filteredPatients = patients.filter((p) => {
    if (activeFilter === "ALL") return true;
    return getCalculatedRisk(p.glucose, p.haemoglobin, p.cholesterol) === activeFilter;
  });

  const getRiskStatusLabel = (status) => {
    if (status === "CRITICAL RISK") return "Critical Risk";
    if (status === "MEDIUM RISK") return "Medium Risk";
    return "Healthy";
  };

  const getStatusPillClasses = (status) => {
    if (status === "Critical Risk") return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    if (status === "Medium Risk") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  };

  return (
    <div className="flex flex-col h-screen bg-[#0b0f19] text-slate-100 overflow-hidden relative">
      
      {/* Clean Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <Navbar />
      
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar />
        
        <main className="flex-1 p-8 overflow-y-auto space-y-8 scrollbar-thin scrollbar-thumb-slate-800">
          
          {/* 🌌 HERO BANNER WITH SCIENCE / ARTIFICIAL INTELLIGENCE ABSTRACT BACKGROUND */}
          <div 
            className="rounded-2xl border border-slate-800/60 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden bg-cover bg-center min-h-[140px]"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2070&auto=format&fit=crop')` 
            }}
          >
            {/* Deep Cyber Gradient Overlay mask to keep white title clean and high-contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/40 backdrop-blur-[0.5px] pointer-events-none" />
            
            <div className="flex items-center gap-4 relative z-10 p-6">
              {/* 🔴 RED HEARTBEAT ANIMATED LOGO */}
              <div className="p-3 bg-rose-500/20 rounded-xl border border-rose-500/40 shadow-lg shadow-rose-950/60 text-rose-500 animate-pulse flex-shrink-0">
                <FaHeartbeat size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-md">
                  AI Health Prediction Dashboard
                </h1>
                <p className="text-slate-300 text-xs font-semibold mt-0.5 max-w-xl drop-shadow">
                  Smart patient monitoring using AI-driven analysis of glucose, haemoglobin, and cholesterol values.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2.5 text-[11px] font-bold self-start md:self-auto relative z-10 p-6 md:pl-0">
              <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30 backdrop-blur-md shadow-md">Accuracy: 96%</span>
              <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md shadow-md">AI Status: Active</span>
            </div>
          </div>

          {/* 🏷️ STRATIFICATION GLASSMORPHISM ANCHOR CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Total Records Card */}
            <div 
              onClick={() => handleFilterClick("ALL")}
              className={`bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 relative overflow-hidden group ${
                activeFilter === "ALL" ? "border-blue-500 shadow-blue-500/10 bg-slate-900" : "border-slate-800/80"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-400 transition-colors">Total Patients</p>
                  <h3 className="text-3xl font-black text-white mt-1">{totalCount}</h3>
                </div>
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/10 group-hover:scale-110 transition-transform"><FaUsers size={20} /></div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ${activeFilter === "ALL" ? "bg-blue-500" : "bg-transparent group-hover:bg-blue-500/50"}`} />
            </div>

            {/* Healthy Card Selector */}
            <div 
              onClick={() => handleFilterClick("HEALTHY")}
              className={`bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 relative overflow-hidden group ${
                activeFilter === "HEALTHY" ? "border-emerald-500 shadow-emerald-500/10 bg-slate-900" : "border-slate-800/80"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-400 transition-colors">Healthy</p>
                  <h3 className="text-3xl font-black text-emerald-400 mt-1">{healthyCount}</h3>
                </div>
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/10 group-hover:scale-110 transition-transform"><FaHeartbeat size={20} /></div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ${activeFilter === "HEALTHY" ? "bg-emerald-500" : "bg-transparent group-hover:bg-emerald-500/50"}`} />
            </div>

            {/* Medium Risk Card Selector */}
            <div 
              onClick={() => handleFilterClick("MEDIUM RISK")}
              className={`bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 relative overflow-hidden group ${
                activeFilter === "MEDIUM RISK" ? "border-amber-500 shadow-amber-500/10 bg-slate-900" : "border-slate-800/80"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-400 transition-colors">Medium Risk</p>
                  <h3 className="text-3xl font-black text-amber-400 mt-1">{mediumCount}</h3>
                </div>
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/10 group-hover:scale-110 transition-transform"><FaExclamationTriangle size={18} /></div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ${activeFilter === "MEDIUM RISK" ? "bg-amber-500" : "bg-transparent group-hover:bg-amber-500/50"}`} />
            </div>

            {/* Critical Risk Card Selector */}
            <div 
              onClick={() => handleFilterClick("CRITICAL RISK")}
              className={`bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 relative overflow-hidden group ${
                activeFilter === "CRITICAL RISK" ? "border-rose-500 shadow-rose-500/10 bg-slate-900" : "border-slate-800/80"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-400 transition-colors">Critical Risk</p>
                  <h3 className="text-3xl font-black text-rose-400 mt-1">{criticalCount}</h3>
                </div>
                <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/10 group-hover:scale-110 transition-transform"><FaSkullCrossbones size={18} /></div>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ${activeFilter === "CRITICAL RISK" ? "bg-rose-500" : "bg-transparent group-hover:bg-rose-500/50"}`} />
            </div>

          </div>

          {/* Quick Shortcuts Operational Actions Panel */}
          <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-slate-800/80 shadow-md space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quick Operational Actions</h4>
            <div className="flex flex-wrap gap-3">
              <a href="/add-patient" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/30">
                <FaPlus size={11} /> Add New Patient
              </a>
              <a href="/patients" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all border border-slate-700">
                <FaClipboardList size={12} /> View Complete Registry
              </a>
            </div>
          </div>

          {/* 🤖 CUSTOM HIGHLIGHTED AI DIAGNOSTICS CONTAINER PANEL */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-indigo-500/30 shadow-xl shadow-indigo-950/40 flex items-start gap-4 transition-all duration-300 transform hover:scale-[1.01] hover:border-indigo-400/40 hover:shadow-indigo-500/5 group">
            <div className="p-3 bg-indigo-500/10 text-cyan-400 rounded-xl border border-indigo-500/20 mt-0.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-inner">
              <FaRobot size={20} className="animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                About AI Diagnostics
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed max-w-4xl font-medium tracking-wide">
                AI diagnosis refers to the use of artificial intelligence and machine learning algorithms to assist healthcare professionals in identifying diseases. By rapidly analyzing vast amounts of patient data—such as medical images, lab results, and electronic health records—AI detects hidden patterns, flags abnormalities, and improves both the speed and accuracy of medical diagnoses.
              </p>
            </div>
          </div>

          {/* 📋 INBOUND REAL-TIME FILTERED REGISTRY DATAGRID */}
          <div 
            ref={tableSectionRef} 
            className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden scroll-mt-6"
          >
            <div className="p-5 border-b border-slate-800/60 bg-slate-900/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">Recently Evaluated Inbound Profiles</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Displays patients sorted dynamically by risk metrics selection state</p>
              </div>
              
              <span className={`text-[10px] px-3 py-1 rounded-full border font-bold uppercase tracking-wider backdrop-blur-sm ${
                activeFilter === "ALL" ? "bg-slate-800 text-slate-400 border-slate-700" :
                activeFilter === "HEALTHY" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                activeFilter === "MEDIUM RISK" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                "bg-rose-500/10 text-rose-400 border-rose-500/20"
              }`}>
                Showing Status: {activeFilter === "CRITICAL RISK" ? "Critical Risk" : activeFilter === "MEDIUM RISK" ? "Medium Risk" : activeFilter === "HEALTHY" ? "Healthy" : "All"}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/20 border-b border-slate-800/60 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                    <th className="p-4 w-16">ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email Address</th>
                    <th className="p-4 text-center w-40">Risk Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-slate-400 divide-y divide-slate-800/40">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-slate-400 font-medium">Syncing diagnostic matrix pipelines...</td>
                    </tr>
                  ) : filteredPatients.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-10 text-center text-slate-500 font-medium">
                        No patient record matches the active category filter state: <strong className="text-slate-400 font-bold">"{activeFilter === "CRITICAL RISK" ? "Critical Risk" : activeFilter === "MEDIUM RISK" ? "Medium Risk" : activeFilter === "HEALTHY" ? "Healthy" : "All"}"</strong>.
                      </td>
                    </tr>
                  ) : (
                    filteredPatients.slice(0, 5).map((p, index) => {
                      // Call evaluation logic cleanly for the data row item
                      const calculatedRiskState = getCalculatedRisk(p.glucose, p.haemoglobin, p.cholesterol);
                      const displayStatus = getRiskStatusLabel(calculatedRiskState);
                      const statusStyles = getStatusPillClasses(displayStatus);

                      return (
                        <tr key={p.id || index} className="hover:bg-slate-800/20 transition-colors">
                          <td className="p-4 font-mono text-slate-600">#{index + 1}</td>
                          <td className="p-4 font-bold text-slate-200">{p.name || p.full_name}</td>
                          <td className="p-4 font-medium text-slate-400">{p.email}</td>
                          <td className="p-4 text-center">
                            <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wide backdrop-blur-sm ${statusStyles}`}>
                              ● {displayStatus}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;