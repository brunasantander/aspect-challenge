import React, { useState } from "react";
import { AppointmentProvider } from "./context/AppointmentContext";
import Header from "./components/Header";
import ExamList from "./components/ExamList";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";
import { Exam } from "./types";
import "./App.css";

const AppContent: React.FC = () => {
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
    <div className="app">
      <Header />

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

      <footer className="footer">
        <p>Aspect Challenge - Sistema de Agendamento de Exames</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppointmentProvider>
      <AppContent />
    </AppointmentProvider>
  );
};

export default App;
