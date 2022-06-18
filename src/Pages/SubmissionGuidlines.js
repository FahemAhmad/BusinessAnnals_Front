import React from "react";
import { Button } from "react-bootstrap";
import "../App.css";

function SubmissionGuidlines() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2%",
          marginLeft: "10%",
          marginRight: "10%",
        }}
      >
        <h2>Please Read Guidelines Before Submission</h2>
        <Button
          type="submit"
          style={{ backgroundColor: "black", padding: "5px 10px" }}
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
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            margin: "3% 0%",
          }}
        >
          <span
            style={{
              color: "red",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Manuscript Submission Guidelines:
          </span>
          <ul style={{ textAlign: "left", width: "85%" }}>
            <li>
              This Journal is a member of the Committee on Publication Ethics.
            </li>
            <li>
              This Journal recommends that authors follow the Recommendations
              for the Conduct, Reporting, Editing, and Publication of Scholarly
              Work in Medical Journals formulated by the International Committee
              of Medical Journal Editors (ICMJE).
            </li>
            <li>
              Please read the guidelines below then visit the journal’s
              submission site https://mc.manuscriptcentral.com/sageopen to
              upload your manuscript. Please note that manuscripts not
              conforming to these guidelines may be returned. For additional
              guidance, please refer to our SAGE Open Author FAQs.
            </li>
            <li>
              SAGE Open will only consider up to five articles submitted by the
              same author at one time. Only manuscripts of sufficient quality
              that meet the aims and scope of SAGE Open will be reviewed
            </li>
            <li>
              SAGE Open will reject any manuscripts submitted by a third party
              rather than by the authors themselves or where any systematic
              manipulation of the peer review or publication process has been
              suspected. The journal reserves the right to enforce this policy
              at any point of the peer review or publication process.
            </li>
            <li>
              As part of the submission process you will be required to warrant
              that you are submitting your original work, that you have the
              rights in the work, that you are submitting the work for first
              publication in the Journal and that it is not being considered for
              publication elsewhere and has not already been published
              elsewhere, and that you have obtained and can supply all necessary
              permissions for the reproduction of any copyright works not owned
              by you.
            </li>
            <li>
              An article processing charge (APC) of $1200 USD will be payable on
              acceptance if the manuscript is accepted after peer review.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SubmissionGuidlines;
