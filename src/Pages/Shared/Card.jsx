import React from "react";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";

const Card = () => {
  return (
    <div
      style={{
        height: "100%",
        border: "1px solid #e1e1e1",
        margin: "1rem",
        padding: "1.5rem",
        borderRadius: 20,
        minWidth: 300,
      }}
    >
      <h4 style={{ textAlign: "center", fontWeight: "bolder" }}>Journals</h4>
      <h3 style={{ color: "#02627A", fontWeight: "bold", textAlign: "center" }}>
        <ArrowCircleUpRoundedIcon
          style={{ marginBottom: 5 }}
          fontSize={"medium"}
        />
        905
      </h3>
      <p style={{ color: "#a3a3a3" }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </p>
    </div>
  );
};

export default Card;
