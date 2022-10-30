import React, { useState } from "react";
import { useEffect } from "react";
import { getLocalStorage } from "../../Auth/auth";

import UpdateProfile from "../Shared/UpdateProfile";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useParams } from "react-router-dom";

const UpdateChiefEditor = ({ endpoint }) => {
  const [details, setDetails] = useState();
  let { id } = useParams();

  const getChiefDetails = async () => {
    await endpoint(id).then((data) => {
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
