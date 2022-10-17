import React from "react";
import "../Components/Shared/form.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignupForm from "../Components/Signup/SignupForm";
import apiCalls from "../backend/apiCalls";

function Signup() {
  return (
    <>
      <div className="layout">
        <h2 className="mainHeading">Register to Journals</h2>
        <div className="fields">
          <div className="left">
            <h6 style={{ color: "red" }}>
              Note : Items marked with * are required
            </h6>
            <SignupForm api={apiCalls.createNewUser} />
          </div>
          <div className="rightSeen">
            <div className="center mainHeading">Journals</div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: 13,
                marginTop: 10,
              }}
            >
              <p
                style={{
                  marginTop: 7,
                  marginLeft: 5,
                  marginRight: 5,
                  color: "blue",
                }}
              >
                Already have an Account ?
              </p>
            </div>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "black",
                width: 220,
                marginRight: 35,
              }}
            >
              <Button
                style={{ backgroundColor: "black", width: "100%" }}
                variant="dark"
                color="white"
              >
                Log In
              </Button>
            </Link>
          </div>
        </div>
        <p style={{ width: "40%", textAlign: "center", marginTop: "5%" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim amet vel
          at pulvinar elementum, viverra eu ullamcorper.
        </p>
      </div>
    </>
  );
}

export default Signup;
