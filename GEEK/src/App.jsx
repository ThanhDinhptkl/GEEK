import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AlbumsPage from "./pages/Albums";
import UsersPage from "./pages/Users";
import AlbumInfoPage from "./pages/AlbumInfo";
import UserInfoPage from "./pages/UserInfo";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AlbumsPage />} />
        <Route path="/albums/:albumId" element={<AlbumInfoPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:userId" element={<UserInfoPage />} />
      </Routes>
    </Router>
  );
}
