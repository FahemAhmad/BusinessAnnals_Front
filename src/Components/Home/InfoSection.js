import React from "react";
import CustomButton from "../Shared/CustomButton";
import { Link } from "react-router-dom";
import "./InfoSection.css";

function InfoSection() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 0 80px 0",
        }}
      >
        <h3 className="infoTitle">About this journal</h3>
        <p className="para">
          SAGE Open is a peer-reviewed, "Gold" open access journal from SAGE
          that publishes original research and review articles in an
          interactive, open access format. Articles may span the full spectrum
          of the social and behavioral sciences and the humanities. <br />
          This journal is a member of the Committee on Publication Ethics
          (COPE). SAGE Open is a peer-reviewed, "Gold" open access journal from
          SAGE that publishes original research and review articles in an
          interactive, open access format. Articles may span the full spectrum
          of the social and behavioral sciences and the humanities. <br />
          This journal is a member of the Committee on Publication Ethics
          (COPE).
        </p>
        <Link to="/aboutJournal" style={{ textDecoration: "none" }}>
          <CustomButton bg="black" color="white">
            Learn More
          </CustomButton>
        </Link>
      </div>
    </>
  );
}

export default InfoSection;
