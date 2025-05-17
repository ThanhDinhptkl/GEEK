import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ShowAlbum = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [albumRes, photosRes] = await Promise.all([
          axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}`),
          axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`),
        ]);

        const userRes = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${albumRes.data.userId}`
        );

        setAlbum(albumRes.data);
        setUser(userRes.data);
        setPhotos(photosRes.data);
      } catch {
        setError("Không thể tải dữ liệu. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [albumId]);

  const handlePhotoClick = (url) => {
    const fixedUrl = url.replace(
      "https://via.placeholder.com",
      "https://dummyjson.com/image"
    );
    window.open(fixedUrl, "_blank");
  };

  if (loading) return <div className="text-center text-gray-600">Đang tải...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!album || !user) return <div className="text-center text-red-500">Không tìm thấy dữ liệu</div>;

  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="p-5 min-h-screen bg-gray-50">
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => navigate("/albums")}
          className="text-black hover:underline flex items-center gap-1 bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Albums
        </button>
        <span className="text-gray-500">/</span>
        <span className="text-gray-700">Show</span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          {initials}
        </div>
        <div>
          <h2
            className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            {user.name}
          </h2>
          <p className="text-sm text-gray-600"
          onClick={() => window.location.href = `mailto:${user.email}`}
          >{user.email}</p>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">{album.title}</h3>

      <div className="grid grid-cols-5 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="cursor-pointer"
            onClick={() => handlePhotoClick(photo.url)}
          >
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              className="w-[150px] h-[150px] object-cover rounded-md hover:opacity-80 transition-opacity"
            />
            <p className="text-sm text-gray-600 mt-1 truncate">{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAlbum;