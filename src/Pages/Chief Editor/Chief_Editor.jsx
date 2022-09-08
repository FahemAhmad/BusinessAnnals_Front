import React, { useEffect } from "react";
import { Route, Routes as Switch } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";
import Dashboard from "./Dashboard";
import Sidebar from "../Shared/Sidebar";
import AllIssues from "./AllIssues";
import CurrentIssues from "./CurrentIssues";

const chiefSidebar = [
  {
    name: "Analytics & Stats",
    title: "Dashboard",
    link: "/",
    icon: <DashboardIcon className="icon" />,
  },
  {
    name: "Journals",
    title: "All Issues",
    link: "/all_issues",
    icon: <ArticleIcon className="icon" />,
  },
  {
    title: "Current Issues",
    link: "/current_issues",
    icon: <DescriptionIcon className="icon" />,
  },
  {
    title: "New Submissions",
    link: "/new_submissions",
    icon: "",
  },
  {
    name: "Editor Settings",
    title: "View Editors",
    link: "/view_editors",
    icon: "",
  },
  {
    title: "Add Editors",
    link: "/add_editors",
    icon: "",
  },
  {
    name: "Users Settings",
    title: "View Users",
    link: "/view_users",
    icon: "",
  },
  {
    title: "Add Users",
    link: "/add_user",
    icon: "",
  },
  {
    name: "Personal Details",
    title: "Update User Profile",
    link: "/update_profile",
    icon: "",
  },
  {
    title: "Messages",
    link: "/messages",
    icon: "",
  },
];

const Chief_Editor = () => {
  useEffect(() => {}, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar navOptions={chiefSidebar} type={"chief"} />
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Switch>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/all_issues" element={<AllIssues />} />
            <Route path="/current_issues" element={<CurrentIssues />} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Chief_Editor;
