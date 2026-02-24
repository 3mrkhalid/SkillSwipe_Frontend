import axios from "axios";
import { getToken, setToken, clearToken } from "../auth/tokenManager";

const api = axios.create({
  baseURL: "",
  withCredentials: true,
});

let isRefreshing = false;
let queue = [];

// Attach token to each request
api.interceptors.request.use((config) => {
  const token = getToken();

  config.headers.Authorization = `Bearer ${token}`;
  
  return config;
});

// Handle 403 errors and refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 403 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: (token) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(api(original));
            },
            reject,
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const res = await api.get("/api/v1/auth/refresh");
        setToken(res.data.accessToken); // update localStorage

        // Retry all queued requests
        queue.forEach((p) => p.resolve(res.data.accessToken));
        queue = [];

        original.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(original);
      } catch (err) {
        queue.forEach((p) => p.reject(err));
        queue = [];
        clearToken();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;