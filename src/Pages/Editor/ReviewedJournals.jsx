import React, { useEffect, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import apiCalls from "../../backend/apiCalls";
import JournalsTable from "../Shared/JournalsTable";
import Article from "@mui/icons-material/Article";
import { useParams } from "react-router-dom";

const ReviewedJournals = () => {
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
          {params?.row?.supervisor.firstName} {params?.row?.supervisor.lastName}
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
        </>
      ),
    },
  ];

  const [allIssues, setAllIssues] = useState();

  const getAllIssues = async () => {
    await apiCalls
      .getReviwedContent_editor(id)
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
          title={"Reviewed Journals"}
          rows={allIssues}
          columns={columns}
          icon={<Article fontSize="large" style={{ marginBottom: 7 }} />}
        />
      )}
    </>
  );
};

export default ReviewedJournals;
