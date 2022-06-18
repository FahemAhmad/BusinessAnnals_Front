import React from "react";
import { ErrorMessage, useField } from "formik";
import { Form } from "react-bootstrap";

function FIlepicker({ label, ...props }) {
  const [field] = useField(props);

  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Attach File</Form.Label>
        <Form.Control type="file" {...props} />
      </Form.Group>
      <ErrorMessage
        component={"div"}
        name={field.name}
        style={{ color: "red", marginTop: -10 }}
      />
    </>
  );
}

export default FIlepicker;
