import React, { useState } from "react";
import { Exam } from "../../types";
import AppointmentList from "../../components/AppointmentList";
import { appStyles } from "../../styles";
import AppointmentForm from "../../components/AppointmentForm";
import ExamList from "../../components/ExamList";

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
    <main className={appStyles.mainContent}>
      <div className={appStyles.tabs}>
        <button
          className={
            activeTab === "schedule" ? appStyles.tabActive : appStyles.tab
          }
          onClick={() => setActiveTab("schedule")}
        >
          Novo Agendamento
        </button>
        <button
          className={activeTab === "list" ? appStyles.tabActive : appStyles.tab}
          onClick={() => setActiveTab("list")}
        >
          Meus Agendamentos
        </button>
      </div>

      {activeTab === "schedule" ? (
        <div className={appStyles.scheduleContainer}>
          <div className={appStyles.leftPanel}>
            <ExamList
              onSelectExam={handleExamSelect}
              selectedExamId={selectedExam?.id}
            />
          </div>
          <div className={appStyles.rightPanel}>
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
