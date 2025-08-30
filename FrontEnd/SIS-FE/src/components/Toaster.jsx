import React, { useEffect } from "react";

const Toaster = ({ message, color = "green", onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // auto-close after 3s
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: color,
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        zIndex: 9999,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {message}
    </div>
  );
};

export default Toaster;
