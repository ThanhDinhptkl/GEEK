import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ShowUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchUserAndAlbums = async () => {
      try {
        const [userRes, albumsRes] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`),
          axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`),
        ]);
        setUser(userRes.data);
        setAlbums(albumsRes.data);
      } catch (error) {
        console.error("Failed to fetch user or albums", error);
      }
    };

    fetchUserAndAlbums();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

return (
    <div className="p-6 min-h-screen bg-white text-gray-800">
        <div className="text-sm text-gray-500 mb-2 flex items-center gap-1">
            <Link to="/users" className="hover:underline">Users</Link>
            <span>/</span>
            <span className="font-semibold">Show</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
            <Link to="/users" className="inline-flex items-center gap-1 text-gray-900 font-semibold hover:underline">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </Link>
            <h1 className="text-2xl font-bold">Show User</h1>
        </div>

        <div className="mb-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-semibold text-lg">
                {user.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
            </div>
            <div>
                <h2 className="font-semibold text-xl">{user.name}</h2>
                <a href={`mailto:${user.email}`} className="text-blue-600 underline">
                    {user.email}
                </a>
            </div>
        </div>

        <h3 className="font-semibold text-lg mb-2">Albums</h3>
        <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
                <tr>
                    <th className="border border-gray-200 px-20 py-2 text-left">ID</th>
                    <th className="border border-gray-200 px-80 py-2 text-left">Title</th>
                    <th className="border border-gray-200 px-40 py-2 text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {albums.map((album) => (
                    <tr key={album.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">{album.id}</td>
                        <td className="border border-gray-300 px-4 py-2">{album.title}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <button className="text-sm text-gray-700 border border-gray-300 px-2 py-1 bg-white">
                                👁️ Show
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};

export default ShowUser;
