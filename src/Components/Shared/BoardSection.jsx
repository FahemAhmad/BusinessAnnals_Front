import React from "react";

function BoardSection({ color }) {
  return (
    <>
      <div style={{ height: 60, backgroundColor: `${color}50` }} />
      <div
        style={{
          height: 60,
          backgroundColor: color,
          marginBottom: 20,
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: 800,
        }}
      >
        Business and Management
      </div>
      <div style={{ display: "flex", marginBottom: -20 }}>
        <p style={{ flex: 1 }}>Anand Agrawal</p>
        <p style={{ flex: 6 }}>
          Associate Professor, College of Business Administration, American
          University in the Emirates United Arab
        </p>
        <p style={{ flex: 1 }}>Emirates</p>
      </div>
      <div style={{ display: "flex", marginBottom: -20 }}>
        <p style={{ flex: 1 }}>Ahmed Arif</p>
        <p style={{ flex: 6 }}>
          Assistant Professor, FAST School of Management, National University of
          Computer and Emerging Sciences
        </p>
        <p style={{ flex: 1 }}>Pakistan</p>
      </div>
      <div style={{ display: "flex", marginBottom: -20 }}>
        <p style={{ flex: 1 }}>Anand Agrawal</p>
        <p style={{ flex: 6 }}>
          Associate Professor, College of Business Administration, American
          University in the Emirates United Arab
        </p>
        <p style={{ flex: 1 }}>United Kingdom</p>
      </div>
      <div style={{ display: "flex", marginBottom: -20 }}>
        <p style={{ flex: 1 }}>Anand Agrawal</p>
        <p style={{ flex: 6 }}>
          Associate Professor, College of Business Administration, American
          University in the Emirates United Arab
        </p>
        <p style={{ flex: 1 }}>Emirates</p>
      </div>
    </>
  );
}

export default BoardSection;
