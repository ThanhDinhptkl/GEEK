import React, { useEffect, useState } from "react";
import axios from "axios";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

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

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border min-w-[1200px]">
        <thead className="bg-green">
          <tr>
            <th className="py-2 border min-w-[80px]">ID</th>
            <th className="px-70 py-2 border min-w-[600px]">Title</th>
            <th className="px-40 py-2 border min-w-[300px]">User</th>
            <th className="px-5 py-2 border min-w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAlbums.map((album) => {
            const user = getUser(album.userId);
            return (
              <tr key={album.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{album.id}</td>
                <td className="border px-4 py-2">{album.title}</td>
                <td className="border px-4 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {user?.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <span className="text-blue-600">{user?.name}</span>
                </td>
                <td className="border px-4 py-2">
                  <button className="flex items-center gap-1 text-sm border rounded px-2 py-1 hover:bg-gray-100">
                    👁️ Show
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
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
                    ? "bg-blue-100 border-blue-500"
                    : "hover:bg-gray-100"
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
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>

        <div className="text-sm">
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="border px-2 py-1 rounded"
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