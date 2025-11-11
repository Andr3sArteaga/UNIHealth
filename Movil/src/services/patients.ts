import { api } from "./api";

export interface PatientProfile {
  usuario_id: number;
  fecha_nacimiento: string;
  telefono?: string;
  direccion?: string;
  contacto_emergencia_nombre?: string;
  contacto_emergencia_telefono?: string;
  alergias?: string;
  medicamentos_actuales?: string;
  condiciones_medicas?: string;
  tipo_sangre?: string;
  numero_seguro_social?: string;
  numero_poliza?: string;
  compania_seguro?: string;
  usuario: {
    id: number;
    nombre: string;
    email: string;
    rol: {
      id: number;
      nombre: string;
    };
  };
}

export interface Consent {
  id: number;
  tipo_consentimiento: string;
  descripcion: string;
  fecha_consentimiento: string;
  consentimiento_otorgado: boolean;
  paciente_id: number;
}

export async function getMyProfile() {
  const res = await api.get("/api/me/profile");
  return res.data as PatientProfile;
}

export async function updateMyProfile(data: Partial<PatientProfile>) {
  const res = await api.put("/api/me/profile", data);
  return res.data as PatientProfile;
}

export async function getMyConsents() {
  const res = await api.get("/api/me/consentimientos");
  return res.data as Consent[];
}

export async function createConsent(data: {
  tipo_consentimiento: string;
  descripcion: string;
  consentimiento_otorgado: boolean;
}) {
  const res = await api.post("/api/me/consentimientos", data);
  return res.data as Consent;
}