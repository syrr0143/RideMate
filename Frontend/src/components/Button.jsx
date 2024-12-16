import React from "react";

const Button = ({ onClick, name, disabled, loading = false, type, style }) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick ? onClick : null}
        disabled={disabled || loading}
        className={`btn ${style}`}
      >
        {loading ? (
          <span className="loading loading-infinity loading-lg"></span>
        ) : (
          name
        )}
      </button>
    </>
  );
};

export default Button;
