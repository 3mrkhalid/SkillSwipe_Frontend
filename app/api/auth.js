import api from "./axios";
import { setToken }from "../auth/tokenManager";

export const login = async ({ email, password }) => {
  const res = await api.post("/api/v1/auth/login", {
    email,
    password,
  });

  
  setToken(res.data.token);

  return res;
};


export const register = async ({username, email, password }) => {
  const res = await api.post("/api/v1/auth/register", {
    username,
    email,
    password,
});
  
  setToken(res.data.token);

  return res;
};

export const logout = async() => {
  const res = await api.post("/api/v1/auth/logout");

  return;
}
