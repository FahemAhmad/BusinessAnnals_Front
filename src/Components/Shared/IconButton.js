import React from "react";
import { Button } from "react-bootstrap";

function IconButton({ title, icon }) {
  return (
    <>
      <Button
        type="submit"
        style={{
          backgroundColor: "black",
          width: 150,
          height: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        }}
        variant="dark"
        color="white"
      >
        <i className={icon} style={{ fontSize: 35, margin: "10px 0px" }} />
        <p>{title}</p>
      </Button>
    </>
  );
}

export default IconButton;
