import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import httpService from "../backend/httpService";
import Cover from "../Components/Home/Cover";
import JournalBlock from "../Components/SearchResults/JournalBlock";
import PaginationItem from "../Components/Shared/PaginationItem";
import "./SearchResults.css";

function SearchResults() {
  const location = useLocation();
  const [trigger, setTrigger] = useState(false);
  const [posts, setposts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [calculate, setCalculate] = useState(0);

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
    const res = await httpService.get(
      `/journal/search?q=${
        location.state.data
      }&limit=${postsPerPage}&start=${indexOfLastPost}&select=${false}`
    );
    setposts(res.data);
    setCalculate(Math.ceil(res.data.count / postsPerPage));

    setLoading(false);
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchResults({ cPage: currentPage });
  }, [trigger]);

  return (
    <>
      <Cover setTrigger={setTrigger} trigger={trigger} />
      <div
        style={{ display: "flex", flexDirection: "column", margin: "2% 10%" }}
      >
        <h3>Search Results</h3>
        <div>
          <p>
            <span style={{ fontWeight: "bolder", fontSize: "20px" }}>
              Results:
            </span>
            {start + 1} – {last} of {posts.count} for{" "}
            <span style={{ fontSize: "20px", color: "blue" }}>
              {location.state.data}
            </span>
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

export default SearchResults;
