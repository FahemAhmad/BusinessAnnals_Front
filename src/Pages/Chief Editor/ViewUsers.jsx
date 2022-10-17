import React, { useEffect, useState } from "react";
import apiCalls from "../../backend/apiCalls";
import JournalsTable from "../Shared/JournalsTable";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ToastSuccess from "../../Components/Shared/ToastSuccess";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockResetIcon from "@mui/icons-material/LockReset";
import DetailsIcon from "@mui/icons-material/Details";
import GroupIcon from "@mui/icons-material/Group";

const ViewUsers = () => {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [users, setusers] = useState();

  const handleChange = () => setOpen(!open);

  const setId = (id) => {
    setCurrentId(id);
    handleChange();
  };

  //columns

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => (
        <>
          {params?.row?.firstName} {params?.row?.lastName}
        </>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },

    {
      field: "accountStatus",
      headerName: "Account Status ",
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: params.row.accountStatus ? "#90EE90" : "#FFCCCB",
            color: params.row.accountStatus ? "green" : "row",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          {params?.row.accountStatus ? "Active" : "False"}
        </div>
      ),
    },

    {
      field: "actions",
      type: "actions",
      cellClassName: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <DeleteIcon
            style={{ margin: "0 1rem", color: "red" }}
            onClick={() => handleDeleteEvent(params?.row)}
          />
          <DetailsIcon style={{ margin: "0 1rem", color: "midnightblue" }} />
          <LockResetIcon style={{ margin: "0 1rem", color: "orange" }} />
        </>
      ),
    },
  ];

  const getListOfusers = async () => {
    await apiCalls.getUsers().then((data) => setusers(data?.data));
  };

  const handleDeleteEvent = async (row) => {
    // setusers(() => users.filter((editor) => editor?.id !== row?.id));
    // await apiCalls
    //   .deleteJournal(row?.id)
    //   .then((res) => ToastSuccess.ToastSuccess(res?.data))
    //   .catch((err) => {
    //     setusers([...users, row]);
    //     ToastSuccess.ToastFailure(err.response.data);
    //   });
  };

  //get list of users
  useEffect(() => {
    getListOfusers();
  }, []);

  return (
    <>
      {users && (
        <JournalsTable
          title={"View users"}
          rows={users}
          columns={columns}
          icon={<GroupIcon fontSize="large" style={{ marginBottom: 7 }} />}
        />
      )}
    </>
  );
};

export default ViewUsers;
