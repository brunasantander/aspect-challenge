import React, { useState, useEffect } from "react";
import { appointmentFormStyles } from "./styles";
import { CreateAppointmentDTO, Exam } from "../../types";
import { useAppointments } from "../../context/AppointmentContext";

interface AppointmentFormProps {
  selectedExam?: Exam | null;
  onSuccess?: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  selectedExam,
  onSuccess,
}) => {
  const { state, createAppointment } = useAppointments();
  const { exams, isLoading } = state;

  const [formData, setFormData] = useState<CreateAppointmentDTO>({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    examId: 0,
    dateTime: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  // Atualizar examId quando um exame for selecionado
  useEffect(() => {
    if (selectedExam) {
      setFormData((prev) => ({ ...prev, examId: selectedExam.id }));
    }
  }, [selectedExam]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Nome do paciente é obrigatório";
    }

    if (!formData.patientEmail.trim()) {
      newErrors.patientEmail = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.patientEmail)) {
      newErrors.patientEmail = "E-mail inválido";
    }

    if (!formData.examId) {
      newErrors.examId = "Selecione um exame";
    }

    if (!formData.dateTime) {
      newErrors.dateTime = "Data e hora são obrigatórios";
    } else {
      const selectedDate = new Date(formData.dateTime);
      if (selectedDate <= new Date()) {
        newErrors.dateTime = "A data deve ser futura";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para formatar telefone no padrão (11) 99999-9999
  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) {
      return numbers.length ? `(${numbers}` : "";
    }
    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
      7,
      11
    )}`;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    let newValue: string | number = value;

    if (name === "examId") {
      newValue = parseInt(value);
    } else if (name === "patientPhone") {
      newValue = formatPhone(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    // Limpar erro do campo ao digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      await createAppointment(formData);
      setSuccessMessage("Agendamento realizado com sucesso!");
      setFormData({
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        examId: 0,
        dateTime: "",
        notes: "",
      });
      onSuccess?.();
    } catch (error) {
      // Erro já tratado no contexto
    }
  };

  // Data mínima para agendamento (próxima hora cheia)
  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className={appointmentFormStyles.container}>
      <h2>Agendar Exame</h2>

      {successMessage && (
        <div className={appointmentFormStyles.successMessage}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className={appointmentFormStyles.form}>
        <div className={appointmentFormStyles.formGroup}>
          <label htmlFor="patientName">Nome do Paciente *</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Digite o nome completo"
            className={
              errors.patientName ? appointmentFormStyles.errorInput : ""
            }
          />
          {errors.patientName && (
            <span className={appointmentFormStyles.errorText}>
              {errors.patientName}
            </span>
          )}
        </div>

        <div className={appointmentFormStyles.formRow}>
          <div className={appointmentFormStyles.formGroup}>
            <label htmlFor="patientEmail">E-mail *</label>
            <input
              type="email"
              id="patientEmail"
              name="patientEmail"
              value={formData.patientEmail}
              onChange={handleChange}
              placeholder="email@exemplo.com"
              className={
                errors.patientEmail ? appointmentFormStyles.errorInput : ""
              }
            />
            {errors.patientEmail && (
              <span className={appointmentFormStyles.errorText}>
                {errors.patientEmail}
              </span>
            )}
          </div>

          <div className={appointmentFormStyles.formGroup}>
            <label htmlFor="patientPhone">Telefone</label>
            <input
              type="tel"
              id="patientPhone"
              name="patientPhone"
              value={formData.patientPhone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              maxLength={15}
            />
          </div>
        </div>

        <div className={appointmentFormStyles.formGroup}>
          <label htmlFor="examId">Exame *</label>
          <select
            id="examId"
            name="examId"
            value={formData.examId}
            onChange={handleChange}
            className={errors.examId ? appointmentFormStyles.errorInput : ""}
          >
            <option value={0}>Selecione um exame</option>
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.name} - {exam.specialty}
                {exam.price &&
                  ` (R$ ${Number(exam.price).toFixed(2).replace(".", ",")})`}
              </option>
            ))}
          </select>
          {errors.examId && (
            <span className={appointmentFormStyles.errorText}>
              {errors.examId}
            </span>
          )}
        </div>

        <div className={appointmentFormStyles.formGroup}>
          <label htmlFor="dateTime">Data e Hora *</label>
          <input
            type="datetime-local"
            id="dateTime"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            min={getMinDateTime()}
            className={errors.dateTime ? appointmentFormStyles.errorInput : ""}
          />
          {errors.dateTime && (
            <span className={appointmentFormStyles.errorText}>
              {errors.dateTime}
            </span>
          )}
        </div>

        <div className={appointmentFormStyles.formGroup}>
          <label htmlFor="notes">Observações</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Informações adicionais (opcional)"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className={appointmentFormStyles.submitBtn}
          disabled={isLoading}
        >
          {isLoading ? "Agendando..." : "Confirmar Agendamento"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
