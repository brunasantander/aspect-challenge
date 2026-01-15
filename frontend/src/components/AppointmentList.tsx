import React, { useState } from "react";
import { useAppointments } from "../context/AppointmentContext";
import {
  Appointment,
  AppointmentStatus,
  statusLabels,
  statusColors,
} from "../types";
import ConfirmModal from "./ConfirmModal";
import "./AppointmentList.css";

const AppointmentList: React.FC = () => {
  const { state, deleteAppointment, updateAppointmentStatus } = useAppointments();
  const { appointments, isLoading, error } = state;
  const [filter, setFilter] = useState<AppointmentStatus | "all">("all");

  // Estado do modal
  const [modalOpen, setModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | null>(null);

  const filteredAppointments =
    filter === "all"
      ? appointments
      : appointments.filter((apt) => apt.status === filter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteClick = (appointment: Appointment) => {
    setAppointmentToDelete(appointment);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (appointmentToDelete) {
      try {
        await deleteAppointment(appointmentToDelete.id);
      } catch (error) {
        // Erro tratado no contexto
      }
    }
    setModalOpen(false);
    setAppointmentToDelete(null);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setAppointmentToDelete(null);
  };

  const handleStatusChange = async (
    id: number,
    newStatus: AppointmentStatus
  ) => {
    try {
      await updateAppointmentStatus(id, newStatus);
    } catch (error) {
      // Erro tratado no contexto
    }
  };

  const isPastDate = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  if (isLoading && appointments.length === 0) {
    return (
      <div className="appointment-list-container">
        <div className="loading">Carregando agendamentos...</div>
      </div>
    );
  }

  return (
    <div className="appointment-list-container">
      <div className="list-header">
        <h2>Agendamentos</h2>
        <div className="filter-container">
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as AppointmentStatus | "all")
            }
          >
            <option value="all">Todos os status</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {filteredAppointments.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum agendamento encontrado.</p>
        </div>
      ) : (
        <div className="appointments-grid">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`appointment-card ${
                isPastDate(appointment.dateTime) ? "past" : ""
              }`}
            >
              <div className="card-header">
                <span
                  className="status-badge"
                  style={{ backgroundColor: statusColors[appointment.status] }}
                >
                  {statusLabels[appointment.status]}
                </span>
                <span className="appointment-date">
                  {formatDate(appointment.dateTime)}
                </span>
              </div>

              <div className="card-body">
                <h3 className="exam-name">{appointment.exam.name}</h3>
                <p className="specialty">{appointment.exam.specialty}</p>

                <div className="patient-info">
                  <p className="patient-name">{appointment.patientName}</p>
                  <p className="patient-email">{appointment.patientEmail}</p>
                  {appointment.patientPhone && (
                    <p className="patient-phone">{appointment.patientPhone}</p>
                  )}
                </div>

                <div className="time-info">
                  <span className="time">{formatTime(appointment.dateTime)}</span>
                </div>

                {appointment.notes && (
                  <p className="notes">
                    <strong>Obs:</strong> {appointment.notes}
                  </p>
                )}
              </div>

              <div className="card-actions">
                {appointment.status === AppointmentStatus.SCHEDULED && (
                  <>
                    <button
                      className="btn-confirm"
                      onClick={() =>
                        handleStatusChange(
                          appointment.id,
                          AppointmentStatus.CONFIRMED
                        )
                      }
                    >
                      Confirmar
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={() =>
                        handleStatusChange(
                          appointment.id,
                          AppointmentStatus.CANCELLED
                        )
                      }
                    >
                      Cancelar
                    </button>
                  </>
                )}
                {appointment.status === AppointmentStatus.CONFIRMED && (
                  <button
                    className="btn-complete"
                    onClick={() =>
                      handleStatusChange(
                        appointment.id,
                        AppointmentStatus.COMPLETED
                      )
                    }
                  >
                    Marcar Concluído
                  </button>
                )}
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteClick(appointment)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={modalOpen}
        title="Excluir Agendamento"
        message={`Deseja realmente excluir o agendamento de ${appointmentToDelete?.patientName}?`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default AppointmentList;
