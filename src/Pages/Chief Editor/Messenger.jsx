import React, { useState } from "react";
import Title from "../Shared/Title";
import "./Messenger.css";
import MessageIcon from "@mui/icons-material/Message";
import Conversations from "./Conversations";
import Message from "./Message";
import { useEffect, useRef } from "react";
import apiCalls from "../../backend/apiCalls";
import { useParams } from "react-router-dom";

const Messenger = ({ socket, arrivedMessage }) => {
  const { id } = useParams();
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  let setMess = true;

  const scrollToRef = useRef();

  //update on arrived messages
  useEffect(() => {
    arrivedMessage &&
      currentChat?.members.includes(arrivedMessage.sender) &&
      setMessages((prev) => [...prev, arrivedMessage]);
  }, [arrivedMessage, currentChat]);

  //on submit get messages
  const handleSubmit = async (e) => {
    console.log("newMessage", newMessage);
    if (newMessage === "") {
      setNewMessage("");
      setMess = false;
      return;
    }

    e.preventDefault();
    const message = {
      sender: id,
      text: newMessage,
      conversationId: currentChat.id,
    };

    console.log("current Chat Messenger", currentChat);
    const recieverId = currentChat.members.find((member) => member !== id);

    socket?.current.emit("sendMessage", {
      senderId: id,
      recieverId: recieverId,
      text: newMessage,
    });
    try {
      const res = await apiCalls.sendMessage(message);

      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  //get all conversations of the user
  const getConversation = async () => {
    await apiCalls
      .getConversations(id)
      .then((data) => {
        setConversations(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getConversation();
  }, [id]);

  //get all messages of the
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await apiCalls.getMessagesUser(currentChat.id);
        console.log("returned conversations", res);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollToRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Title name={"Messages"} icon={<MessageIcon />} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input placeholder="Search User" className="chatMenuInput" />
              {conversations?.map((c, index) => (
                <div onClick={() => setCurrentChat(c)} key={index}>
                  <Conversations conversation={c} currentUser={id} />
                </div>
              ))}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="scrollmessagebar">
                    {messages.length === 0 ? (
                      <span className="noConversationText">
                        No messages Found
                      </span>
                    ) : (
                      messages.map((m, index) => (
                        <div ref={scrollToRef} key={index}>
                          <Message message={m} own={id === m.sender} />
                        </div>
                      ))
                    )}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="Write something..."
                      onChange={(e) =>
                        setMess
                          ? setNewMessage(e.target.value)
                          : (setMess = true)
                      }
                      onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open a Convesation to start a Chat
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
