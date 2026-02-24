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

export const sendResetCode = async (email) => {
  const { data } = await api.post("/api/v1/auth/forgetPassword", { email });
  return data;
};

export const verifyResetCode = async (email, resetCode) => {
  const { data } = await api.post("/api/v1/auth/verifyResetCode", { email, resetCode });
  return data;
};

export const resetPassword = async (email, resetCode, newPassword) => {
  const { data } = await api.post("/api/v1/auth/resetPassword", { email, resetCode, newPassword });
  return data;
};

export const logout = async() => {
  const res = await api.post("/api/v1/auth/logout");

  return;
}
