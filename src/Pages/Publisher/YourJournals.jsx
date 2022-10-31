import React, { useEffect, useState } from "react";
import apiCalls from "../../backend/apiCalls";

import DownloadIcon from "@mui/icons-material/Download";

import Article from "@mui/icons-material/Article";
import { useParams } from "react-router-dom";
import JournalsTable from "../Shared/JournalsTable";

const returnBagdeColor = (status) => {
  if (status === "Approved") return ["#90EE90", "green"];
  else if (status === "Rejected") return ["#FFCCCB", "red"];
  else return ["#FFF9A6", "brown"];
};

const YourJournals = () => {
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
          {params?.row?.applied.firstName} {params?.row?.applied.lastName}
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
      width: 100,
      cellClassName: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <DownloadIcon
            style={{ margin: "0 1rem", color: "#02627a" }}
            onClick={() => downloadPaper(params?.row)}
          />
        </>
      ),
    },
  ];

  const [allIssues, setAllIssues] = useState();

  const getAllIssues = async () => {
    await apiCalls
      .getContent_publisher(id)
      .then((data) => setAllIssues(data?.data.data));
  };

  const downloadPaper = async (row) => {
    // await apiCalls.downloadJournal(row?.file).then((res) => console.log(res));
    var win = window.open(row?.file.url, "_blank");
    win.focus();
  };

  //get All issues
  useEffect(() => {
    getAllIssues();
  }, []);

  return (
    <>
      {allIssues && (
        <JournalsTable
          title={"Your Journals"}
          rows={allIssues}
          columns={columns}
          icon={<Article fontSize="large" style={{ marginBottom: 7 }} />}
        />
      )}
    </>
  );
};

export default YourJournals;
