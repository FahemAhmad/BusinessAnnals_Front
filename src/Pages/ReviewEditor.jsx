import React, { useState, useEffect } from "react";
import apiCalls from "../backend/apiCalls";
import InfoTable from "../Components/Chiefeditor/InfoTable";
import Loader from "../Components/Shared/Loader";
import { useParams } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import UpdateDetails from "../Components/Publisher/UpdateDetails";

import Notifications from "../Components/Shared/Notifications";
import PaginationItem from "../Components/Shared/PaginationItem";
import ReviewedContent from "../Components/Editor/ReviewedContent";
import AssignedContent from "../Components/Editor/AssignedContent";

function ReviewEditor() {
  const [key, setKey] = useState("personalDetails");
  const params = useParams();
  const [wheelLoader, setWheelLoader] = useState(false);
  const [userData, setuserData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [calculate, setCalculate] = useState(0);
  const [trigger, setTrigger] = useState(false);
  const postsPerPage = 10;

  const getUserData = async () => {
    setWheelLoader(true);
    console.log(params.id);
    const { data } = await apiCalls.getDetails_editor(params.id);
    setuserData(data);
    setWheelLoader(false);
  };

  const getNotificationBackend = async ({ cPage: cp }) => {
    setLoading(true);
    setWheelLoader(true);

    const indexOfLastPost = (cp - 1) * postsPerPage;
    const res = await apiCalls.getNotification_editor(
      params.id,
      postsPerPage,
      indexOfLastPost
    );

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
        <h2>Instructions :</h2>
        <p style={{ fontSize: 18 }}>
          You can update your personal account information and contact details
          here. You'll receive an email confirming any changes you make. You can
          update your personal account information and contact details here.
          You'll receive an email confirming any changes you make.
          <br />
          -
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          eaque perferendis quidem sed veniam sapiente assumenda, explicabo
          magnam ipsam, magni fugit quasi, maiores veritatis porro ea facere
          pariatur iure dignissimos debitis qui tenetur. Blanditiis repudiandae,
          ea quibusdam impedit laudantium numquam!
        </p>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="personalDetails" title="Personal Details">
            <UpdateDetails userData={userData} setUserData={setuserData} />
          </Tab>
          <Tab eventKey="reviewed" title="Reviwed Content">
            <ReviewedContent id={userData.id} trigger={trigger} />
          </Tab>
          <Tab eventKey="assigned" title="Assigned Content">
            <AssignedContent
              id={userData.id}
              trigger={trigger}
              setTrigger={setTrigger}
            />
          </Tab>
          <Tab eventKey="notifications" title="Notifications">
            {loading ? (
              <h2>Loading...</h2>
            ) : (
              <>
                {notifications.map((notify, index) => (
                  <Notifications notify={notify} key={index} />
                ))}

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
    </>
  );
}

export default ReviewEditor;
