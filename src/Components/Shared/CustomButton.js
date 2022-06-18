import React from "react";
import "./shared.css";

function CustomButton({ bg, color, children }) {
  return <div className="custom-btn">{children}</div>;
}

export default CustomButton;
