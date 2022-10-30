import React, { useEffect, useState } from "react";
import apiCalls from "../../backend/apiCalls";
import JournalsTable from "../Shared/JournalsTable";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import ToastSuccess from "../../Components/Shared/ToastSuccess";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignSupervisor from "../Shared/AssignSupervisor";
import LaunchIssue from "./LaunchIssue";

const returnBagdeColor = (status) => {
  if (status === "Approved") return ["#90EE90", "green"];
  else if (status === "Rejected") return ["#FFCCCB", "red"];
  else return ["#FFF9A6", "brown"];
};

const CurrentIssues = () => {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [launchIssue, setLaunchIssue] = useState(false);

  const handleChange = () => setOpen(!open);

  const setId = (id) => {
    setCurrentId(id);
    handleChange();
  };

  //columns

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
    },

    {
      field: "supervisor",
      headerName: "Supervisor",
      width: 200,
      renderCell: (params) => (
        <>
          {params?.row?.supervisor.firstName} {params?.row?.supervisor.lastName}
        </>
      ),
    },
    {
      field: "applied",
      headerName: "Submited by",
      width: 200,
      renderCell: (params) => (
        <>
          {params?.row?.applied?.firstName} {params?.row?.applied?.lastName}
        </>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor: returnBagdeColor(params?.row.status)[0],
            color: returnBagdeColor(params?.row.status)[1],
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          {params?.row.status}
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
          <DownloadIcon style={{ margin: "0 1rem", color: "#02627a" }} />
          <DeleteIcon
            style={{ margin: "0 1rem", color: "red" }}
            onClick={() => handleDeleteEvent(params?.row)}
          />
          <button
            style={{
              backgroundColor: "black",
              padding: "5px 10px",
              color: "white",
              borderRadius: "10px",
            }}
            onClick={() => setId(params?.row._id)}
          >
            Edit Supervisor
          </button>
        </>
      ),
    },
  ];

  const [currentIsues, setCurrentIssues] = useState();

  const getCurrentIssues = async () => {
    await apiCalls
      .getCurrentJournals()
      .then((data) => setCurrentIssues(data?.data));
  };

  const handleDeleteEvent = async (row) => {
    setCurrentIssues(() =>
      currentIsues.filter((issue) => issue?.id !== row?.id)
    );

    await apiCalls
      .deleteJournal(row?.id)
      .then((res) => ToastSuccess.ToastSuccess(res?.data))
      .catch((err) => {
        setCurrentIssues([...currentIsues, row]);
        ToastSuccess.ToastFailure(err.response.data);
      });
  };

  //get All issues
  useEffect(() => {
    getCurrentIssues();
  }, []);

  return (
    <>
      <button
        style={{
          position: "absolute",
          width: "200px",
          padding: 10,
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          right: 60,
          top: 90,
        }}
        onClick={() => setLaunchIssue(!launchIssue)}
      >
        Launch the issue
      </button>
      {currentIsues && (
        <JournalsTable
          title={"Current Issues"}
          rows={currentIsues}
          columns={columns}
          icon={
            <DescriptionIcon fontSize="large" style={{ marginBottom: 7 }} />
          }
        />
      )}
      <AssignSupervisor
        open={open}
        handleChange={handleChange}
        id={currentId}
        currentIsues={currentIsues}
        setCurrentIssues={setCurrentIssues}
      />
      <LaunchIssue
        open={launchIssue}
        handleChange={() => setLaunchIssue(!launchIssue)}
      />
    </>
  );
};

export default CurrentIssues;
