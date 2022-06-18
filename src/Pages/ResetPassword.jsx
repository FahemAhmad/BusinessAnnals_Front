import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import apiCalls from "../backend/apiCalls";
import ToastPrint from "../Components/Shared/ToastSuccess";
import { Form, Formik } from "formik";

import * as yup from "yup";
import TextField from "../Components/Shared/TextField";
import { useLocation } from "react-router-dom";

const validationSchema = yup.object().shape({
  newPassword: yup.string().required().label("New Password").min(6),
});

function ResetPassword() {
  let path = useLocation();
  const [tokenString, setTokenString] = useState("");

  useEffect(() => {
    const arr = path.pathname.split("/auth/password/reset/");
    setTokenString(arr[1]);
  }, [path]);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        newPassword: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        try {
          const v = {
            resetToken: tokenString,
            newPassword: values.newPassword,
          };
          console.table(v);
          const response = await apiCalls.resetPassword({
            newPassword: values.newPassword,
            resetPassword: tokenString,
          });
          console.log(response);
          ToastPrint.ToastSuccess(response.data.message);
          resetForm();
        } catch (error) {
          ToastPrint.ToastFailure(error.response.data.error);
          resetForm();
        }
      }}
    >
      {(formik) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "5% 0%",
          }}
        >
          <Form>
            <h1>Forget Password</h1>
            <h5>Enter your new Password</h5>
            <TextField label="Password" name="newPassword" type="password" />
            <Button
              type="submit"
              style={{ backgroundColor: "black", width: "100%" }}
              variant="dark"
              color="white"
            >
              Change Password
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default ResetPassword;
