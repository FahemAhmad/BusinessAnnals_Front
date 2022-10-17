import React, { useState } from "react";
import { useEffect } from "react";
import { getLocalStorage } from "../../Auth/auth";
import apiCalls from "../../backend/apiCalls";
import UpdateProfile from "../Shared/UpdateProfile";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const UpdateChiefEditor = () => {
  const [details, setDetails] = useState();

  const getChiefDetails = async () => {
    const userDetails = getLocalStorage("user");

    await apiCalls.getUserDetailsById(userDetails?.userId).then((data) => {
      setDetails(data?.data);
    });
  };

  useEffect(() => {
    getChiefDetails();
  }, []);

  return details ? (
    <>
      <UpdateProfile
        profile={details}
        title={"Update your Information"}
        icon={
          <ManageAccountsIcon fontSize="large" style={{ marginBottom: 7 }} />
        }
      />
    </>
  ) : (
    <p>Loading</p>
  );
};

export default UpdateChiefEditor;
