import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./InfoTable.css";

function InfoTable({ data }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (data.userType === "chief") {
      setValue("Chief Editor");
    } else if (data.userType === "editor") {
      setValue("Editor");
    } else {
      setValue("User");
    }
  }, [data]);

  return (
    data && (
      <div style={{ margin: "2% 0%", width: "100%" }}>
        <Table striped hover>
          <tbody>
            <tr>
              <td>Name : </td>
              <td>
                {data.firstName} {data.lastName}
              </td>
            </tr>
            <tr>
              <td>Email : </td>
              <td>{data.email}</td>
            </tr>
            <tr>
              <td>Institue :</td>
              <td>{data.institute}</td>
            </tr>
            <tr>
              <td>Country :</td>
              <td>{data.country}</td>
            </tr>

            <tr>
              <td>Role :</td>
              <td>{data.job}</td>
            </tr>
            <tr>
              <td>User Type :</td>
              <td>{value}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  );
}

export default InfoTable;
