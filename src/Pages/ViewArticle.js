import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cover from "../Components/Home/Cover";
import "./ViewArticle.css";
import apiCalls from "../backend/apiCalls";
import ToastSuccess from "../Components/Shared/ToastSuccess";
import { useRef } from "react";

function ViewArticle({ user }) {
  const [booked, setBooked] = useState(false);
  const location = useLocation();
  const { post } = location.state;
  const seeBook = useRef();

  const seeBookmarks = async () => {
    const res = await apiCalls.getBookmarks_User(user.user.userId);
    console.log(res);

    if (res.status === 200) {
      if (res.data.length > 0) {
        const response = res.data.filter((item) => item === post.id);
        if (response.length !== 0) {
          setBooked(true);
        }
      }
    }
  };

  seeBook.current = seeBookmarks;

  const addBookmark = async (pID) => {
    setBooked(true);
    const values = { id: user.user.userId, journalId: pID };
    const res = await apiCalls.addBookmark_publisher(values);

    if (res.status !== 200) {
      setBooked(false);
      ToastSuccess.ToastFailure("Couldnot add Bookmark");
    }
  };

  const removeBookmark = async (pID) => {
    setBooked(false);
    const values = { id: user.user.userId, journalId: pID };

    const res = await apiCalls.remBookmark_publisher(values);

    if (res.status !== 200) {
      setBooked(true);
      ToastSuccess.ToastFailure("Couldnot remove Bookmark");
    }
  };
  useEffect(() => {
    if (user !== undefined) {
      seeBook.current();
    }
  }, [user]);

  return (
    <div>
      <Cover />

      <div style={{ padding: "0% 10%" }}>
        <div
          style={{
            padding: "80px 0px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              onClick={async () => await apiCalls.downloadJournal(post.file)}
              style={{
                color: "blue",
                fontSize: 20,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Download PDF
            </p>
            {user && user.user.userType === "user" && (
              <p
                style={{ cursor: "pointer" }}
                onClick={() =>
                  booked ? removeBookmark(post.id) : addBookmark(post.id)
                }
              >
                {booked ? (
                  <i
                    className="fas fa-bookmark"
                    style={{ fontSize: 30, color: "#003951" }}
                  ></i>
                ) : (
                  <i
                    className="far fa-bookmark"
                    style={{ fontSize: 30, color: "#003951" }}
                  ></i>
                )}
              </p>
            )}
          </div>
          <p className="articleTitle">{post.title}</p>
          <span className="spanBlue">
            {post.author.map((singleAuthor, i) =>
              i !== 0 ? `, ${singleAuthor}` : singleAuthor
            )}
          </span>
          <span className="spanGray">
            First Published : {post.publicationYear} | {post.category} Article
          </span>
          <span className="spanBlue">
            Issue Information{" "}
            <i className="fas fa-angle-down" style={{ paddingTop: 10 }}></i>
          </span>
          <p className="articleInfo">
            Volume: {post.issueYear.issueDetails.Volume} issue:{" "}
            {post.issueYear.issueNo}
            <br />
            Issue published: {post.issueYear.issueDetails.IssueStartYear}-
            {post.issueYear.issueDetails.IssueEndYear} (Month :{" "}
            {post.issueYear.issueDetails.IssueStartMonth}-
            {post.issueYear.issueDetails.IssueEndMonth}) <br /> Supervisor:{" "}
            {post.supervisor}
          </p>
          <p className="articleHead">Corresponding Author :</p>
          <p className="authorInfo">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            assumenda aliquam hic corrupti labore incidunt explicabo magnam,
            praesentium placeat delectus deserunt exercitationem, ad perferendis
            atque eius pariatur voluptate magni vero! Quis obcaecati quidem nisi
            ut doloremque! Molestiae provident ab consequatur dignissimos ipsa
            veritatis quis, enim cupiditate voluptate, eius dicta et! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Quae corrupti
            esse necessitatibus exercitationem beatae quaerat adipisci libero
            eum ex, molestias at omnis voluptates quis error eligendi nemo nihil
            facilis ut. Velit non dolores natus. Repellendus nam, neque deserunt
            deleniti aspernatur commodi quo eos consequatur itaque tempora
            voluptatem error quibusdam fuga?
          </p>
          <hr />
          <p className="articleHead">Abstract :</p>
          <p className="abstract">{post.abstract}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewArticle;
