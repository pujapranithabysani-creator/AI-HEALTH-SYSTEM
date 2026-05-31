import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddPatient from "./pages/AddPatient";
import PatientList from "./pages/PatientList";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/add-patient" element={<AddPatient />} />

        <Route path="/patients" element={<PatientList />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;