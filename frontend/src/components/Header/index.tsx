import React from "react";
import { headerStyles } from "./styles";

const Header: React.FC = () => {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.headerContent}>
        <div className={headerStyles.logo}>
          <span className={headerStyles.logoIcon}>+</span>
          <h1>MedAgenda</h1>
        </div>
        <p className={headerStyles.tagline}>Sistema de Agendamento de Exames</p>
      </div>
    </header>
  );
};

export default Header;
