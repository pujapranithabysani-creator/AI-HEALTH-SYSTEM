import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PatientForm from "../components/PatientForm";

function AddPatient() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased overflow-x-hidden">
      <Navbar />
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar />
        
        {/* Main Content View Frame */}
        <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto space-y-8 w-full">
          {/* This hooks up your styled patient form component onto the screen canvas */}
          <PatientForm />
        </div>
      </div>
    </div>
  );
}

export default AddPatient;