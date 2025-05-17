import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [albumsRes, usersRes] = await Promise.all([
        axios.get("https://jsonplaceholder.typicode.com/albums"),
        axios.get("https://jsonplaceholder.typicode.com/users"),
      ]);
      setAlbums(albumsRes.data);
      setUsers(usersRes.data);
    };

    fetchData();
  }, []);

  const getUser = (userId) => users.find((u) => u.id === userId);

  const totalPages = Math.ceil(albums.length / pageSize);
  const paginatedAlbums = albums.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const avatarColors = [
    "bg-pink-500", "bg-yellow-400", "bg-blue-500", "bg-purple-500",
    "bg-gray-400", "bg-red-400", "bg-green-500", "bg-indigo-500",
  ];

  return (
    <div className="p-4 min-h-screen bg-white text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Albums</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left min-w-[80px]">ID</th>
            <th className="border border-gray-200 px-4 py-2 text-left min-w-[600px]">Title</th>
            <th className="border border-gray-200 px-4 py-2 text-left min-w-[300px]">User</th>
            <th className="border border-gray-200 px-4 py-2 text-left min-w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAlbums.map((album, index) => {
            const user = getUser(album.userId);
            const initials = user?.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase();
            const color = avatarColors[index % avatarColors.length];

            return (
              <tr key={album.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{album.id}</td>
                <td className="border border-gray-300 px-4 py-2">{album.title}</td>
                <td className="border border-gray-300 px-4 py-2"
                onClick={() => navigate(`/users/${user.id}`)}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${color}`}
                    >
                      {initials}
                    </div>
                    <span className="text-blue-600">{user?.name}</span>
                  </div>
                </td>
                <td className="border border-gray-300 bg-white px-4 py-2"
                onClick={() => navigate(`/albums/${album.id}`)}
                >
                  <button className="text-sm text-gray-700 border border-gray-300 px-2 py-1 bg-white">
                    👁️ Show
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 bg-white">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-50 bg-white"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(0, 5)
            .map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${
                  currentPage === page
                    ? "bg-blue-100 border-blue-500 bg-white"
                    : "hover:bg-gray-100 bg-white"
                }`}
              >
                {page}
              </button>
            ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50 bg-white"
          >
            &gt;
          </button>
        </div>

        <div className="text-sm">
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="border px-2 py-1 rounded bg-white text-gray-700"
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Albums;
