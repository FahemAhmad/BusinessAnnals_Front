import React from "react";
import { useEffect, useState } from "react";
import apiCalls from "../../backend/apiCalls";
import "./Conversations.css";

const Conversations = ({ conversation, currentUser, counter = 0 }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);

    const getUser = async () => {
      console.log(friendId);
      try {
        const res = await apiCalls.getUserDetailsById(friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, conversation]);
  return (
    <>
      <div className="conversation">
        <div>
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            alt=""
            className="conversationImg"
          />
          <span className="conversationName">
            {user?.firstName} {user?.lastName}
          </span>
        </div>
        {counter !== 0 && <div className="counter">{counter}</div>}
      </div>
    </>
  );
};

export default Conversations;
