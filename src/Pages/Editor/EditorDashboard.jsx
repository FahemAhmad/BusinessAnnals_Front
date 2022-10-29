import React from "react";
import MessageBox from "../Shared/MessageBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProfileDetails from "../Shared/ProfileDetails";
import Title from "../Shared/Title";

const EditorDashboard = ({ endpointCall }) => {
  return (
    <>
      <Title
        name="Dashboard"
        icon={<DashboardIcon fontSize="large" style={{ marginBottom: 7 }} />}
      />
      <div className="dasboardItem">
        <ProfileDetails endpointCall={endpointCall} />
      </div>
    </>
  );
};

export default EditorDashboard;
