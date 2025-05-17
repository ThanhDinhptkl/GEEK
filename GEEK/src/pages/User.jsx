import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const getInitials = (name) =>
  name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const avatarColors = [
  "bg-pink-600", "bg-yellow-400", "bg-blue-600", "bg-purple-600",
  "bg-gray-400", "bg-red-500", "bg-green-500", "bg-indigo-500",
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="overflow-x-auto bg-white text-gray-800 min-h-screen p-4">
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <table className="table w-full border min-w-[1000px]">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Avatar</th>
            <th className="border px-20 py-2">Name</th>
            <th className="border px-20 py-2">Email</th>
            <th className="border px-20 py-2">Phone</th>
            <th className="border px-20 py-2">Website</th>
            <th className="border px-20 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    avatarColors[idx % avatarColors.length]
                  }`}
                >
                  {getInitials(user.name)}
                </div>
              </td>
              <td className="border px-4 py-2">{user.name}</td>
              <td
                className="border px-4 py-2 text-blue-600 cursor-pointer"
                onClick={() => window.location.href = `mailto:${user.email}`}
              >
                {user.email}
              </td>
              <td
                className="border px-4 py-2 text-blue-600 cursor-pointer"
                onClick={() => window.location.href = `tel:${user.phone}`}
              >
                {user.phone}
              </td>
              <td 
                className="border px-4 py-2 text-blue-600 cursor-pointer underline"
                onClick={() => window.open(`http://${user.website}`, '_blank')}
              >
                {user.website}
              </td>
              <td 
                className="border px-4 py-2"
                onClick={() => navigate(`/albums/${user.id}`)}
              >
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

export default Users;