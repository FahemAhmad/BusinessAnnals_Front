import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import TextField from "../Shared/TextField";
import { Button, Modal } from "react-bootstrap";
import apiCalls from "../../backend/apiCalls";
import ToastPrint from "../Shared/ToastSuccess";

const validationSchema = yup.object().shape({
  oldpassword: yup.string().required().label("Old Password").min(6),
  newpassword: yup.string().required().label("New Password").min(6),
  cpassword: yup
    .string()
    .required()
    .label("Confirm Password")
    .oneOf([yup.ref("newpassword"), null], "Password must match"),
});

function ChangePassword({ id, ...props }) {
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
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              oldpassword: "",
              newpassword: "",
              cpassword: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              const value = {
                oldPassword: values.oldpassword,
                password: values.newpassword,
              };
              const res = await apiCalls
                .changePassword(id, value)
                .then((response) => {
                  console.log(response);
                  resetForm();
                  props.onHide();
                  ToastPrint.ToastSuccess(response.data);
                })
                .catch((err) => {
                  resetForm();
                  ToastPrint.ToastFailure("Incorrect Old Password");
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
                <TextField
                  label="Old Password"
                  name="oldpassword"
                  type="password"
                />
                <TextField
                  label="New Password"
                  name="newpassword"
                  type="password"
                />
                <TextField
                  label="Confirm Password"
                  name="cpassword"
                  type="password"
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

export default ChangePassword;
