import React from "react";
import BoardSection from "../Components/Shared/BoardSection";
import "../Components/Shared/form.css";

function EditorialBoard() {
  return (
    <>
      <div style={{ padding: "2% 10%" }}>
        <h2 className="mainHeading">Editorial Board</h2>
        <hr
          style={{
            height: 2,
          }}
        />
        <BoardSection color={"#000000"} />
        <div style={{ marginTop: "10%" }} />
        <BoardSection color={"#164624"} />
      </div>
    </>
  );
}
export default EditorialBoard;
