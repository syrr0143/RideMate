import React, { useEffect, useState } from "react";

const Toast = ({
  message,
  title,
  type = "success",
  position = "top-end",
  duration = 1000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const typeClass = {
    success: "alert-success",
    error: "alert-error",
    warning: "alert-warning",
    info: "alert-info",
  };

  const positionClass = {
    "top-end": "toast-top toast-end",
    "top-start": "toast-top toast-start",
    "bottom-end": "toast-bottom toast-end",
    "bottom-start": "toast-bottom toast-start",
  };

  return (
    <div className={`toast ${positionClass[position]}`}>
      <div className={`alert ${typeClass[type]}`}>
        <p className="font-semibold text-white capitalize ">{title}</p>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
