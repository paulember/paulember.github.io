import React from "react";
import "./styles.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null; // Don't render the modal if it's closed
  }

  return (
    <div className="modal-overlay">
      <div className="modal">{children}</div>
    </div>
  );
};

export default Modal;
