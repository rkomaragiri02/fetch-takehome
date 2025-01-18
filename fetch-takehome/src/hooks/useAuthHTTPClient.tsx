import axios from "axios";

const useAuthHTTPClient = () => {
  const base_url = import.meta.env.VITE_BASE_URL;

  const authClient = axios.create({
    baseURL: base_url,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return authClient;
};

export default useAuthHTTPClient;
