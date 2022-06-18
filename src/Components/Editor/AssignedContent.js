import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import apiCalls from "../../backend/apiCalls";
import ProjectBlock from "../Chiefeditor/ProjectBlock";
import PaginationItem from "../Shared/PaginationItem";
import ToastSuccess from "../Shared/ToastSuccess";

function AssignedContent({ id, trigger, setTrigger }) {
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [calculate, setCalculate] = useState(0);
  const postsPerPage = 5;

  //get results
  const getJournals = async ({ cPage: cp }) => {
    setLoading(true);
    if (id !== undefined) {
      const indexOfLastPost = (cp - 1) * postsPerPage;
      const res = await apiCalls.getAsssignedContent_editor(
        id,
        postsPerPage,
        indexOfLastPost
      );

      if (res.status === 200) {
        setposts(res.data.data);
        setCalculate(Math.ceil(res.data.count / postsPerPage));
      }
    }
    setLoading(false);
  };

  //accept journal
  const accept = async (id) => {
    const values = { status: "Approved" };
    const res = await apiCalls.changeStatus_editor(id, values);

    if (res.status === 200) {
      setTrigger(!trigger);
      setposts(posts.filter((post) => post.id !== id));
      ToastSuccess.ToastSuccess("Journal Accepted");
    } else {
      ToastSuccess.ToastFailure("Error Occured");
    }
  };

  //reject journal
  const reject = async (id) => {
    const values = { status: "Rejected" };
    const res = await apiCalls.changeStatus_editor(id, values);

    if (res.status === 200) {
      setTrigger(!trigger);
      setposts(posts.filter((post) => post.id !== id));
      ToastSuccess.ToastSuccess("Journal Rejected");
    } else {
      ToastSuccess.ToastFailure("Error Occured");
    }
  };

  useEffect(() => {
    getJournals({ cPage: currentPage });
    return () => setCurrentPage(1);
  }, []);

  return (
    <>
      <div style={{ marginTop: "5%" }} />
      {!loading ? (
        posts.map((post, index) => (
          <>
            <ProjectBlock key={index} post={post} />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                style={{
                  backgroundColor: "green",
                  padding: "5px 10px",
                  marginTop: 10,

                  minWidth: 100,
                  border: "none",
                }}
                variant="dark"
                color="white"
                onClick={() => accept(post.id)}
              >
                Accept
              </Button>
              <Button
                style={{
                  backgroundColor: "red",
                  padding: "5px 10px",
                  marginTop: 10,

                  minWidth: 100,
                  border: "none",
                }}
                variant="dark"
                color="white"
                onClick={() => reject(post.id)}
              >
                Reject
              </Button>
            </div>
          </>
        ))
      ) : (
        <h2>Loading....</h2>
      )}
      {!loading && posts.length > 0 && (
        <PaginationItem
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={calculate}
          onPress={getJournals}
        />
      )}
    </>
  );
}

export default AssignedContent;
