import React from "react";
import "./Adminpanel.css";
import Sidebar from "./Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";

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
    icon: "",
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
    title: "Add remove Editors",
    link: "/add_remove_editors",
    icon: "",
  },
  {
    name: "Users Settings",
    title: "View Users",
    link: "/view_users",
    icon: "",
  },
  {
    title: "Add Remove Users",
    link: "/add_remove_user",
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

const AdminPanel = () => {
  return <Sidebar navOptions={chiefSidebar} />;
};

export default AdminPanel;
