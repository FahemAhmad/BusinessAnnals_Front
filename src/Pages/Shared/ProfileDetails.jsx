import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ToastSuccess from "../../Components/Shared/ToastSuccess";

import "./ProfileDetails.css";

const ProfileDetails = ({ endpointCall, userId = null }) => {
  let { id } = useParams();
  if (userId) id = userId;
  const [details, setDetails] = useState();

  const getProfileDetails = async () => {
    await endpointCall(id)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) =>
        ToastSuccess.ToastFailure("Couldnt Load User Profile Information")
      );
  };

  useEffect(() => {
    if (endpointCall) {
      getProfileDetails();
    }
  }, [endpointCall]);
  return (
    <div className="profile">
      <figure>
        <img
          src="//s3-us-west-2.amazonaws.com/s.cdpn.io/55758/random-user-31.jpg"
          alt=""
        />
      </figure>
      <header>
        <h1>
          {details?.firstName} {details?.lastName}
          <small>{details?.userType.toUpperCase()}</small>
        </h1>
      </header>

      <div className="toggle">
        <input type="checkbox" className="view_details" id="view_details" />
        <label htmlFor="view_details" title="tap here to view full profile">
          ☰
        </label>
      </div>
      <main>
        <dl>
          <dt>Full name</dt>
          <dd>
            {" "}
            {details?.firstName} {details?.lastName}
          </dd>
          <dt>Email</dt>
          <dd>{details?.email}</dd>
          <dt>Occupation</dt>
          <dd>{details?.job}</dd>
          <dt>Country</dt>
          <dd>{details?.country}</dd>
          <dt>Institute</dt>
          <dd>{details?.institute}</dd>
          <dt>Account Status</dt>
          <dd>{details?.accountSatus ? "Active" : "Disable"}</dd>
        </dl>
      </main>
    </div>
  );
};

export default ProfileDetails;
