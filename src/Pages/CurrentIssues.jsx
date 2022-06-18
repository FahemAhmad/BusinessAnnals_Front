import React, { useState } from "react";
import { useEffect } from "react";
import apiCalls from "../backend/apiCalls";
import Cover from "../Components/Home/Cover";
import JournalBlock from "../Components/SearchResults/JournalBlock";
import PaginationItem from "../Components/Shared/PaginationItem";
import "./SearchResults.css";
import { useParams } from "react-router-dom";

function CurrentIssues() {
  const [trigger, setTrigger] = useState(false);
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [calculate, setCalculate] = useState(0);

  const { volume } = useParams();

  const postsPerPage = 5;

  //start of page
  let start = currentPage - 1;
  start = start * postsPerPage;

  //last page
  let last = currentPage * postsPerPage;
  last =
    last > posts.count
      ? start + parseInt(posts.count % postsPerPage)
      : start + postsPerPage;

  //total Pages
  const fetchResults = async ({ cPage: cp }) => {
    setLoading(true);

    const indexOfLastPost = (cp - 1) * postsPerPage;
    const res = await apiCalls.getCurrentIssues(
      volume,
      postsPerPage,
      indexOfLastPost
    );

    if (res.status === 200) {
      setposts(res.data);
      setCalculate(Math.ceil(res.data.count / postsPerPage));
    }

    setLoading(false);
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchResults({ cPage: currentPage });
  }, []);

  return (
    <>
      <Cover setTrigger={setTrigger} trigger={trigger} />
      <div
        style={{ display: "flex", flexDirection: "column", margin: "2% 10%" }}
      >
        <h3>
          Volume : {volume} <h4>Total Issues : {calculate}</h4>
        </h3>
        <div>
          <p>
            <span style={{ fontWeight: "bolder", fontSize: "20px" }}>
              Results:
            </span>
            {posts.count === 0
              ? `${start} – ${last} of ${posts.count}`
              : `${start + 1} – ${last} of ${posts.count}`}
          </p>
        </div>
        <hr />
        <div style={{ marginTop: "2%" }} />

        <JournalBlock posts={posts} loading={loading} />
      </div>
      {!loading && posts !== undefined && (
        <PaginationItem
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={calculate}
          onPress={fetchResults}
        />
      )}
    </>
  );
}

export default CurrentIssues;
