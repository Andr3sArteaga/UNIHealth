import { api } from "./api";

export interface MedicalRecord {
  id: number;
  fecha_creacion: string;
  tipo_nota: {
    id: number;
    nombre: string;
  };
  contenido: string;
  medico: {
    id: number;
    nombre: string;
  };
  paciente_id: number;
}

export interface VitalSigns {
  id: number;
  fecha_registro: string;
  presion_sistolica?: number;
  presion_diastolica?: number;
  frecuencia_cardiaca?: number;
  temperatura?: number;
  saturacion_oxigeno?: number;
  peso?: number;
  altura?: number;
  notas?: string;
  paciente_id: number;
}

export interface MedicalAttachment {
  id: number;
  propietario_tabla: string;
  propietario_id: number;
  nombre_archivo: string;
  tipo_mime: string;
  tamanio_bytes: number;
  fecha_subida: string;
  archivo: string; // URL
}

export async function getMedicalRecords() {
  const res = await api.get("/api/records");
  return res.data as MedicalRecord[];
}

export async function getPatientRecords(patientId: number) {
  const res = await api.get(`/api/records/${patientId}`);
  return res.data as MedicalRecord[];
}

export async function createMedicalRecord(data: {
  paciente_id: number;
  tipo_nota_id: number;
  contenido: string;
}) {
  const res = await api.post("/api/records", data);
  return res.data as MedicalRecord;
}

export async function createVitalSigns(data: {
  paciente_id: number;
  presion_sistolica?: number;
  presion_diastolica?: number;
  frecuencia_cardiaca?: number;
  temperatura?: number;
  saturacion_oxigeno?: number;
  peso?: number;
  altura?: number;
  notas?: string;
}) {
  const res = await api.post("/api/vitals", data);
  return res.data as VitalSigns;
}

export async function getPatientVitals(patientId: number) {
  const res = await api.get(`/api/vitals/${patientId}`);
  return res.data as VitalSigns[];
}

export async function uploadMedicalAttachment(formData: FormData) {
  const res = await api.post("/api/attachments", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data as MedicalAttachment;
}

export async function getMedicalAttachments(params: {
  propietario_tabla: string;
  propietario_id: number;
}) {
  const res = await api.get("/api/attachments", { params });
  return res.data as MedicalAttachment[];
}