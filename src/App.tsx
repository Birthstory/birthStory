import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BirthStoryLanding from "./pages/Landing";
import BirthStoryDashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BirthStoryLanding />} />
        <Route path="/dashboard" element={<BirthStoryDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}