import React, { useEffect, useState } from "react";
import InfoTable from "../Components/Chiefeditor/InfoTable";
import "./Chief.css";
import "../Components/Shared/form.css";
import { Col, Form, Row, Button, Tabs, Tab } from "react-bootstrap";
import Assigned from "../Components/Chiefeditor/Assigned";
import NewSubmission from "../Components/Chiefeditor/NewSubmission";
import Notifications from "../Components/Shared/Notifications";
import Editor from "../Components/Chiefeditor/Editor";
import CreateNotification from "../Components/Chiefeditor/CreateNotification";
import { useParams } from "react-router-dom";
import apiCalls from "../backend/apiCalls";
import ChangePassword from "../Components/Chiefeditor/ChangePassword";
import PaginationItem from "../Components/Shared/PaginationItem";
import Loader from "../Components/Shared/Loader";

function ChiefEditor() {
  const [wheelLoader, setWheelLoader] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [trigger, setTrigger] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [calculate, setCalculate] = useState(0);
  const postsPerPage = 10;

  const params = useParams();
  const [key, setKey] = useState("manage");
  const [userData, setuserData] = useState({});

  const getUserData = async () => {
    const { data: data } = await apiCalls.getUserDetailsById(params.id);

    setuserData(data);
  };

  const getNotificationBackend = async ({ cPage: cp }) => {
    setLoading(true);
    setWheelLoader(true);

    const indexOfLastPost = (cp - 1) * postsPerPage;
    const res = await apiCalls.getNotifications(postsPerPage, indexOfLastPost);

    if (res.status === 200) {
      setNotifications(res.data.data);
      setCalculate(Math.ceil(res.data.count / postsPerPage));
    }
    setWheelLoader(false);
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
    getNotificationBackend({ cPage: currentPage });
  }, []);

  return wheelLoader ? (
    <Loader loading={wheelLoader} />
  ) : (
    <>
      <div className="layout left">
        <h2 className="mainHeading">Personal Details</h2>
        <InfoTable data={userData} />
        <h2 className="mainHeading black">Email and Password</h2>
        <Form
          style={{
            width: "100%",
            marginTop: "1%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10" style={{ marginTop: 6 }}>
              <span style={{ color: "#003951", fontWeight: "bold" }}>
                {userData.email}
              </span>
            </Col>
          </Form.Group>
          <p
            style={{
              marginTop: 7,
              marginLeft: 5,
              marginRight: 5,
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() => setModalShow(true)}
          >
            Change Password
          </p>
        </Form>

        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="manage" title="Manage">
            <Editor />
          </Tab>
          <Tab eventKey="assigned" title="Assigned Journal">
            <Assigned trigger={trigger} />
          </Tab>
          <Tab eventKey="newSubmission" title="New Submission">
            <NewSubmission trigger={trigger} setTrigger={setTrigger} />
          </Tab>
          <Tab eventKey="notifications" title="Notifications">
            <h2
              style={{ fontSize: "35px", fontWeight: "800", color: "#003951" }}
            >
              Notifications :
            </h2>
            {loading ? (
              <h2>Loading...</h2>
            ) : (
              <>
                {notifications.map((notify, index) => (
                  <Notifications notify={notify} key={index} />
                ))}
                <Button
                  style={{
                    backgroundColor: "black",
                    padding: "5px 10px",
                    marginTop: 10,
                    alignSelf: "flex-end",
                  }}
                  variant="dark"
                  color="white"
                  onClick={() => setShowNotification(true)}
                >
                  Create Notification
                </Button>
                {!loading && (
                  <PaginationItem
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={calculate}
                    onPress={getNotificationBackend}
                  />
                )}
              </>
            )}
          </Tab>
        </Tabs>
      </div>
      <ChangePassword
        id={userData._id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <CreateNotification
        show={showNotification}
        onHide={() => setShowNotification(false)}
        posts={notifications}
        setPosts={setNotifications}
      />
    </>
  );
}

export default ChiefEditor;
