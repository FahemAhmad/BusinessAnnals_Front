import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import jwt from "jsonwebtoken";
import apiCalls from "../backend/apiCalls";
import ToastPrint from "../Components/Shared/ToastSuccess";

function AuthActivate() {
  let path = useLocation();

  const [state, setState] = useState({
    name: "",
    token: "",
    buttonText: "Activate Account",
  });

  const { name, token, buttonText } = state;

  useEffect(() => {
    let tokenString = path.pathname.split("/auth/activate/");
    if (tokenString) {
      const { name } = jwt.decode(tokenString[1]);

      setState({ ...state, name, token: tokenString[1] });
    }
  }, [name]);

  const clickSubmit = async (e) => {
    if (buttonText !== "Activated") {
      e.preventDefault();
      setState({ ...state, buttonText: "Activating..." });

      try {
        const response = await apiCalls.activateUser({ token });
        ToastPrint.ToastSuccess(response.data);
        setState({ ...state, name: "", token: "", buttonText: "Activated" });
      } catch (error) {
        ToastPrint.ToastFailure(error.response.data.error);
        setState({ ...state, buttonText: "Activate Account" });
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <h1>Hello {name} !</h1>
      <h3>Verify your account and enjoy</h3>
      <Button
        variant="dark"
        size="lg"
        style={{ padding: "2px 8px" }}
        onClick={clickSubmit}
      >
        {buttonText}
      </Button>
    </div>
  );
}

export default AuthActivate;
