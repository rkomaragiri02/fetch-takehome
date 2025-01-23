import axios from "axios";
import { useNavigate } from "react-router";

const useAuthHTTPClient = () => {
  // const base_url = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const authClient = axios.create({
    baseURL: __BASE_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  authClient.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      // Intercepts error. If it's a 401, it will redirect to the login page
      if (err.response.status === 401) navigate("/");
      return Promise.reject(err);
    },
  );

  return authClient;
};

export default useAuthHTTPClient;
