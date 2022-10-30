import React, { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes as Switch, useParams } from "react-router-dom";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";
import PublishIcon from "@mui/icons-material/Publish";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupIcon from "@mui/icons-material/Group";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MessageIcon from "@mui/icons-material/Message";

// Components
import Dashboard from "./Dashboard";
import Sidebar from "../Shared/Sidebar";
import AllIssues from "./AllIssues";
import CurrentIssues from "./CurrentIssues";
import New_Submissions from "./New_Submissions";
import ViewEditors from "./ViewEditors";
import AddEditor from "./AddEditor";
import ViewUsers from "./ViewUsers";
import UpdateChiefEditor from "./UpdateChiefEditor";
import Messenger from "./Messenger";

import { io } from "socket.io-client";
import NotFound from "../NotFound";
import apiCalls from "../../backend/apiCalls";

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
    icon: <PublishIcon className="icon" />,
  },
  {
    name: "Editor Settings",
    title: "View Editors",
    link: "/view_editors",
    icon: <VisibilityIcon className="icon" />,
  },
  {
    title: "Add Editors",
    link: "/add_editors",
    icon: <AddCircleIcon className="icon" />,
  },
  {
    name: "Users Settings",
    title: "View Users",
    link: "/view_users",
    icon: <GroupIcon className="icon" />,
  },
  {
    name: "Personal Details",
    title: "Update User Profile",
    link: "/update_profile",
    icon: <ManageAccountsIcon className="icon" />,
  },
  {
    title: "Messages",
    link: "/messages",
    icon: <MessageIcon className="icon" />,
  },
];

const Chief_Editor = () => {
  const { id } = useParams();
  const socket = useRef();
  const [arrivedMessage, setArrivedMessage] = useState(null);
  const [messageCounter, setMessageCounter] = useState([]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivedMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket?.current.emit("addUser", id);
    socket?.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [id]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar navOptions={chiefSidebar} type={"chief"} />
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Switch>
            <Route
              path="/"
              exact
              element={<Dashboard endpointCall={apiCalls.getUserDetailsById} />}
            />
            <Route path="/all_issues" element={<AllIssues />} />
            <Route path="/current_issues" element={<CurrentIssues />} />
            <Route path="/new_submissions" element={<New_Submissions />} />
            <Route path="/view_editors" element={<ViewEditors />} />
            <Route path="/add_editors" element={<AddEditor />} />
            <Route path="/view_users" element={<ViewUsers />} />
            <Route
              path="/update_profile"
              element={
                <UpdateChiefEditor endpoint={apiCalls.getUserDetailsById} />
              }
            />
            <Route path="/not-found" element={<NotFound />} />
            <Route
              path="/messages"
              element={
                <Messenger
                  socket={socket}
                  arrivedMessage={arrivedMessage}
                  setMessageCounter={setMessageCounter}
                  messageCounter={messageCounter}
                  friendsCall={apiCalls.getChiefFriends}
                />
              }
            />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Chief_Editor;
