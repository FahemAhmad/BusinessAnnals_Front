import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import TextArea from "../Shared/TextArea";
import { Button, Modal } from "react-bootstrap";
import FIlterDropDown from "./FIlterDropDown";
import apiCalls from "../../backend/apiCalls";
import ToastPrint from "../Shared/ToastSuccess";

const validationSchema = yup.object().shape({
  message: yup.string().required().label("Message").max(1000),
});

function CreateNotification({ posts, setPosts, ...props }) {
  const [getNotification, setNotification] = useState([]);
  const [currentNotification, setCurrentNotification] = useState("");

  const getUsers = async () => {
    const res = await apiCalls.getEditors();
    if (res.status === 200) {
      setNotification([{ id: "All", firstName: "All" }, ...res.data]);
    }
  };

  useEffect(() => {
    getUsers();
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
            Generate a Notification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              message: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              if (currentNotification !== "") {
                const value = {
                  message: values.message,
                  audience:
                    currentNotification.firstName === "All"
                      ? undefined
                      : currentNotification.id,
                };
                resetForm();

                await apiCalls
                  .postNotification(value)
                  .then((response) => {
                    const audi = { firstName: currentNotification.firstName };

                    const newPost = {
                      message: value.message,
                      date: response.data.date,
                      audience: audi,
                    };
                    setPosts([newPost, ...posts]);
                    ToastPrint.ToastSuccess("Notification Added");
                    props.onHide();
                  })
                  .catch((response) => {
                    ToastPrint.ToastFailure(response.data);
                  });
              } else {
                ToastPrint.ToastFailure("Please Select a User");
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
                <TextArea label="Message " name="message" type="text" />
                <FIlterDropDown
                  setFunc={setCurrentNotification}
                  data={getNotification}
                  title="Select User"
                  trigger={false}
                />

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

export default CreateNotification;
