import React from "react";
import { useAppointments } from "../context/AppointmentContext";
import { Exam } from "../types";
import "./ExamList.css";

interface ExamListProps {
  onSelectExam?: (exam: Exam) => void;
  selectedExamId?: number;
}

const ExamList: React.FC<ExamListProps> = ({ onSelectExam, selectedExamId }) => {
  const { state } = useAppointments();
  const { exams, isLoading } = state;

  // Agrupar exames por especialidade
  const examsBySpecialty = exams.reduce((acc, exam) => {
    if (!acc[exam.specialty]) {
      acc[exam.specialty] = [];
    }
    acc[exam.specialty].push(exam);
    return acc;
  }, {} as Record<string, Exam[]>);

  if (isLoading && exams.length === 0) {
    return (
      <div className="exam-list-container">
        <div className="loading">Carregando exames...</div>
      </div>
    );
  }

  return (
    <div className="exam-list-container">
      <h2>Exames Disponíveis</h2>
      {Object.entries(examsBySpecialty).map(([specialty, specialtyExams]) => (
        <div key={specialty} className="specialty-group">
          <h3 className="specialty-title">{specialty}</h3>
          <div className="exam-grid">
            {specialtyExams.map((exam) => (
              <div
                key={exam.id}
                className={`exam-card ${
                  selectedExamId === exam.id ? "selected" : ""
                }`}
                onClick={() => onSelectExam?.(exam)}
              >
                <h4 className="exam-name">{exam.name}</h4>
                {exam.description && (
                  <p className="exam-description">{exam.description}</p>
                )}
                {exam.price && (
                  <p className="exam-price">
                    R$ {Number(exam.price).toFixed(2).replace(".", ",")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamList;
