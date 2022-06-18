import React, { useEffect, useState } from "react";
import ProjectBlock from "./ProjectBlock";
import apiCalls from "../../backend/apiCalls";
import PaginationItem from "../Shared/PaginationItem";
import { Button } from "react-bootstrap";
import LaunchingIssue from "./LaunchingIssue";

function Assigned({ trigger }) {
  const [showModel, setShowModel] = useState(false);
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [calculate, setCalculate] = useState(0);
  const postsPerPage = 5;

  //get results
  const getJournals = async ({ cPage: cp }) => {
    setLoading(true);

    const indexOfLastPost = (cp - 1) * postsPerPage;
    const res = await apiCalls.getAllJournals(postsPerPage, indexOfLastPost);

    if (res.status === 200) {
      setposts(res.data.data);
      setCalculate(Math.ceil(res.data.count / postsPerPage));
    }
    setLoading(false);
  };

  useEffect(() => {
    getJournals({ cPage: currentPage });
    return () => setCurrentPage(1);
  }, [trigger]);

  return (
    <>
      <Button
        style={{
          backgroundColor: "black",
          padding: "5px 10px",
          marginTop: 10,
          alignSelf: "flex-end",
        }}
        variant="dark"
        color="white"
        onClick={() => setShowModel(true)}
      >
        Publish Issue
      </Button>
      <div style={{ marginTop: "5%" }} />

      {!loading ? (
        <>
          {posts.map((post, index) => (
            <ProjectBlock key={index} post={post} />
          ))}
        </>
      ) : (
        <h2>Loading....</h2>
      )}
      {!loading && (
        <PaginationItem
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={calculate}
          onPress={getJournals}
        />
      )}
      <LaunchingIssue
        show={showModel}
        onHide={() => setShowModel(false)}
        setPosts={() => setposts([])}
      />
    </>
  );
}

export default Assigned;
