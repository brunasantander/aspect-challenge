import axios from "axios";
import {
  Exam,
  Appointment,
  CreateAppointmentDTO,
  UpdateAppointmentDTO,
  AppointmentFilters,
  AppointmentStatus,
} from "../types";

// Configuração base do Axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || "Erro ao conectar com o servidor";
    console.error("API Error:", message);
    return Promise.reject(new Error(message));
  }
);

// ============ EXAMS API ============

export const examService = {
  // Listar todos os exames
  getAll: async (): Promise<Exam[]> => {
    const response = await api.get<Exam[]>("/exams");
    return response.data;
  },

  // Buscar exame por ID
  getById: async (id: number): Promise<Exam> => {
    const response = await api.get<Exam>(`/exams/${id}`);
    return response.data;
  },

  // Buscar exames por especialidade
  getBySpecialty: async (specialty: string): Promise<Exam[]> => {
    const response = await api.get<Exam[]>(`/exams/specialty/${specialty}`);
    return response.data;
  },

  // Criar novo exame
  create: async (exam: Omit<Exam, "id">): Promise<Exam> => {
    const response = await api.post<Exam>("/exams", exam);
    return response.data;
  },

  // Atualizar exame
  update: async (id: number, exam: Partial<Exam>): Promise<Exam> => {
    const response = await api.put<Exam>(`/exams/${id}`, exam);
    return response.data;
  },

  // Deletar exame
  delete: async (id: number): Promise<void> => {
    await api.delete(`/exams/${id}`);
  },
};

// ============ APPOINTMENTS API ============

export const appointmentService = {
  // Listar todos os agendamentos
  getAll: async (filters?: AppointmentFilters): Promise<Appointment[]> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.startDate) params.append("startDate", filters.startDate);
    if (filters?.endDate) params.append("endDate", filters.endDate);

    const response = await api.get<Appointment[]>("/appointments", { params });
    return response.data;
  },

  // Buscar agendamento por ID
  getById: async (id: number): Promise<Appointment> => {
    const response = await api.get<Appointment>(`/appointments/${id}`);
    return response.data;
  },

  // Criar novo agendamento
  create: async (data: CreateAppointmentDTO): Promise<Appointment> => {
    const response = await api.post<Appointment>("/appointments", data);
    return response.data;
  },

  // Atualizar agendamento
  update: async (id: number, data: UpdateAppointmentDTO): Promise<Appointment> => {
    const response = await api.put<Appointment>(`/appointments/${id}`, data);
    return response.data;
  },

  // Atualizar status do agendamento
  updateStatus: async (
    id: number,
    status: AppointmentStatus
  ): Promise<Appointment> => {
    const response = await api.patch<Appointment>(`/appointments/${id}/status`, {
      status,
    });
    return response.data;
  },

  // Deletar agendamento
  delete: async (id: number): Promise<void> => {
    await api.delete(`/appointments/${id}`);
  },
};

export default api;
