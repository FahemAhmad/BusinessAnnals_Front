import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../App.css";

function Transition({ title, data }) {
  const [open, setOpen] = useState(false);

  console.log(data);
  return (
    <>
      <div style={{ marginTop: 10 }}>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          bsPrefix="super-btn"
          style={{
            backgroundColor: "transparent",
            color: "black",
            fontWeight: "800",
            border: "none",
          }}
        >
          <span
            style={
              open
                ? { border: "2px solid black", padding: "1px 7px" }
                : { border: "2px solid black", padding: "1px 5px" }
            }
          >
            {open ? "-" : "+"}
          </span>{" "}
          {title}
        </Button>
        <Collapse in={open}>
          <div
            style={{
              marginLeft: 25,
              marginTop: 10,
              marginBottom: 10,
              width: "100%",
            }}
          >
            <div style={{ color: "blue", width: "100%" }}>
              {data.map((d, index) => (
                <Link to={`/currentIssues/${d.Volume}`}>
                  <p key={index} style={{ lineHeight: 1 }}>
                    {d.dates}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
}

export default Transition;
