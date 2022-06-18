import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import TextField from "../Shared/TextField";
import { Button, Dropdown, Modal } from "react-bootstrap";
import apiCalls from "../../backend/apiCalls";
import ToastPrint from "../Shared/ToastSuccess";
import Months from "./Months.json";

const validationSchema = yup.object().shape({
  startYear: yup.string().required().label("Starting Year"),
  endYear: yup.string().required().label("Ending Year"),
});

function LaunchingIssue({ setPosts, ...props }) {
  const [startMonth, setStartMonth] = useState("Start Month");
  const [endMonth, setEndMonth] = useState("Ending Month");

  useEffect(() => {
    setStartMonth("Start Month");
    setEndMonth("Ending Month");
  }, []);
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
            Publish an Issue
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              startYear: "",
              endYear: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              if (startMonth !== "Start Month" && endMonth !== "Ending Month") {
                const value = {
                  IssueStartYear: values.startYear,
                  IssueEndYear: values.endYear,
                  IssueStartMonth: startMonth,
                  IssueEndMonth: endMonth,
                };

                const res = await apiCalls
                  .launchIssue(value)
                  .then((response) => {
                    setPosts();
                    resetForm();
                    props.onHide();
                    ToastPrint.ToastSuccess(response.data);
                  })
                  .catch((err) => {
                    resetForm();
                    ToastPrint.ToastFailure("Error Launching");
                  });
              } else {
                ToastPrint.ToastFailure("Error Launching");
              }
            }}
          >
            {(formik) => (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    label="Start Year"
                    name="startYear"
                    type="text"
                    placeholder="2022"
                  />
                  <TextField
                    label="End Year"
                    name="endYear"
                    type="text"
                    placeholder="2023"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Dropdown style={{ backgroundColor: "none" }}>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      style={{
                        backgroundColor: "black",
                        border: "none",
                        margin: "0px 10px",
                        padding: 5,
                      }}
                    >
                      {startMonth}
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ backgroundColor: "black" }}>
                      {Months.map((mon, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => setStartMonth(mon)}
                        >
                          {mon}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      style={{
                        backgroundColor: "black",
                        border: "none",
                        margin: "0px 10px",
                        padding: 5,
                      }}
                    >
                      {endMonth}
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ backgroundColor: "black" }}>
                      {Months.map((mon, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => setEndMonth(mon)}
                        >
                          {mon}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "black",
                    marginTop: 10,
                    padding: "5px 20px",
                  }}
                  variant="dark"
                  color="white"
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LaunchingIssue;
