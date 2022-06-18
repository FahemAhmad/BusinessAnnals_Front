import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import TextField from "../Shared/TextField";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import TextArea from "../Shared/TextArea";
import FIlepicker from "../Shared/FIlepicker";
import apiCalls from "../../backend/apiCalls.js";
import ToastPrint from "../Shared/ToastSuccess";

const FILE_SIZE = 10 * 1024 * 1024;
const SUPPORTED_FORMATS = ["application/pdf"];

const validationSchema = yup.object().shape({
  title: yup.string().required().label("Title").min(3).max(100),
  authors: yup.string().required().label("Authors"),
  field: yup.string().required().label("Field").min(3),
  abstract: yup.string().required().label("Abstract").min(10).max(1000),
  file: yup
    .mixed()
    .required("A file is required")
    .test(
      "fileSize",
      "File must be less than 2MB",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "File format must be PDF",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .label("File"),
});

function SubmissionForm() {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        title: "",
        authors: [],
        field: "",
        abstract: "",
        file: undefined,
      }}
      onSubmit={async (values, { resetForm }) => {
        const dataForm = new FormData();
        dataForm.append("title", values.title);
        dataForm.append("authors", values.authors);
        dataForm.append("category", values.field);
        dataForm.append("abstract", values.abstract);
        dataForm.append("file", values.file);

        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };

        //resetForm();
        const res = await apiCalls.uploadJournals(dataForm, config);

        if (res.status === 200) {
          ToastPrint.ToastSuccess(res.data);
        } else {
          toast.error(res.data, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          resetForm({
            title: values.title,
            authors: values.authors,
            field: values.field,
            abstract: values.abstract,
            file: values.file,
          });
        }
      }}
    >
      {(formik) => (
        <Form>
          <TextField
            label="Title"
            name="title"
            type="text"
            placeholder="Tales of Business Ventures"
          />
          <TextField
            label="Authors"
            name="authors"
            type="text"
            placeholder="Faheem, Ashar, Arbab"
          />
          <TextField
            label="Field"
            name="field"
            type="text"
            placeholder="Marketing"
          />
          <TextArea
            label="Abstract"
            name="abstract"
            type="text"
            placeholder="Lorem ipsum dolor sit amet consectetur, adipiolestiae, quos, adipisci dol."
          />
          <FIlepicker
            name="file"
            onChange={(e) => formik.setFieldValue("file", e.target.files[0])}
          />

          <Button
            type="submit"
            style={{
              backgroundColor: "black",
              padding: "5px 15px",
              marginTop: 10,
            }}
            variant="dark"
            color="white"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default SubmissionForm;
