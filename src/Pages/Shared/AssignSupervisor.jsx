import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import apiCalls from "../../backend/apiCalls";
import ToastSuccess from "../../Components/Shared/ToastSuccess";

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
};

const AssignSupervisor = ({
  id,
  open,
  handleChange,
  currentIsues,
  setCurrentIssues,
}) => {
  const asigningSupervisor = async () => {
    const supervisor = editors.filter((e) => e.firstName === currentEditor)[0];

    setLoading(true);
    await apiCalls
      .assignSupervisor(id, supervisor?._id)
      .then((data) => {
        setLoading(false);

        setCurrentIssues(() =>
          currentIsues.filter((issue) => {
            if (issue._id === id) {
              issue.supervisor = supervisor;
              issue.status = "In Process";
            }
            return issue;
          })
        );

        handleChange();

        ToastSuccess.ToastSuccess(data.data);
      })
      .catch((err) => {
        setLoading(false);

        ToastSuccess.ToastFailure(err.response.data);
      });
  };

  const getListOfEditors = async () => {
    setLoading(true);
    await apiCalls
      .getEditors()
      .then((edit) => {
        setEditors(edit?.data);
        setLoading(false);
      })
      .catch((err) => {
        ToastSuccess.ToastFailure(err.response.data);
        setLoading(false);
      });
  };

  const [editors, setEditors] = useState();
  const [currentEditor, setCurrentEditor] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListOfEditors();
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleChange}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {loading ? (
          <h2>Loading</h2>
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Assign Supervisor
            </Typography>
            <Autocomplete
              onChange={(v, editor) => setCurrentEditor(editor)}
              style={{ marginTop: 20 }}
              disablePortal
              id="combo-box-demo"
              options={editors?.map((option) => option.firstName)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Editors" />
              )}
            />
            <button
              style={{
                backgroundColor: "black",
                padding: "5px 10px",
                color: "white",
                borderRadius: "10px",
                marginTop: 30,
              }}
              onClick={asigningSupervisor}
              disabled={currentEditor === undefined ? true : false}
            >
              Assign Supervisor
            </button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default AssignSupervisor;
