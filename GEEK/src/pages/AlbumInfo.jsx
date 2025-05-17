import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAlbum, fetchPhotosByAlbum, fetchUser } from "../services/api";

export default function AlbumInfo() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const albumRes = await fetchAlbum(albumId);
      const userRes = await fetchUser(albumRes.data.userId);
      const photosRes = await fetchPhotosByAlbum(albumId);
      setAlbum(albumRes.data);
      setUser(userRes.data);
      setPhotos(photosRes.data);
      setLoading(false);
    };
    fetchData();
  }, [albumId]);

  if (loading) return <p>Đang tải...</p>;
  if (!album || !user) return <p>Không tìm thấy dữ liệu</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Chi tiết Album</h2>
      <div style={{ marginBottom: 16 }}>
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
          alt={`Avatar of ${user.name}`}
          width="40"
          style={{ verticalAlign: "middle", borderRadius: "50%" }}
        />
        <span
          onClick={() => navigate(`/users/${user.id}`)}
          style={{ marginLeft: 8, cursor: "pointer", fontWeight: "bold" }}
        >
          {user.name}
        </span>
        <div>
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </div>
      </div>
      <h3>{album.title}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {photos.map((photo) => (
          <a
            key={photo.id}
            href={photo.url.replace("https://via.placeholder.com", "https://dummyjson.com/image")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              width="150"
              height="150"
              style={{ objectFit: "cover" }}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
