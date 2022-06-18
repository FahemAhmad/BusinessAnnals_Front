import React from "react";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #003951;
`;

function Loader({ loading }) {
  return loading ? (
    <div
      style={{
        zIndex: 1000,
        color: "white",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowX: "hidden",
        backgroundColor: "white",
        flexDirection: "column",
      }}
    >
      <h2 style={{ color: "#003951" }}>We are loading</h2>
      <HashLoader color={"003951"} loading={loading} css={override} size={50} />
    </div>
  ) : null;
}

export default Loader;
