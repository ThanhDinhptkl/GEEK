import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Albums from "./pages/Albums";
import UserInfo from "./pages/UserInfo";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-6 overflow-auto bg-gray-900 text-white">
          <Routes>
            <Route path="/" element={<Navigate to="/albums" />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/users" element={<UserInfo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
