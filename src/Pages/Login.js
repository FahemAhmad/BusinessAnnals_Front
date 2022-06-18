import React, { useState } from "react";
import "../Components/Shared/form.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginForm from "../Components/Login/LoginForm";

function Login({ submit }) {
  return (
    <>
      <div className="layout">
        <h2 className="mainHeading">Log in to Journals</h2>
        <div className="fields">
          <div className="left">
            <h6 style={{ color: "red" }}>
              Note : Items marked with * are required
            </h6>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <LoginForm submit={submit} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: 13,
                  marginTop: 10,
                }}
              >
                <hr width="15%" />

                <p
                  style={{
                    marginTop: 7,
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  Dont have an Account ?
                </p>
                <hr width="15%" />
              </div>
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <Button
                  style={{ backgroundColor: "black", width: "100%" }}
                  variant="dark"
                  color="white"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
          <div className="right mainHeading">Journals</div>
        </div>
        <p style={{ width: "40%", textAlign: "center", marginTop: "5%" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim amet vel
          at pulvinar elementum, viverra eu ullamcorper.
        </p>
      </div>
    </>
  );
}

export default Login;
