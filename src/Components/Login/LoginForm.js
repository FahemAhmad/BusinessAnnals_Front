import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import TextField from "../Shared/TextField";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import api from "../../backend/apiCalls";
import { authenticate } from "../../Auth/auth";
import ForgetPassword from "./ForgetPassword";
import { useState } from "react";

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().label("Password").min(6),
});

function LoginForm({ submit }) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          const res = await api
            .userLogin(values)
            .then((resp) => {
              const response = resp.data;

              const user = jwtDecode(response.token);
              const data = { token: response.token, user: user };
              authenticate(data);

              if (user.userType === "chief")
                window.location = `/user/chief/${user.userId}`;
              else if (user.userType === "user") {
                submit
                  ? (window.location = `/submitpaper`)
                  : (window.location = `/user/publisher/${user.userId}`);
              } else window.location = `/user/editor/${user.userId}`;
            })
            .catch((error) => {
              toast.error(error.response.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        }}
      >
        {(formik) => (
          <Form>
            <TextField label="Email" name="email" type="email" />
            <TextField label="Password" name="password" type="password" />
            <h6
              style={{
                textDecoration: "underline",
                color: "black",
                textAlign: "right",
                marginTop: 10,
                cursor: "pointer",
              }}
              onClick={() => setModalShow(true)}
            >
              Forgot your password ?
            </h6>
            <Button
              type="submit"
              style={{ backgroundColor: "black", width: "100%" }}
              variant="dark"
              color="white"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <ForgetPassword show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default LoginForm;
