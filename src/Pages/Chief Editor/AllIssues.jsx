import React, { useEffect, useState } from "react";
import apiCalls from "../../backend/apiCalls";
import JournalsTable from "../Shared/JournalsTable";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import ToastSuccess from "../../Components/Shared/ToastSuccess";
import Article from "@mui/icons-material/Article";

const AllIssues = () => {
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
      field: "actions",
      type: "actions",
      width: 100,
      cellClassName: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <DownloadIcon style={{ margin: "0 1rem", color: "#02627a" }} />
          <DeleteIcon
            style={{ margin: "0 1rem", color: "red" }}
            onClick={() => handleDeleteEvent(params?.row)}
          />
        </>
      ),
    },
  ];

  const [allIssues, setAllIssues] = useState();

  const getAllIssues = async () => {
    await apiCalls.getJournals().then((data) => setAllIssues(data?.data));
  };

  const handleDeleteEvent = async (row) => {
    setAllIssues(() => allIssues.filter((issue) => issue?.id !== row?.id));

    await apiCalls
      .deleteJournal(row?.id)
      .then((res) => ToastSuccess.ToastSuccess(res?.data))
      .catch((err) => {
        setAllIssues([...allIssues, row]);
        ToastSuccess.ToastFailure(err.response.data);
      });
  };

  //get All issues
  useEffect(() => {
    getAllIssues();
  }, []);

  return (
    <>
      {allIssues && (
        <JournalsTable
          title={"All Issues"}
          rows={allIssues}
          columns={columns}
          icon={<Article fontSize="large" style={{ marginBottom: 7 }} />}
        />
      )}
    </>
  );
};

export default AllIssues;
