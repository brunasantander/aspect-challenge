import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import {
  Exam,
  Appointment,
  CreateAppointmentDTO,
  UpdateAppointmentDTO,
  AppointmentStatus,
  AppointmentFilters,
} from "../types";
import { examService, appointmentService } from "../services/api";

// Estado inicial
interface State {
  exams: Exam[];
  appointments: Appointment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: State = {
  exams: [],
  appointments: [],
  isLoading: false,
  error: null,
};

// Tipos de ações
type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_EXAMS"; payload: Exam[] }
  | { type: "SET_APPOINTMENTS"; payload: Appointment[] }
  | { type: "ADD_APPOINTMENT"; payload: Appointment }
  | { type: "UPDATE_APPOINTMENT"; payload: Appointment }
  | { type: "DELETE_APPOINTMENT"; payload: number };

// Reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_EXAMS":
      return { ...state, exams: action.payload };
    case "SET_APPOINTMENTS":
      return { ...state, appointments: action.payload };
    case "ADD_APPOINTMENT":
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };
    case "UPDATE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.map((apt) =>
          apt.id === action.payload.id ? action.payload : apt
        ),
      };
    case "DELETE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.filter(
          (apt) => apt.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

// Interface do contexto
interface AppointmentContextType {
  state: State;
  loadExams: () => Promise<void>;
  loadAppointments: (filters?: AppointmentFilters) => Promise<void>;
  createAppointment: (data: CreateAppointmentDTO) => Promise<Appointment>;
  updateAppointment: (
    id: number,
    data: UpdateAppointmentDTO
  ) => Promise<Appointment>;
  updateAppointmentStatus: (
    id: number,
    status: AppointmentStatus
  ) => Promise<void>;
  deleteAppointment: (id: number) => Promise<void>;
  clearError: () => void;
}

// Criação do contexto
const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
);

// Provider
interface ProviderProps {
  children: ReactNode;
}

export const AppointmentProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Carregar exames
  const loadExams = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });
    try {
      const exams = await examService.getAll();
      dispatch({ type: "SET_EXAMS", payload: exams });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Erro ao carregar exames",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  // Carregar agendamentos
  const loadAppointments = useCallback(async (filters?: AppointmentFilters) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });
    try {
      const appointments = await appointmentService.getAll(filters);
      dispatch({ type: "SET_APPOINTMENTS", payload: appointments });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error ? error.message : "Erro ao carregar agendamentos",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  // Criar agendamento
  const createAppointment = useCallback(
    async (data: CreateAppointmentDTO): Promise<Appointment> => {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });
      try {
        const appointment = await appointmentService.create(data);
        dispatch({ type: "ADD_APPOINTMENT", payload: appointment });
        return appointment;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Erro ao criar agendamento";
        dispatch({ type: "SET_ERROR", payload: message });
        throw error;
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    []
  );

  // Atualizar agendamento
  const updateAppointment = useCallback(
    async (id: number, data: UpdateAppointmentDTO): Promise<Appointment> => {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });
      try {
        const appointment = await appointmentService.update(id, data);
        dispatch({ type: "UPDATE_APPOINTMENT", payload: appointment });
        return appointment;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Erro ao atualizar agendamento";
        dispatch({ type: "SET_ERROR", payload: message });
        throw error;
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    []
  );

  // Atualizar status do agendamento
  const updateAppointmentStatus = useCallback(
    async (id: number, status: AppointmentStatus): Promise<void> => {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });
      try {
        const appointment = await appointmentService.updateStatus(id, status);
        dispatch({ type: "UPDATE_APPOINTMENT", payload: appointment });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Erro ao atualizar status";
        dispatch({ type: "SET_ERROR", payload: message });
        throw error;
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    []
  );

  // Deletar agendamento
  const deleteAppointment = useCallback(async (id: number): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });
    try {
      await appointmentService.delete(id);
      dispatch({ type: "DELETE_APPOINTMENT", payload: id });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao deletar agendamento";
      dispatch({ type: "SET_ERROR", payload: message });
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  // Limpar erro
  const clearError = useCallback(() => {
    dispatch({ type: "SET_ERROR", payload: null });
  }, []);

  // Carregar dados iniciais
  useEffect(() => {
    loadExams();
    loadAppointments();
  }, [loadExams, loadAppointments]);

  const value: AppointmentContextType = {
    state,
    loadExams,
    loadAppointments,
    createAppointment,
    updateAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    clearError,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useAppointments = (): AppointmentContextType => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error(
      "useAppointments deve ser usado dentro de um AppointmentProvider"
    );
  }
  return context;
};

export default AppointmentContext;
