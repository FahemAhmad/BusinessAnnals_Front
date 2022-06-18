import React, { useState } from "react";
import { useEffect } from "react";
import NewSubmitFields from "../Shared/NewSubmitFields";

import apiCalls from "../../backend/apiCalls";
import PaginationItem from "../Shared/PaginationItem";

function NewSubmission({ trigger, setTrigger }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [calculate, setCalculate] = useState(0);
  const postsPerPage = 5;

  //removing a post from the total number of posts
  const removePost = ({ id }) => {
    setPosts(() => posts.filter((item) => item.id !== id));
  };

  //adding a post to the total number of posts
  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  //getting all journals
  const getJournals = async ({ cPage: cp }) => {
    setLoading(true);

    const indexOfLastPost = (cp - 1) * postsPerPage;
    const res = await apiCalls.newJournalSubmission(
      postsPerPage,
      indexOfLastPost
    );

    if (res.status === 200) {
      setPosts(res.data.data);
      setCalculate(Math.ceil(res.data.count / postsPerPage));
    }
    setLoading(false);
  };

  useEffect(() => {
    getJournals({ cPage: currentPage });
    return () => setCurrentPage(1);
  }, []);

  return (
    <>
      {!loading ? (
        posts.map((post, index) => (
          <NewSubmitFields
            key={index}
            posts={post}
            removePost={removePost}
            addPost={addPost}
            setTrigger={setTrigger}
            trigger={trigger}
          />
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

export default NewSubmission;
