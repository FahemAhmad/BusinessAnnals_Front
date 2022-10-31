import React, { useEffect, useState } from "react";
import apiCalls from "../../backend/apiCalls";
import JournalsTable from "../Shared/JournalsTable";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import ToastSuccess from "../../Components/Shared/ToastSuccess";
import PublishIcon from "@mui/icons-material/Publish";
import AssignSupervisor from "../Shared/AssignSupervisor";

const New_Submissions = () => {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState();

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
      field: "applied",
      headerName: "Submited by",
      width: 200,
      renderCell: (params) => (
        <>
          {params?.row?.applied.firstName} {params?.row?.applied.lastName}
        </>
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
          <DownloadIcon
            style={{ margin: "0 1rem", color: "#02627a" }}
            onClick={() => downloadPaper(params?.row)}
          />
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

  const [newIssues, setNewIssues] = useState();

  const downloadPaper = async (row) => {
    // await apiCalls.downloadJournal(row?.file).then((res) => console.log(res));
    var win = window.open(row?.file.url, "_blank");
    win.focus();
  };

  const getNewSubmissions = async () => {
    await apiCalls
      .newJournalSubmission()
      .then((data) => setNewIssues(data?.data));
  };

  const handleDeleteEvent = async (row) => {
    setNewIssues(() => newIssues.filter((issue) => issue?.id !== row?.id));

    await apiCalls
      .deleteJournal(row?.id)
      .then((res) => ToastSuccess.ToastSuccess(res?.data))
      .catch((err) => {
        setNewIssues([...newIssues, row]);
        ToastSuccess.ToastFailure(err.response.data);
      });
  };

  //get Current Issues
  useEffect(() => {
    getNewSubmissions();
  }, []);

  return (
    <>
      {newIssues && (
        <JournalsTable
          title={"New Submissions Issues"}
          rows={newIssues}
          columns={columns}
          icon={<PublishIcon fontSize="large" style={{ marginBottom: 7 }} />}
        />
      )}
      <AssignSupervisor
        open={open}
        handleChange={handleChange}
        id={currentId}
        currentIsues={newIssues}
        setCurrentIssues={setNewIssues}
      />
    </>
  );
};

export default New_Submissions;
