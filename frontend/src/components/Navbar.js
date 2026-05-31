import React from "react";

function Navbar() {
  return (
    <nav className="bg-[#0b0f19] border-b border-slate-800/80 px-8 py-4 flex items-center justify-between relative z-50">
      <div className="flex items-center gap-4">
        {/* 📈 NEAT ANIMATED HEARTBEAT WAVE LINE IMAGE/SVG */}
        <div className="flex items-center justify-center text-rose-500 relative w-12 h-10">
          <svg
            className="w-full h-full stroke-current"
            viewBox="0 0 100 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 20 H30 L35 5 L42 35 L48 15 L52 23 L55 20 H100"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-[dash_2s_linear_infinite]"
              style={{
                strokeDasharray: "150",
                strokeDashoffset: "150",
                animation: "heartbeat-wave 2s linear infinite",
              }}
            />
          </svg>
          
          {/* Injecting keyframe styles directly so you don't have to touch index.css */}
          <style>{`
            @keyframes heartbeat-wave {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}</style>
        </div>

        {/* 📋 BRAND HEADINGS IN NEW COLORS */}
        <div>
          <h1 className="text-xl font-black tracking-wide text-white">
            AI Health Prediction System
          </h1>
          <p className="text-cyan-400 text-xs font-semibold tracking-wider uppercase mt-0.5">
            Smart Healthcare Analytics Dashboard
          </p>
        </div>
      </div>

      {/* RIGHT SIDE LIVE STATUS INDICATOR */}
      <div className="hidden sm:flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
          AI Engine Online
        </span>
      </div>
    </nav>
  );
}

export default Navbar;