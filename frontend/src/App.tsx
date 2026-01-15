import React from "react";
import { AppointmentProvider } from "./context/AppointmentContext";
import Header from "./components/Header";
import { appStyles } from "./styles";
import { Home } from "./views/Home";
import { Footer } from "./components/Footer";

export const AppContent: React.FC = () => {
  return (
    <div className={appStyles.app}>
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppointmentProvider>
      <AppContent />
    </AppointmentProvider>
  );
};
