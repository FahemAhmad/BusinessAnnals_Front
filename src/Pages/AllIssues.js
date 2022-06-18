import React, { useEffect, useState } from "react";
import Cover from "../Components/Home/Cover";
import SidePanel from "../Components/Shared/SidePanel";
import Transition from "../Components/Shared/Transition";
import apiCalls from "../backend/apiCalls";
import ToastPrint from "../Components/Shared/ToastSuccess";
import "../Components/Shared/shared.css";

function AllIssues() {
  const [issues, setIssues] = useState([]);
  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(0);

  const getIssues = async () => {
    const res = await apiCalls.getIssues();

    if (res.status === 200) {
      setIssues(res.data);
    } else {
      ToastPrint.ToastFailure("Error occured");
    }
  };

  const calculateYear = (newS, newE) => {
    if (startYear === 0) {
      setStartYear(newS);
    } else if (startYear > newS) {
      setStartYear(newS);
    }

    if (endYear === 0) {
      setEndYear(newE);
    } else if (endYear < newE) {
      setEndYear(newE);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <>
      <Cover />
      <div className="allLayout">
        <div
          style={{
            flex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {issues && (
            <>
              <h4 style={{ fontWeight: "800" }}>Browse by Year - Journals</h4>
              <h5 style={{ marginLeft: 20 }}>
                {startYear}- {endYear}
              </h5>
            </>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: 40,
            }}
          >
            {issues &&
              issues.map((issue, index) => (
                <>
                  <Transition
                    key={index}
                    title={`${issue.startYear}-${issue.endYear}`}
                    data={issue.dates}
                  />
                  {calculateYear(issue.startYear, issue.endYear)}
                </>
              ))}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <SidePanel />
        </div>
      </div>
    </>
  );
}

export default AllIssues;
