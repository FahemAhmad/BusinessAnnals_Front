import React, { useEffect, useState } from "react";
import apiCalls from "../../backend/apiCalls";
import JournalsTable from "../Shared/JournalsTable";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ToastSuccess from "../../Components/Shared/ToastSuccess";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockResetIcon from "@mui/icons-material/LockReset";
import DetailsIcon from "@mui/icons-material/Details";
import GroupIcon from "@mui/icons-material/Group";
import ProfileDetails from "../Shared/ProfileDetails";
import { Modal } from "react-bootstrap";

const ViewUsers = () => {
  const [currentId, setCurrentId] = useState();
  const [users, setusers] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    setCurrentId(row?.id);
    setShow(true);
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
          <DetailsIcon
            style={{ margin: "0 1rem", color: "midnightblue" }}
            onClick={() => handleShow(params?.row)}
          />
          <LockResetIcon
            style={{ margin: "0 1rem", color: "orange" }}
            onClick={() => changeStatus(params?.row)}
          />
        </>
      ),
    },
  ];
  const changeStatus = async (row) => {
    await apiCalls
      .accountStatus({ id: row?.id, status: !row?.accountStatus })
      .then((data) => {
        ToastSuccess.ToastSuccess("Status Update");
        setusers(() =>
          users.filter((ed) => {
            if (row?.id === ed.id) {
              ed.accountStatus = !ed.accountStatus;
            }
            return ed;
          })
        );
      });
  };

  const getListOfusers = async () => {
    await apiCalls.getUsers().then((data) => setusers(data?.data));
  };

  const handleDeleteEvent = async (row) => {
    setusers(() => users.filter((editor) => editor?.id !== row?.id));
    await apiCalls
      .deleteUser(row?.id)
      .then((res) => ToastSuccess.ToastSuccess(res?.data))
      .catch((err) => {
        setusers([...users, row]);
        ToastSuccess.ToastFailure(err.response.data);
      });
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
          name={true}
          icon={<GroupIcon fontSize="large" style={{ marginBottom: 7 }} />}
        />
      )}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfileDetails
            endpointCall={apiCalls.getUserDetailsById}
            userId={currentId}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewUsers;
