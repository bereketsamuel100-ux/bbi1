import axios from "axios";

const driverApi = axios.create({
  baseURL: "http://localhost:5000/api/delivery/drivers",
  withCredentials: true,
});

export default driverApi;
