import React from "react";
import { confirmModalStyles } from "./styles";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "warning" | "info";
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  variant = "danger",
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const getConfirmButtonClass = () => {
    switch (variant) {
      case "danger":
        return confirmModalStyles.btnConfirmDanger;
      case "warning":
        return confirmModalStyles.btnConfirmWarning;
      case "info":
        return confirmModalStyles.btnConfirmInfo;
      default:
        return confirmModalStyles.btnConfirm;
    }
  };

  return (
    <div className={confirmModalStyles.overlay} onClick={handleOverlayClick}>
      <div className={confirmModalStyles.container}>
        <div className={confirmModalStyles.header}>
          <h3>{title}</h3>
        </div>
        <div className={confirmModalStyles.body}>
          <p>{message}</p>
        </div>
        <div className={confirmModalStyles.footer}>
          <button className={confirmModalStyles.btnCancel} onClick={onCancel}>
            {cancelText}
          </button>
          <button className={getConfirmButtonClass()} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
