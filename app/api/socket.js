import { io } from "socket.io-client";
import { getToken, setToken } from "../auth/tokenManager";

let socket;

export const getSocket = async () => {
  if (socket) return socket;

  let token = getToken();

  socket = io("http://localhost:5000", {
    autoConnect: false,
    auth: { token },
  });

  try {
    await socket.connect();
  } catch (err) {
    console.error("Socket connect failed:", err);
    socket = null;
    return null;
  }

  return socket;
};