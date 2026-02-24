export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

export const setToken = (token) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("accessToken", token);
};

export const clearToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("accessToken");
};