import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Albums from "./pages/Albums";
import UserInfo from "./pages/User";
import ShowUser from "./components/ShowUser";
import ShowAlbum from "./components/ShowAlbum";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-6 overflow-auto bg-white text-white">
          <Routes>
            <Route path="/" element={<Navigate to="/albums" />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/users" element={<UserInfo />} />
             <Route path="/users/:userId" element={<ShowUser />} />
             <Route path="/albums/:albumId" element={<ShowAlbum />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
