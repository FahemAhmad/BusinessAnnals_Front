import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import TextField from "../Shared/TextField";
import { Button } from "react-bootstrap";
import apiCalls from "../../backend/apiCalls";
import ToastPrint from "../Shared/ToastSuccess";

const validationSchema = yup.object().shape({
  firstName: yup.string().min(2).max(64).label("First Name").required(),
  lastName: yup.string().min(2).max(64).label("Last Name"),
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().label("Password").min(6),
  cpassword: yup
    .string()
    .required()
    .label("Confirm Password")
    .oneOf([yup.ref("password"), null], "Password must match"),
  institute: yup.string().required().label("Institue"),
  country: yup.string().required().label("Country"),
  job: yup.string().required().label("Job"),
});

function Editor() {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <h2
        style={{ textAlign: "center", alignSelf: "center", fontWeight: "800" }}
      >
        Create Reviewer
      </h2>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          cpassword: "",
          institute: "",
          country: "",
          job: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          const res = await apiCalls
            .createReviewer(values)
            .then((response) => {
              resetForm();
              ToastPrint.ToastSuccess(response.data);
            })
            .catch((err) => {
              ToastPrint.ToastFailure("Email already in use");
            });
        }}
      >
        {(formik) => (
          <Form>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div>
                <TextField label="First Name" name="firstName" type="text" />
                <TextField label="Last Name" name="lastName" type="text" />
                <TextField label="Email" name="email" type="email" />
                <TextField label="Password" name="password" type="password" />
              </div>
              <div>
                <TextField
                  label="Confirm Password"
                  name="cpassword"
                  type="password"
                />
                <TextField label="Institute" name="institute" type="text" />
                <TextField label="Country" name="country" type="text" />
                <TextField label="Job" name="job" type="text" />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                style={{ backgroundColor: "black", width: "20%" }}
                variant="dark"
                color="white"
              >
                Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Editor;
