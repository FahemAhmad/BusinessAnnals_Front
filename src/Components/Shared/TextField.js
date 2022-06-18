import React from "react";
import { ErrorMessage, useField } from "formik";

function TextField({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="mb-2" style={{ marginTop: "1%" }}>
      <label htmlFor={field.name} style={{ marginTop: "10px" }}>
        {label}
      </label>
      <input
        className={`form-control shadow-none ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component={"div"}
        name={field.name}
        style={{ color: "red" }}
      />
    </div>
  );
}

export default TextField;
