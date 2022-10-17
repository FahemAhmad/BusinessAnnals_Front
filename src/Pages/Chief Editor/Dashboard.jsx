import React, { useEffect } from "react";
import Title from "../Shared/Title";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProfileDetails from "../Shared/ProfileDetails";
import Card from "../Shared/Card";
import "./Dashboard.css";
import MessageBox from "../Shared/MessageBox";

const Dashboard = () => {
  return (
    <>
      <Title
        name="Dashboard"
        icon={<DashboardIcon fontSize="large" style={{ marginBottom: 7 }} />}
      />
      <div className="dasboardItem">
        <ProfileDetails />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "fit-content",
          }}
        >
          <Card />
          <Card />
          <Card />
        </div>
        <MessageBox />
      </div>
    </>
  );
};

export default Dashboard;
