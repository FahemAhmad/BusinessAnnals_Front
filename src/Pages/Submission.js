import React from "react";
import "../Components/Shared/form.css";
import SubmissionForm from "../Components/Submission/SubmissionForm";

function Submission({ id }) {
  return (
    <>
      <div className="layout">
        <h2 className="mainHeading">Paper Submission</h2>
        <div style={{ width: "100%" }}>
          <p style={{ width: "30%" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus
            quam id leo in vitae turpis massa sed elementum.
          </p>
        </div>
        <div className="fields">
          <div className="left">
            <h6 style={{ color: "red" }}>
              Note : Items marked with * are required
            </h6>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 30,
              }}
            >
              <SubmissionForm id={id} />
            </div>
          </div>
          <div className="right mainHeading">Journals</div>
        </div>
      </div>
    </>
  );
}

export default Submission;
