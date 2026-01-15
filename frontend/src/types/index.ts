// Tipos do Exame
export interface Exam {
  id: number;
  name: string;
  specialty: string;
  description?: string;
  price?: number;
}

// Status do Agendamento
export enum AppointmentStatus {
  SCHEDULED = "scheduled",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

// Tipos do Agendamento
export interface Appointment {
  id: number;
  patientName: string;
  patientEmail: string;
  patientPhone?: string;
  exam: Exam;
  examId: number;
  dateTime: string;
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

// DTO para criar agendamento
export interface CreateAppointmentDTO {
  patientName: string;
  patientEmail: string;
  patientPhone?: string;
  examId: number;
  dateTime: string;
  notes?: string;
}

// DTO para atualizar agendamento
export interface UpdateAppointmentDTO {
  patientName?: string;
  patientEmail?: string;
  patientPhone?: string;
  examId?: number;
  dateTime?: string;
  notes?: string;
  status?: AppointmentStatus;
}

// Filtros para buscar agendamentos
export interface AppointmentFilters {
  status?: AppointmentStatus;
  startDate?: string;
  endDate?: string;
}

// Estado global da aplicação
export interface AppState {
  exams: Exam[];
  appointments: Appointment[];
  selectedExam: Exam | null;
  isLoading: boolean;
  error: string | null;
}

// Labels para os status em português
export const statusLabels: Record<AppointmentStatus, string> = {
  [AppointmentStatus.SCHEDULED]: "Agendado",
  [AppointmentStatus.CONFIRMED]: "Confirmado",
  [AppointmentStatus.CANCELLED]: "Cancelado",
  [AppointmentStatus.COMPLETED]: "Concluído",
};

// Cores para os status
export const statusColors: Record<AppointmentStatus, string> = {
  [AppointmentStatus.SCHEDULED]: "#3498db",
  [AppointmentStatus.CONFIRMED]: "#27ae60",
  [AppointmentStatus.CANCELLED]: "#e74c3c",
  [AppointmentStatus.COMPLETED]: "#95a5a6",
};
