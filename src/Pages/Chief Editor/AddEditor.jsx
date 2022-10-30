import React from "react";
import apiCalls from "../../backend/apiCalls";
import SignupForm from "../../Components/Signup/SignupForm";
import "./AddEditor.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Title from "../Shared/Title";

const AddEditor = () => {
  return (
    <>
      <Title
        name={"Create Editor"}
        icon={<AddCircleIcon fontSize="large" style={{ marginBottom: 7 }} />}
      />
      <div className="add-container">
        <SignupForm api={apiCalls.createReviewer} />
      </div>
    </>
  );
};

export default AddEditor;
