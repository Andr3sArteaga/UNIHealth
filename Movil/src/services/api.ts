import axios from "axios";
import Constants from "expo-constants";

const baseURL =
  (Constants.expoConfig?.extra as any)?.apiUrl ??
  (Constants.manifest?.extra as any)?.apiUrl ??
  "http://10.0.2.2:8000";

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

export function setAuthToken(token?: string) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}
