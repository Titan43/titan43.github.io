import React from "react";
import "../stylesheets/loading.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-box item" data-testid="loading-box">
      <div className="spinner" data-testid="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;