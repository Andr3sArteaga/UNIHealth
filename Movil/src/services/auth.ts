import { api } from "./api";

export async function login(data: { email: string; password: string }) {
  const res = await api.post("/api/auth/login", data);
  return res.data; // {access, refresh, user}
}

export async function register(data: any) {
  const res = await api.post("/api/auth/register", data);
  return res.data;
}

export async function refreshToken(refreshToken: string) {
  const res = await api.post("/api/auth/refresh", { refresh: refreshToken });
  return res.data; // {access}
}

export async function getMe() {
  const res = await api.get("/api/auth/me");
  return res.data; // user profile
}
