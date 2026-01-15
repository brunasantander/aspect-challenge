import React from "react";
import { examListStyles } from "./styles";
import { useAppointments } from "../../context/AppointmentContext";
import { Exam } from "../../types";

interface ExamListProps {
  onSelectExam?: (exam: Exam) => void;
  selectedExamId?: number;
}

const ExamList: React.FC<ExamListProps> = ({
  onSelectExam,
  selectedExamId,
}) => {
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
      <div className={examListStyles.container}>
        <div className={examListStyles.loading}>Carregando exames...</div>
      </div>
    );
  }

  return (
    <div className={examListStyles.container}>
      <h2>Exames Disponíveis</h2>
      {Object.entries(examsBySpecialty).map(([specialty, specialtyExams]) => (
        <div key={specialty} className={examListStyles.specialtyGroup}>
          <h3 className={examListStyles.specialtyTitle}>{specialty}</h3>
          <div className={examListStyles.examGrid}>
            {specialtyExams.map((exam) => (
              <div
                key={exam.id}
                className={
                  selectedExamId === exam.id
                    ? examListStyles.examCardSelected
                    : examListStyles.examCard
                }
                onClick={() => onSelectExam?.(exam)}
              >
                <h4 className={examListStyles.examName}>{exam.name}</h4>
                {exam.description && (
                  <p className={examListStyles.examDescription}>
                    {exam.description}
                  </p>
                )}
                {exam.price && (
                  <p className={examListStyles.examPrice}>
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
