import { api } from "./api";

export type EmergencyPayload = {
  type: string;             // "caída", "desmayo", etc.
  description?: string;
  lat: number;
  lng: number;
  occurred_at?: string;     // ISO
};

export async function sendEmergency(p: EmergencyPayload) {
  const res = await api.post("/api/alerts/", p);
  return res.data;
}
