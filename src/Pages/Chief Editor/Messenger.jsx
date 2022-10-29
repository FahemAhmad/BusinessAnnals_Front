import React, { useState } from "react";
import Title from "../Shared/Title";
import "./Messenger.css";
import MessageIcon from "@mui/icons-material/Message";
import Conversations from "./Conversations";
import Message from "./Message";
import { useEffect, useRef } from "react";
import apiCalls from "../../backend/apiCalls";
import { useParams } from "react-router-dom";
import { Add } from "@mui/icons-material";
import FindFriends from "../../Components/Shared/FindFriends";

const Messenger = ({
  socket,
  arrivedMessage,
  messageCounter,
  setMessageCounter,
}) => {
  const { id } = useParams();
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newConvo, setNewConvo] = useState(false);
  const [updateConvo, setUpdateConvo] = useState(false);

  let setMess = true;

  const scrollToRef = useRef();

  //update on arrived messages or the chat changes
  useEffect(() => {
    arrivedMessage &&
      currentChat?.members.includes(arrivedMessage.sender) &&
      setMessages((prev) => [...prev, arrivedMessage]);
  }, [arrivedMessage, currentChat]);

  //update counter on arrived message
  useEffect(() => {
    if (!currentChat?.members.includes(arrivedMessage.sender)) {
      //on message arrive change the conversation counter

      let ifNewConversation = false;
      setConversations(() =>
        conversations.filter((con) => {
          if (con.members.includes(arrivedMessage?.sender)) {
            ifNewConversation = true;
            if (con.readMessageId === arrivedMessage.sender)
              con.counter = con.counter + 1;
            else con.counter = 1;
            con.readMessageId = arrivedMessage?.sender;
          }

          return con;
        })
      );

      if (!ifNewConversation) {
        getConversation();
      }
    }
  }, [arrivedMessage]);

  //on submit get messages
  const handleSubmit = async (e) => {
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

    const recieverId = currentChat.members.find((member) => member !== id);

    socket?.current.emit("sendMessage", {
      senderId: id,
      recieverId: recieverId,
      text: newMessage,
    });
    try {
      const res = await apiCalls.sendMessage(message);

      currentChat.readMessageId = id;
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
        console.log("thisis data", data);
        setConversations(data.data);

        // for every conversation there is a counter
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getConversation();
  }, [id, updateConvo]);

  //get all messages of the
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await apiCalls.getMessagesUser(currentChat.id);

        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentChat) getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollToRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const changeCurrentChat = async (c) => {
    if (c.readMessageId !== id) {
      c.counter = 0;

      await apiCalls
        .updateConvoCounterEndpoint(c._id)
        .then((res) => console.log("update switch"))
        .catch((err) => console.log("error", err));
    }

    setCurrentChat(c);
  };

  return (
    <>
      <Title name={"Messages"} icon={<MessageIcon />} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <button
                style={{
                  color: "white",
                  width: "90%",
                  margin: "0 auto",
                  padding: "3px 8px",
                  backgroundColor: "#02627A",
                  border: "none",
                }}
                onClick={() => setNewConvo(true)}
              >
                <Add />
                New Conversation
              </button>
              {conversations?.map((c, index) => (
                <div onClick={() => changeCurrentChat(c)} key={index}>
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
      <FindFriends
        show={newConvo}
        onHide={() => setNewConvo(false)}
        backendCall={apiCalls.getChiefFriends}
        createConvoCall={apiCalls.newConversationEndpoint}
        id={id}
        updateConvo={() => setUpdateConvo(!updateConvo)}
        conversations={conversations}
        socket={socket}
      />
    </>
  );
};

export default Messenger;
