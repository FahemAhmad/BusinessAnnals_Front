import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import FIlterDropDown from "../Chiefeditor/FIlterDropDown";
import { Button } from "react-bootstrap";
import "./WhiteFields.css";
import apiCalls from "../../backend/apiCalls";
import { toast } from "react-toastify";

function NewSubmitFields({ posts, removePost, addPost, trigger, setTrigger }) {
  const [categories, setCategories] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [selectCat, setSelectCat] = useState("");
  const [selectSupervisors, setSelectSupervisors] = useState("");

  const array = [
    { firstName: "Business" },
    { firstName: "Marketing" },
    { firstName: "Sales" },
  ];

  const getEditorsList = async () => {
    const res = await apiCalls.getEditors();
    if (res.status === 200) {
      setSupervisors(res.data);
    }
  };

  const assignSupervisors = async () => {
    if (selectCat !== "" && selectSupervisors !== "") {
      const value = { supervisors: selectSupervisors.id, category: selectCat };
      console.log(value);
      const res = await apiCalls.assignSupervisor(posts.id, value);

      removePost({ id: posts.id });
      setTrigger(!trigger);

      if (res.status === 200) {
        toast.success(res.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        addPost(posts);
        toast.error(res.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Please Select Dropdowns", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    setCategories(array);
    getEditorsList();
    return () => setCategories(array);
  }, []);

  return posts ? (
    <>
      <div style={{ width: "100%", height: "100%", margin: "20px 0px" }}>
        <Table bordered className="white">
          <tbody>
            <tr>
              <td>Project Title :</td>
              <td style={{ fontWeight: "bold" }}>{posts.title}</td>
            </tr>
            <tr>
              <td>Project Authors :</td>
              <td style={{ fontWeight: "bold" }}>
                {posts.author.map((singleAuthor, i) =>
                  i !== 0 ? `, ${singleAuthor}` : singleAuthor
                )}
              </td>
            </tr>
            <tr>
              <td>Submission Date</td>
              <td>{posts.publicationYear}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <FIlterDropDown
            setFunc={setSelectCat}
            data={categories}
            title="Select Category"
            trigger={trigger}
          />
          <FIlterDropDown
            setFunc={setSelectSupervisors}
            data={supervisors}
            title="Select Supervisor"
            trigger={trigger}
          />
        </div>
        <Button
          type="submit"
          style={{ backgroundColor: "black", padding: "5px 10px" }}
          variant="dark"
          color="white"
          onClick={assignSupervisors}
        >
          Assign
        </Button>
      </div>
    </>
  ) : null;
}

export default NewSubmitFields;
