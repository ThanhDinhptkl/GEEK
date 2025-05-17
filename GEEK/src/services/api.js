import axios from "axios";

const API_BASE = "https://jsonplaceholder.typicode.com";

export const fetchAlbums = () => axios.get(`${API_BASE}/albums`);
export const fetchPhotosByAlbum = (id) =>
  axios.get(`${API_BASE}/albums/${id}/photos`);
export const fetchUsers = () => axios.get(`${API_BASE}/users`);
export const fetchUser = (id) => axios.get(`${API_BASE}/users/${id}`);
export const fetchAlbum = (id) => axios.get(`${API_BASE}/albums/${id}`);
export const fetchAlbumsByUser = (userId) =>
  axios.get(`${API_BASE}/users/${userId}/albums`);
