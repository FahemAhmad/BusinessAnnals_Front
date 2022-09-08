import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import Title from "./Title";
import { TextField } from "@mui/material";
import { useEffect } from "react";

const JournalsTable = ({ title, icon, rows, columns }) => {
  const [field, setField] = useState();
  const [displayRows, setDisplayRows] = useState(rows);

  const handleChange = (event) => {
    setField(event.target.value);
    if (event.target.value?.length > 3) {
      setDisplayRows(() =>
        rows.filter((row) =>
          row?.title?.toLowerCase().includes(field.toLowerCase())
        )
      );
    } else if (rows?.length !== displayRows?.length) {
      setDisplayRows(rows);
    }
  };

  useEffect(() => {
    setDisplayRows(rows);
    setField("");
  }, [rows]);

  return (
    <>
      <Title name={title} icon={icon} />
      <TextField
        id="outlined-basic"
        label="Search by Name"
        variant="outlined"
        onChange={handleChange}
        style={{ width: "20vw", margin: "0 1rem" }}
        size="small"
      />
      <Box sx={{ height: "65%", width: "95%", margin: "1rem" }}>
        <DataGrid
          rows={displayRows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          disableSelectionOnClick
        />
      </Box>
    </>
  );
};

export default JournalsTable;
