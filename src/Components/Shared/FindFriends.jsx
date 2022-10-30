import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import FIlterDropDown from "../Chiefeditor/FIlterDropDown";
import ToastPrint from "./ToastSuccess";

const FindFriends = ({
  id,
  backendCall,
  createConvoCall,
  updateConvo,
  conversations,
  socket,
  ...props
}) => {
  const [currentFriend, setCurrentFriend] = useState("");
  const [allFriends, setAllFriend] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(undefined);

  const submitForm = async () => {
    //create new conversation
    //send new message

    const payload = {
      senderId: id,
      receiverId: currentFriend?.id,
      text: message,
    };

    if (message?.length === 0) {
      setError("Please Type a message");
      return;
    }
    if (currentFriend?.length === 0) {
      setError("Select a user to send message");
      return;
    }

    await createConvoCall(payload)
      .then((res) => {
        socket?.current.emit("sendMessage", {
          senderId: id,
          recieverId: currentFriend?.id,
          text: message,
        });
        ToastPrint.ToastSuccess("Message Sent");
        props.onHide();
        updateConvo();
      })
      .catch((err) => ToastPrint.ToastFailure("Error Starting Conversation"));
  };

  const getFriends = async () => {
    await backendCall(id)
      .then((res) => {
        console.log("res", res);
        //get ids of all the users with convo's
        let array = conversations.map(({ members }) =>
          members[0] === id ? members[1] : members[0]
        );

        //remove allready added convo
        setAllFriend(() =>
          res?.data.filter((friend) => !array.includes(friend.id))
        );
      })
      .catch((err) => {
        console.log("Error loading friends");
      });
  };

  //set All friends
  useEffect(() => {
    getFriends();
  }, [conversations]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New Conversaton
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h6 style={{ textAlign: "flex-start", minWidth: 250 }}>
              Select User:
            </h6>
            <FIlterDropDown
              title="Select User"
              trigger={false}
              data={allFriends}
              setFunc={setCurrentFriend}
            />
            <h6
              style={{ marginTop: 20, textAlign: "flex-start", minWidth: 250 }}
            >
              Message:
            </h6>
            <textarea
              style={{ width: 270, border: "1px solid black", padding: 5 }}
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {error && <h6 style={{ color: "red" }}>{error}</h6>}
            <Button
              type="submit"
              style={{
                backgroundColor: "black",
                marginTop: 10,
                padding: "5px 20px",
              }}
              variant="dark"
              color="white"
              onClick={() => submitForm()}
            >
              Send Message
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FindFriends;
