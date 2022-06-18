import React from "react";

function Notifications({ notify }) {
  return (
    <>
      <div
        style={{
          padding: 10,
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          marginTop: 2,
        }}
      >
        <p>{notify.message}</p>
        <div style={{ alignSelf: "flex-end", display: "flex" }}>
          <p style={{ margin: "0px 10px", color: "#5F9AB4" }}>
            {notify.audience === undefined
              ? "To : All"
              : "To : " + notify.audience.firstName}
          </p>
          <p style={{ margin: "0px 10px", color: "#ACACAC" }}>{notify.date}</p>
        </div>
      </div>
    </>
  );
}

export default Notifications;
