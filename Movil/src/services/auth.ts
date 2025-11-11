import { api } from "./api";

export async function login(data: { email: string; password: string }) {
  const res = await api.post("/api/auth/login/", data);
  return res.data; // {token, user:{id,name,role}}
}

export async function register(data: any) {
  const res = await api.post("/api/auth/register/", data);
  return res.data;
}
