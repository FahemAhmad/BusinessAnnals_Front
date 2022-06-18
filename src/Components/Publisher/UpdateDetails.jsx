import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import TextField from "../Shared/TextField";
import { Button } from "react-bootstrap";
import apiCalls from "../../backend/apiCalls";
import ToastPrint from "../Shared/ToastSuccess";
import ChangePublisherPassword from "./ChangePublisherPassword";

const validationSchema = yup.object().shape({
  firstName: yup.string().min(2).max(64).label("First Name"),
  lastName: yup.string().min(2).max(64).label("Last Name"),
  institute: yup.string().label("Institue"),
  country: yup.string().label("Country"),
  job: yup.string().label("Job"),
});

function UpdateDetails({ userData, setUserData }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <h2
        style={{
          textAlign: "left",
          alignSelf: "center",
          fontWeight: "800",
        }}
      >
        Change Password
      </h2>
      <p
        style={{
          marginTop: 7,
          marginLeft: 5,
          marginRight: 5,
          color: "blue",
          cursor: "pointer",
        }}
        onClick={() => setModalShow(true)}
      >
        Change Password
      </p>
      <hr />
      <div
        style={{
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            alignSelf: "center",
            fontWeight: "800",
          }}
        >
          About You
        </h2>

        <Formik
          validationSchema={validationSchema}
          initialValues={{
            firstName: "",
            lastName: "",
            institute: "",
            country: "",
            job: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            if (userData.userType === "user") {
              const res = await apiCalls
                .updateInformtion_publisher(userData._id, values)
                .then((response) => {
                  resetForm();

                  //update Data
                  const newData = { ...userData };
                  newData.firstName =
                    values.firstName === ""
                      ? userData.firstName
                      : values.firstName;
                  newData.lastName =
                    values.lastName === ""
                      ? userData.lastName
                      : values.lastName;
                  newData.institute =
                    values.institute === ""
                      ? userData.institute
                      : values.institute;
                  newData.country =
                    values.country === "" ? userData.country : values.country;
                  newData.job = values.job === "" ? userData.job : values.job;

                  setUserData(newData);

                  ToastPrint.ToastSuccess(response.data);
                })
                .catch((err) => {
                  ToastPrint.ToastFailure("Cannot Update");
                });
            } else {
              const res = await apiCalls
                .updateInformtion_editor(userData._id, values)
                .then((response) => {
                  resetForm();

                  //update Data
                  const newData = { ...userData };
                  newData.firstName =
                    values.firstName === ""
                      ? userData.firstName
                      : values.firstName;
                  newData.lastName =
                    values.lastName === ""
                      ? userData.lastName
                      : values.lastName;
                  newData.institute =
                    values.institute === ""
                      ? userData.institute
                      : values.institute;
                  newData.country =
                    values.country === "" ? userData.country : values.country;
                  newData.job = values.job === "" ? userData.job : values.job;

                  setUserData(newData);

                  ToastPrint.ToastSuccess(response.data);
                })
                .catch((err) => {
                  ToastPrint.ToastFailure("Cannot Update");
                });
            }
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
                  <TextField label="Institute" name="institute" type="text" />
                </div>
                <div>
                  <TextField label="Country" name="country" type="text" />
                  <TextField label="Job" name="job" type="text" />

                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "black",
                      width: "100%",
                      marginTop: "30px",
                    }}
                    variant="dark"
                    color="white"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ChangePublisherPassword
        id={userData._id}
        uType={userData.userType}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default UpdateDetails;
