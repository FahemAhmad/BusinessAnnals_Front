import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import TextField from "../Shared/TextField";
import { Button, Modal } from "react-bootstrap";
import apiCalls from "../../backend/apiCalls";
import ToastPrint from "../Shared/ToastSuccess";

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
});

function ForgetPassword({ ...props }) {
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
            Forget Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              email: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              const value = {
                email: values.email,
              };
              const res = await apiCalls
                .forgetUser(value)
                .then((response) => {
                  resetForm();
                  props.onHide();
                  ToastPrint.ToastSuccess(response.data.message);
                })
                .catch((err) => {
                  resetForm();
                  ToastPrint.ToastFailure(err.response.data.error);
                });
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
                <TextField label="Email" name="email" type="email" />

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
                  Send Mail
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ForgetPassword;
