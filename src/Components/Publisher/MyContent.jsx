import React, { useEffect, useState } from "react";

import apiCalls from "../../backend/apiCalls";
import ProjectBlock from "../Chiefeditor/ProjectBlock";
import PaginationItem from "../Shared/PaginationItem";

function MyContent({ id, trigger }) {
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
      const res = await apiCalls.getContent_publisher(
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

  useEffect(() => {
    getJournals({ cPage: currentPage });
    return () => setCurrentPage(1);
  }, [trigger, id]);

  return (
    <>
      <div style={{ marginTop: "5%" }} />
      {!loading ? (
        posts.map((post, index) => <ProjectBlock key={index} post={post} />)
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
    </>
  );
}

export default MyContent;
