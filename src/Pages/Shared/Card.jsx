import React from "react";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";

const Card = ({ title, count, subtitle }) => {
  return (
    <div
      style={{
        height: "100%",
        border: "1px solid #e1e1e1",
        margin: "1rem",
        padding: "1rem",
        borderRadius: 20,
        minWidth: 350,
      }}
    >
      <h4 style={{ textAlign: "center", fontWeight: "bolder" }}>{title}</h4>
      <h3 style={{ color: "#02627A", fontWeight: "bold", textAlign: "center" }}>
        <ArrowCircleUpRoundedIcon
          style={{ marginBottom: 5 }}
          fontSize={"medium"}
        />
        {count}
      </h3>
      <p style={{ color: "#a3a3a3", textAlign: "center" }}>{subtitle}</p>
    </div>
  );
};

export default Card;
