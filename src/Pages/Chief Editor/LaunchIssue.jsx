import React, { useEffect, useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import apiCalls from "../../backend/apiCalls";
import ToastSuccess from "../../Components/Shared/ToastSuccess";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Button } from "react-bootstrap";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "max-content",
  minWidth: "40vw",
  display: "flex",
  justifyContent: "center",
};

const LaunchIssue = ({ open, handleChange }) => {
  //months
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let years = [];

  function generateArrayOfYears() {
    var max = new Date().getFullYear();
    var min = max + 10;
    var years = [];

    for (let i = max; i <= min; i++) {
      years.push(i.toString());
    }
    return years;
  }

  years = generateArrayOfYears();

  const [startDuration, setStartDuration] = useState({
    month: "",
    year: "",
  });
  const [endDuration, setEndDuration] = useState({
    month: "",
    year: "",
  });
  const [error, setError] = useState("");

  const launchIssueSubmit = async () => {
    if (
      startDuration?.month.length > 0 &&
      startDuration?.year.length > 0 &&
      endDuration?.year.length > 0 &&
      endDuration?.month.length > 0
    ) {
      await apiCalls
        .launchIssue({
          IssueStartYear: startDuration.year,
          IssueEndYear: endDuration.year,
          IssueStartMonth: startDuration.month,
          IssueEndMonth: endDuration.month,
        })
        .then((res) => {
          handleChange();
          ToastSuccess.ToastSuccess("Issue Launched");
        })
        .catch((err) => ToastSuccess.ToastFailure("Error Launching paper"));
    } else {
      setError("Please Select the dates");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleChange}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <h2 style={{ textAlign: "flex-start", width: "100%" }}>
            Launch Issue
          </h2>
          <div
            style={{
              height: 1,
              backgroundColor: "lightgray",
              width: "100%",
              marginBottom: 20,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h6>Issue Start :</h6>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Month
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={startDuration?.month}
                  onChange={(e) =>
                    setStartDuration({
                      month: e.target.value,
                      year: startDuration?.year,
                    })
                  }
                  label="s_Month"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {months.map((m, index) => (
                    <MenuItem key={index} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Year
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={startDuration?.year}
                  onChange={(e) =>
                    setStartDuration({
                      year: e.target.value,
                      month: startDuration?.month,
                    })
                  }
                  label="s_Year"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {years?.map((y, index) => (
                    <MenuItem key={y} value={y}>
                      {y}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h6>Issue End :</h6>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Month
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={endDuration?.month}
                  onChange={(e) =>
                    setEndDuration({
                      month: e.target.value,
                      year: startDuration?.year,
                    })
                  }
                  label="e_Month"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {months.map((m) => (
                    <MenuItem value={m}>{m}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Year
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={endDuration?.year}
                  onChange={(e) =>
                    setEndDuration({
                      year: e.target.value,
                      month: startDuration?.month,
                    })
                  }
                  label="e_Year"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {years?.map((y) => (
                    <MenuItem value={y}>{y}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {error && (
              <p
                style={{
                  textAlign: "center",
                  color: "red",
                  margin: "20px 0px",
                }}
              >
                {error}
              </p>
            )}

            <Button
              style={{
                backgroundColor: "black",
                border: "none",
                padding: 10,
              }}
              onClick={() => launchIssueSubmit()}
            >
              Launch Issue
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default LaunchIssue;
