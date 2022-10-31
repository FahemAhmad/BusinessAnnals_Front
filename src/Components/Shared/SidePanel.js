import React, { useState, useEffect } from "react";
import "./SidePanel.css";
import download from "../../Assets/download.png";
import bookmark from "../../Assets/bookmark.png";
import { Link } from "react-router-dom";
import apiCalls from "../../backend/apiCalls";

function SidePanel() {
  const [last, setLast] = useState(0);

  const getLastIssue = async () => {
    await apiCalls.getLastIssue().then((res) => setLast(res?.data?.Volume));
  };

  useEffect(() => {
    getLastIssue();
  }, []);

  return (
    <div className="container">
      <div className="sideBlock">Journals</div>
      <Link to="/allIssues" className="subSection">
        <i className="fas fa-search-plus" style={{ marginRight: "10%" }}></i>
        <p style={{ marginRight: "10%", marginBottom: 0 }}>All Issues</p>
      </Link>
      <Link to={`/currentIssues/${last}`} className="subSection">
        <i className="fas fa-mouse-pointer" style={{ marginRight: "10%" }}></i>{" "}
        Current Issues
      </Link>
      <Link to="/submitpaper" className="subSection">
        <i className="fas fa-plus-square" style={{ marginRight: "10%" }}></i>{" "}
        Submit Paper
      </Link>

      <div
        style={{
          flex: 6,
          backgroundColor: "#003951",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid black",
        }}
      >
        <p> Subscribe to our news letter</p>
        <div
          style={{
            display: "flex",
            width: "100%",

            justifyContent: "space-evenly",
          }}
        >
          <img
            src={download}
            height={25}
            width={25}
            alt="downloadIcon"
            style={{ borderRadius: "18px", border: "3px solid white" }}
          />
          <img
            src={bookmark}
            height={25}
            width={25}
            alt="bookmarkIcon"
            style={{ borderRadius: "18px", border: "3px solid white" }}
          />
        </div>
        <p>Share it with your friends</p>
      </div>
    </div>
  );
}

export default SidePanel;
