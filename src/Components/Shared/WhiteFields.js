import React from "react";
import { Table } from "react-bootstrap";
import "./WhiteFields.css";

function WhiteFields({ posts }) {
  return posts ? (
    <div style={{ width: "100%", height: "100%" }}>
      <Table bordered className="white">
        <tbody>
          <tr>
            <td>Status</td>
            <td
              style={
                posts.status === "Approved"
                  ? { color: "green" }
                  : posts.status === "Rejected"
                  ? { color: "red" }
                  : { color: "gold" }
              }
            >
              {posts.status}
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>Faheem Ahmad</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>Jacob@gmail.com</td>
          </tr>
          <tr>
            <td>Institue</td>
            <td>FAST-NUCES</td>
          </tr>
          <tr>
            <td>Publication Year</td>
            <td>{posts.publicationYear}</td>
          </tr>
          <tr>
            <td>Institue</td>
            <td>FAST-NUCES</td>
          </tr>
        </tbody>
      </Table>
    </div>
  ) : null;
}

export default WhiteFields;
