import React, { useEffect, useState } from "react";
import apiCalls from "../../backend/apiCalls";
import JournalsTable from "../Shared/JournalsTable";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ToastSuccess from "../../Components/Shared/ToastSuccess";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockResetIcon from "@mui/icons-material/LockReset";
import DetailsIcon from "@mui/icons-material/Details";
import { Modal } from "react-bootstrap";
import ProfileDetails from "../Shared/ProfileDetails";

const ViewEditors = () => {
  const [currentId, setCurrentId] = useState();
  const [editors, seteditors] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    setCurrentId(row?.id);
    setShow(true);
  };

  // const setId = (id) => {
  //   setCurrentId(id);
  //   handleChange();
  // };

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
          <div style={{ cursor: "pointer", display: "flex" }}>
            <div title="Delete User">
              <DeleteIcon
                style={{ margin: "0 1rem", color: "red" }}
                onClick={() => handleDeleteEvent(params?.row)}
              />
            </div>
            <div title="User Details">
              <DetailsIcon
                style={{ margin: "0 1rem", color: "midnightblue" }}
                onClick={() => handleShow(params?.row)}
              />
            </div>
            <div title="Change Activation Status">
              <LockResetIcon
                style={{ margin: "0 1rem", color: "orange" }}
                onClick={() => changeStatus(params?.row)}
              />
            </div>
          </div>
        </>
      ),
    },
  ];

  const changeStatus = async (row) => {
    await apiCalls
      .accountStatus({ id: row?.id, status: !row?.accountStatus })
      .then((data) => {
        ToastSuccess.ToastSuccess("Status Update");
        seteditors(() =>
          editors.filter((ed) => {
            if (row?.id === ed.id) {
              ed.accountStatus = !ed.accountStatus;
            }
            return ed;
          })
        );
      });
  };

  const getListOfEditors = async () => {
    await apiCalls.getEditors().then((data) => seteditors(data?.data));
  };

  const handleDeleteEvent = async (row) => {
    seteditors(() => editors.filter((editor) => editor?.id !== row?.id));
    await apiCalls
      .deleteUser(row?.id)
      .then((res) => ToastSuccess.ToastSuccess(res?.data))
      .catch((err) => {
        seteditors([...editors, row]);
        ToastSuccess.ToastFailure(err.response.data);
      });
  };

  //get list of editors
  useEffect(() => {
    getListOfEditors();
  }, []);

  return (
    <>
      {editors && (
        <JournalsTable
          title={"View editors"}
          rows={editors}
          columns={columns}
          icon={<VisibilityIcon fontSize="large" style={{ marginBottom: 7 }} />}
          name={true}
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

export default ViewEditors;
