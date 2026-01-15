import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">+</span>
          <h1>MedAgenda</h1>
        </div>
        <p className="tagline">Sistema de Agendamento de Exames</p>
      </div>
    </header>
  );
};

export default Header;
