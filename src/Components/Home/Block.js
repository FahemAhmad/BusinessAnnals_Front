import React from "react";
import { dateFormat } from "../../Utility/dateFormat";
import "../Shared/shared.css";

function Block({ title, authors, date }) {
  return (
    <div className="block">
      <p className="block-title">{title}</p>
      <p className="block-authors">{authors}</p>
      <div
        style={{
          borderTop: "1px solid #111 ",
        }}
      ></div>
      <p className="block-date">{`First Published : ${dateFormat(date)}`}</p>
    </div>
  );
}

export default Block;
