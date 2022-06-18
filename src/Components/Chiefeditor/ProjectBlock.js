import React, { useState } from "react";
import apiCalls from "../../backend/apiCalls";
import WhiteFields from "../Shared/WhiteFields";

function ProjectBlock({ post }) {
  const [data, setData] = useState(post);

  const downloadJournal = async (fileName) => {
    await apiCalls.downloadJournal(fileName);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "3%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <h2 style={{ fontSize: "35px", fontWeight: "800", color: "#003951" }}>
          {post.title}
        </h2>
        <p
          style={{
            fontSize: 12,
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer",
          }}
          onClick={() => downloadJournal(post.file)}
        >
          Download Journal
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            backgroundColor: "#003951",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bolder",
            color: "white",
            fontSize: 35,
            height: 37 * 5 + 1,
          }}
        >
          <p style={{ margin: "0px 5px" }}>{post.category}</p>
        </div>
        <div style={{ flex: 5 }}>
          <WhiteFields posts={data} />
        </div>
      </div>
    </div>
  );
}

export default ProjectBlock;
