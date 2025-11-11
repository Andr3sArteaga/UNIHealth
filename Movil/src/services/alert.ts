import { api } from "./api";

export interface Alert {
  id: number;
  tipo_alerta: {
    id: number;
    nombre: string;
    gravedad: string;
  };
  descripcion: string;
  latitud?: number;
  longitud?: number;
  direccion?: string;
  estado: string;
  fecha_creacion: string;
  fecha_asignacion?: string;
  fecha_cierre?: string;
  paciente: {
    id: number;
    nombre: string;
    email: string;
  };
  medico_asignado?: {
    id: number;
    nombre: string;
  };
}

export interface AlertEvent {
  id: number;
  tipo_evento: string;
  descripcion: string;
  fecha_evento: string;
  usuario: {
    id: number;
    nombre: string;
  };
}

export type EmergencyPayload = {
  tipo_alerta_id: number;
  descripcion: string;
  latitud?: number;
  longitud?: number;
  direccion?: string;
};

export async function createAlert(data: EmergencyPayload) {
  const res = await api.post("/api/alerts", data);
  return res.data as Alert;
}

export async function sendEmergency(p: EmergencyPayload) {
  return createAlert(p);
}

export async function getAlerts() {
  const res = await api.get("/api/alerts");
  return res.data as Alert[];
}

export async function getAlert(id: number) {
  const res = await api.get(`/api/alerts/${id}`);
  return res.data as Alert;
}

export async function assignAlert(id: number, medico_id: number) {
  const res = await api.post(`/api/alerts/${id}/assign`, { medico_id });
  return res.data as Alert;
}

export async function updateAlertStatus(id: number, estado: string, notas?: string) {
  const res = await api.post(`/api/alerts/${id}/status`, { estado, notas });
  return res.data as Alert;
}

export async function addAlertEvent(id: number, data: {
  tipo_evento: string;
  descripcion: string;
}) {
  const res = await api.post(`/api/alerts/${id}/event`, data);
  return res.data as AlertEvent;
}
