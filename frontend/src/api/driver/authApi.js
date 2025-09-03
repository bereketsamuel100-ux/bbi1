import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:5000/api/delivery/auth",
  withCredentials: true,
});

export default authApi;
