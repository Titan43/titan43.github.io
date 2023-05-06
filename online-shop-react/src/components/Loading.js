import React from "react";
import "../stylesheets/loading.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-box item">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;