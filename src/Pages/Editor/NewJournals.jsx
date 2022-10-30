import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import apiCalls from "../../backend/apiCalls";
import JournalsTable from "../Shared/JournalsTable";
import Article from "@mui/icons-material/Article";
import ToastSuccess from "../../Components/Shared/ToastSuccess";

const NewJournals = () => {
  const { id } = useParams();
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
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor:
              params.row.status === "In Process"
                ? "gold"
                : params.row.status === "Approved"
                ? "#90EE90"
                : "#FFCCCB",
            color:
              params.row.status === "In Process"
                ? "brown"
                : params.row.status
                ? "green"
                : "row",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          {params?.row?.status}
        </div>
      ),
    },

    {
      field: "actions",
      type: "actions",
      width: 100,
      cellClassName: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <>
          <DownloadIcon style={{ margin: "0 1rem", color: "#02627a" }} />
          <button
            style={{
              backgroundColor: "#90EE90",
              color: "green",
              padding: "5px 10px",
              borderRadius: "5px",
              marginRight: 25,
              border: "none",
            }}
            onClick={() =>
              changeJournalStatus(params?.row, { status: "Approved" })
            }
          >
            Approve
          </button>
          <button
            style={{
              backgroundColor: "#FFCCCB",
              color: "red",
              padding: "5px 10px",
              borderRadius: "5px",
              border: "none",
            }}
            onClick={() =>
              changeJournalStatus(params?.row, { status: "Rejected" })
            }
          >
            Reject
          </button>
        </>
      ),
    },
  ];

  const changeJournalStatus = async (row, value) => {
    await apiCalls
      .changeStatus_editor(row?.id, value)
      .then((res) => ToastSuccess.ToastSuccess("Paper Checked"))
      .catch((err) => ToastSuccess.ToastFailure("Error Verification of paper"));

    setAllIssues(() => allIssues.filter((issue) => issue.id !== row?.id));
  };

  const [allIssues, setAllIssues] = useState();

  const getAllIssues = async () => {
    await apiCalls
      .getAsssignedContent_editor(id)
      .then((data) => setAllIssues(data?.data));
  };

  //get All issues
  useEffect(() => {
    getAllIssues();
  }, []);

  return (
    <>
      {allIssues && (
        <JournalsTable
          title={"New Journals"}
          rows={allIssues}
          columns={columns}
          icon={<Article fontSize="large" style={{ marginBottom: 7 }} />}
        />
      )}
    </>
  );
};

export default NewJournals;
