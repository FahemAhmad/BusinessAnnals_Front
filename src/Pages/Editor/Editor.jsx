import React, { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes as Switch, useParams } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import PublishIcon from "@mui/icons-material/Publish";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MessageIcon from "@mui/icons-material/Message";
import Sidebar from "../Shared/Sidebar";
import Messenger from "../Chief Editor/Messenger";

import { io } from "socket.io-client";
import EditorDashboard from "./EditorDashboard";
import ReviewedJournals from "./ReviewedJournals";
import apiCalls from "../../backend/apiCalls";
import NewJournals from "./NewJournals";
import UpdateChiefEditor from "../Chief Editor/UpdateChiefEditor";

const editorSideBar = [
  {
    name: "Analytics & Stats",
    title: "Dashboard",
    link: "/",
    icon: <DashboardIcon className="icon" />,
  },
  {
    name: "Journals",
    title: "Reviewed Journals",
    link: "/reviewed_journals",
    icon: <ArticleIcon className="icon" />,
  },
  {
    title: "New Journals",
    link: "/new_journals",
    icon: <PublishIcon className="icon" />,
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

const Editor = () => {
  const { id } = useParams();
  const socket = useRef();
  const [arrivedMessage, setArrivedMessage] = useState(null);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log("data", data);
      setArrivedMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket?.current.emit("addUser", id);
    socket?.current.on("getUsers", (users) => {});
  }, [id]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar navOptions={editorSideBar} type={"editor"} />
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Switch>
            <Route
              path="/"
              exact
              element={
                <EditorDashboard endpointCall={apiCalls.getDetails_editor} />
              }
            />
            <Route path="/reviewed_journals" element={<ReviewedJournals />} />
            <Route path="/new_journals" element={<NewJournals />} />
            <Route
              path="/update_profile"
              element={
                <UpdateChiefEditor endpoint={apiCalls.getDetails_editor} />
              }
            />
            <Route
              path="/messages"
              element={
                <Messenger
                  socket={socket}
                  arrivedMessage={arrivedMessage}
                  friendsCall={apiCalls.getEditorFriends}
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

export default Editor;
