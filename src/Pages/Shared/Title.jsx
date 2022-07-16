import React from "react";

const Title = ({ name, icon }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: 20,
      }}
    >
      <h1 style={{ color: "#484848" }}>
        {name} <span style={{ fontWeight: "normal" }}>- {icon}</span>
      </h1>
      <div style={{ height: 1, backgroundColor: "#e1e1e1", width: "100%" }} />
    </div>
  );
};

export default Title;
