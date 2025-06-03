import React from 'react';

const Loading = ({ message = "Loading...", size = "md" }) => {

  const spinnerSizeClass = {
    sm: "spinner-border spinner-border-sm",
    md: "spinner-border",
    lg: "spinner-border spinner-border-lg",
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-3">
      <div className={spinnerSizeClass[size] || spinnerSizeClass.md} role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      <div className="mt-2">{message}</div>
    </div>
  );
};

export default Loading;
