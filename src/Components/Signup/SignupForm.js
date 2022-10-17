import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import TextField from "../Shared/TextField";
import { Button } from "react-bootstrap";
import ToastSuccess from "../Shared/ToastSuccess";

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

function SignupForm({ api }) {
  return (
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
        const res = await api(values)
          .then((data) => {
            ToastSuccess.ToastSuccess(data?.data);
            resetForm();
          })
          .catch((err) => ToastSuccess.ToastFailure(err.response.data));
      }}
    >
      {(formik) => (
        <Form>
          <TextField label="First Name" name="firstName" type="text" />
          <TextField label="Last Name" name="lastName" type="text" />
          <TextField label="Email" name="email" type="email" />
          <TextField label="Password" name="password" type="password" />
          <TextField
            label="Confirm Password"
            name="cpassword"
            type="password"
          />
          <TextField label="Institute" name="institute" type="text" />
          <TextField label="Country" name="country" type="text" />
          <TextField label="Job" name="job" type="text" />
          <Button
            type="submit"
            style={{ backgroundColor: "black", width: "100%" }}
            variant="dark"
            color="white"
          >
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default SignupForm;
