import React from "react";
import { Button } from "react-bootstrap";

function AfterSubmission() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          margin: "2% 10%",

          color: "black",
        }}
      >
        <span style={{ fontWeight: "700", fontSize: 20 }}>
          Thanks for Submitting Paper
        </span>
        <p style={{ fontSize: 15, lineHeight: "20px" }}>
          You will be notified through Email
          <br />
          Visit profile to check paper status
        </p>
        <Button
          type="submit"
          style={{
            backgroundColor: "black",
            padding: "5px 10px",
            marginTop: 10,
          }}
          variant="dark"
          color="white"
        >
          Submit Paper
          <i
            className={"fas fa-scroll"}
            style={{ fontSize: 15, margin: "10px 10px" }}
          />
        </Button>
        <div
          style={{
            border: "1px solid #c4c4c4",
            marginTop: "3%",
            width: "70%",
            alignSelf: "center",
          }}
        />
      </div>
    </>
  );
}
export default AfterSubmission;
