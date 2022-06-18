import React from "react";
import { ErrorMessage, useField } from "formik";

function TextArea({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="mb-2" style={{ marginTop: "1%" }}>
      <label htmlFor={field.name} style={{ marginTop: "10px" }}>
        {label}
      </label>
      <textarea
        className={`form-control shadow-none ${
          meta.touched && meta.error && "is-invalid"
        }`}
        autoComplete="off"
        id="exampleFormControlTextarea1"
        rows="4"
        {...field}
        {...props}
      />
      <ErrorMessage
        component={"div"}
        name={field.name}
        style={{ color: "red" }}
      />
    </div>
  );
}

export default TextArea;
