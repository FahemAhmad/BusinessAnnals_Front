import React, { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes as Switch, useParams } from "react-router-dom";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MessageIcon from "@mui/icons-material/Message";

// Components
import Sidebar from "../Shared/Sidebar";
import UpdateChiefEditor from "../Chief Editor/UpdateChiefEditor";
import Messenger from "../Chief Editor/Messenger";

import { io } from "socket.io-client";
import NotFound from "../NotFound";
import apiCalls from "../../backend/apiCalls";
import EditorDashboard from "../Editor/EditorDashboard";
import YourJournals from "./YourJournals";
import BookmarkJournals from "./BookmarkJournals";

const chiefSidebar = [
  {
    name: "Analytics & Stats",
    title: "Dashboard",
    link: "/",
    icon: <DashboardIcon className="icon" />,
  },
  {
    name: "Journals",
    title: "Your Journals",
    link: "/your_journals",
    icon: <ArticleIcon className="icon" />,
  },
  {
    title: "Saved Journals",
    link: "/saved_journals",
    icon: <DescriptionIcon className="icon" />,
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

const Publisher = () => {
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
        <Sidebar navOptions={chiefSidebar} type={"publisher"} />
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Switch>
            <Route
              path="/"
              exact
              element={
                <EditorDashboard endpointCall={apiCalls.getPublisherDetails} />
              }
            />
            <Route path="/your_journals" element={<YourJournals />} />
            <Route path="/saved_journals" element={<BookmarkJournals />} />

            <Route
              path="/update_profile"
              element={
                <UpdateChiefEditor endpoint={apiCalls.getPublisherDetails} />
              }
            />
            <Route
              path="/messages"
              element={
                <Messenger
                  socket={socket}
                  arrivedMessage={arrivedMessage}
                  setMessageCounter={setMessageCounter}
                  messageCounter={messageCounter}
                  friendsCall={apiCalls.getFriend_publisher}
                />
              }
            />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Publisher;
