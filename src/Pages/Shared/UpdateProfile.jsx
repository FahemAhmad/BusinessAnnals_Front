import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import TextField from "../../Components/Shared/TextField";
import { Button } from "react-bootstrap";
import ToastSuccess from "../../Components/Shared/ToastSuccess";
import Title from "./Title";
import apiCalls from "../../backend/apiCalls";

const validationSchema = yup.object().shape({
  firstName: yup.string().min(2).max(64).label("First Name").required(),
  lastName: yup.string().min(2).max(64).label("Last Name"),
  institute: yup.string().required().label("Institue"),
  country: yup.string().required().label("Country"),
  job: yup.string().required().label("Job"),
});

function UpdateProfile({ profile, title, icon }) {
  console.log("profile", profile);
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        firstName: profile.firstName,
        lastName: profile.lastName,
        institute: profile.institute,
        country: profile.country,
        job: profile.job,
      }}
      onSubmit={async (values, { resetForm }) => {
        await apiCalls
          .updateInformation_chief({ id: profile._id, ...values })
          .then((data) => {
            ToastSuccess.ToastSuccess(data?.data);
          })
          .catch((err) => ToastSuccess.ToastFailure(err.response.data));
      }}
    >
      {(formik) => (
        <>
          <Title name={title} icon={icon} />
          <div
            className="container"
            style={{ maxWidth: 500, width: "50vh", margin: "100px auto" }}
          >
            <Form>
              <TextField label="First Name" name="firstName" type="text" />
              <TextField label="Last Name" name="lastName" type="text" />
              <TextField label="Institute" name="institute" type="text" />
              <TextField label="Country" name="country" type="text" />
              <TextField label="Job" name="job" type="text" />
              <Button
                type="submit"
                style={{ backgroundColor: "black", width: "100%" }}
                variant="dark"
                color="white"
              >
                Update
              </Button>
            </Form>
          </div>
        </>
      )}
    </Formik>
  );
}

export default UpdateProfile;
