import { useEffect } from "react";
import { removeCookie, removeLocalStorage } from "../Auth/auth";

function Logout() {
  useEffect(() => {
    removeCookie("token");
    removeLocalStorage("user");

    window.location = "/";
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 99999,
        height: "100vh",
        width: "100%",
        backgroundColor: "#D3D3D350",
        overflow: "hidden",
      }}
    ></div>
  );
}

export default Logout;
