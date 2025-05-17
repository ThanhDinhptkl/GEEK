
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Albums from "./pages/Albums";
import UserInfo from "./pages/UserInfo";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="p-6 w-full">
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
