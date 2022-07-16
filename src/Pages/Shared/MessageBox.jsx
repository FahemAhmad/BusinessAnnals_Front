import React from "react";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";

const MessageBox = () => {
  return (
    <div
      style={{
        border: "1px solid #e1e1e1",
        margin: "1rem",
        padding: "1.5rem",
        borderRadius: 20,
        fontWeight: "bold",
        color: "#02627A",
        minWidth: 350,
      }}
    >
      New Messages{" "}
      <MessageRoundedIcon
        fontSize={"small"}
        style={{ display: "block", marginLeft: "auto", marginTop: "-20px" }}
      />
      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "4rem",
          marginTop: 20,
        }}
      >
        <h6 style={{ color: "black" }}>Faheem Ahmad</h6>
        <h6 style={{ color: "#a3a3a3" }}>10 mins ago</h6>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "4rem",
          marginTop: 20,
        }}
      >
        <h6 style={{ color: "black" }}>Faheem Ahmad</h6>
        <h6 style={{ color: "#a3a3a3" }}>10 mins ago</h6>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "4rem",
          marginTop: 20,
        }}
      >
        <h6 style={{ color: "black" }}>Faheem Ahmad</h6>
        <h6 style={{ color: "#a3a3a3" }}>10 mins ago</h6>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "4rem",
          marginTop: 20,
        }}
      >
        <h6 style={{ color: "black" }}>Faheem Ahmad</h6>
        <h6 style={{ color: "#a3a3a3" }}>10 mins ago</h6>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: 20,
        }}
      >
        <h6 style={{ color: "black" }}>Faheem Ahmad</h6>
        <h6 style={{ color: "#a3a3a3" }}>10 mins ago</h6>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "4rem",
          marginTop: 20,
        }}
      >
        <h6 style={{ color: "black" }}>Faheem Ahmad</h6>
        <h6 style={{ color: "#a3a3a3" }}>10 mins ago</h6>
      </div>
    </div>
  );
};

export default MessageBox;
