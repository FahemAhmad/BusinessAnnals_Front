import React, { useEffect, useState } from "react";
import Title from "../Shared/Title";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProfileDetails from "../Shared/ProfileDetails";
import Card from "../Shared/Card";
import "./Dashboard.css";
import apiCalls from "../../backend/apiCalls";

const Dashboard = ({ endpointCall }) => {
  const [totalUser, setTotalUsers] = useState(0);
  const [editorCount, setEditorCount] = useState(0);
  const [journalCount, setJournalCount] = useState(0);

  const getTotalUsers = async () => {
    await apiCalls
      .getTotalUsers()
      .then((res) => setTotalUsers(res?.data?.count))
      .catch((err) => setTotalUsers(0));
  };

  const getEditorCount = async () => {
    await apiCalls
      .getEditorCount()
      .then((res) => setEditorCount(res.data.count))
      .catch((err) => setEditorCount(0));
  };
  const getJournalCount = async () => {
    await apiCalls
      .getJournlCount()
      .then((res) => setJournalCount(res.data.count))
      .catch((err) => setJournalCount(0));
  };
  useEffect(() => {
    getTotalUsers();
    getEditorCount();
    getJournalCount();
  }, []);
  return (
    <>
      <Title
        name="Dashboard"
        icon={<DashboardIcon fontSize="large" style={{ marginBottom: 7 }} />}
      />
      <div className="dasboardItem">
        <ProfileDetails endpointCall={endpointCall} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "fit-content",
          }}
        >
          <Card
            title={"Total User"}
            count={totalUser ? totalUser : 0}
            subtitle={"Total Number of Registered Users"}
          />
          <Card
            title={"Total Editors"}
            count={editorCount ? editorCount : 0}
            subtitle={"Total Number of Registered Editors "}
          />
          <Card
            title={"Total Journals"}
            count={journalCount ? journalCount : 0}
            subtitle={"Total Number of  Journals "}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
