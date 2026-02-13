import api from "./axios";



export const me = async () => {
    const res = await api.get("/api/v1/users/me")
    return res;
}