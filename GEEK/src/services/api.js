import axios from "axios";

const API_BASE = "https://jsonplaceholder.typicode.com";

export const fetchAlbums = () => axios.get(`${API_BASE}/albums`);
