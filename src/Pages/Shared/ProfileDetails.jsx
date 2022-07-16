import React from "react";
import "./ProfileDetails.css";

const ProfileDetails = () => {
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
          Maria Gonzalez
          <small>Client Happiness Manager</small>
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
          <dd>Maria Josephina Gonzalez</dd>
          <dt>Date of birth</dt>
          <dd>August 27, 1987</dd>
          <dt>Hometown</dt>
          <dd>Barcelona, Spain</dd>
          <dt>Occupation</dt>
          <dd>Client Happiness Manager</dd>
          <dt>Loves</dt>
          <dd>Skydiving, Tennis, Romantic dinners</dd>
          <dt>Hates</dt>
          <dd>Taxes, bosses instead of leaders</dd>
          <dt>Social</dt>
          <dd>
            <a href="#">
              <i className="fa fa-twitter-square" aria-hidden="true"></i>
            </a>
            <a href="#">
              <i className="fa fa-facebook-official" aria-hidden="true"></i>
            </a>
          </dd>
        </dl>
      </main>
    </div>
  );
};

export default ProfileDetails;
