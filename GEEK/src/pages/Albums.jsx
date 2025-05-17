
import React, { useEffect, useState } from "react";
import axios from "axios";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);

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

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">User</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {albums.slice(0, 10).map((album) => {
            const user = getUser(album.userId);
            return (
              <tr key={album.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{album.id}</td>
                <td className="border px-4 py-2">{album.title}</td>
                <td className="border px-4 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {user?.name.split(" ").map(word => word[0]).join("").toUpperCase()}
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
    </div>
  );
};

export default Albums;
