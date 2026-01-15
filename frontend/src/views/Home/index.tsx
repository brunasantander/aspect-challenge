import React, { useState } from "react";
import { Exam } from "../../types";
import ExamList from "../../components/ExamList";
import AppointmentForm from "../../components/AppointmentForm";
import AppointmentList from "../../components/AppointmentList";

export const Home: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [activeTab, setActiveTab] = useState<"schedule" | "list">("schedule");

  const handleExamSelect = (exam: Exam) => {
    setSelectedExam(exam);
  };

  const handleAppointmentSuccess = () => {
    setSelectedExam(null);
    setActiveTab("list");
  };

  return (
    <main className="main-content">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "schedule" ? "active" : ""}`}
          onClick={() => setActiveTab("schedule")}
        >
          Novo Agendamento
        </button>
        <button
          className={`tab ${activeTab === "list" ? "active" : ""}`}
          onClick={() => setActiveTab("list")}
        >
          Meus Agendamentos
        </button>
      </div>

      {activeTab === "schedule" ? (
        <div className="schedule-container">
          <div className="left-panel">
            <ExamList
              onSelectExam={handleExamSelect}
              selectedExamId={selectedExam?.id}
            />
          </div>
          <div className="right-panel">
            <AppointmentForm
              selectedExam={selectedExam}
              onSuccess={handleAppointmentSuccess}
            />
          </div>
        </div>
      ) : (
        <AppointmentList />
      )}
    </main>
  );
};
