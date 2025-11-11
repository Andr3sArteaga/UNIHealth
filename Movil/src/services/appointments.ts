import { api } from "./api";

export interface AppointmentSlot {
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  disponible: boolean;
  medico_id: number;
  servicio_id: number;
}

export interface Appointment {
  id: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado: string;
  notas?: string;
  paciente: {
    id: number;
    nombre: string;
    email: string;
  };
  medico: {
    id: number;
    nombre: string;
    especialidad?: string;
  };
  servicio: {
    id: number;
    nombre: string;
    duracion_minutos: number;
  };
}

export async function getAvailableSlots(params: {
  fecha?: string;
  medico_id?: number;
  servicio_id?: number;
}) {
  const res = await api.get("/api/appointments/slots", { params });
  return res.data as AppointmentSlot[];
}

export async function createAppointment(data: {
  fecha: string;
  hora_inicio: string;
  medico_id: number;
  servicio_id: number;
  notas?: string;
}) {
  const res = await api.post("/api/appointments", data);
  return res.data as Appointment;
}

export async function getMyAppointments() {
  const res = await api.get("/api/appointments", { params: { mine: "true" } });
  return res.data as Appointment[];
}

export async function updateAppointment(id: number, data: {
  estado?: string;
  notas?: string;
}) {
  const res = await api.patch(`/api/appointments/${id}`, data);
  return res.data as Appointment;
}