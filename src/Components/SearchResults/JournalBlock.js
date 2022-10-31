import React, { useState } from "react";
import { Link } from "react-router-dom";
import { dateFormat } from "../../Utility/dateFormat";

const downloadFile = async (fileName) => {
  // await apiCalls.downloadJournal(row?.file).then((res) => console.log(res));
  var win = window.open(fileName.url, "_blank");
  win.focus();
};

function JournalBlock({ posts, loading }) {
  const [preview, setPreview] = useState(false);

  if (loading) {
    return <h2>loading...</h2>;
  }

  return posts.journal.map((post, index) => (
    <div key={index}>
      <div style={{ display: "flex" }}>
        <i className="fab fa-hive" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: -5,
            marginLeft: 10,
          }}
        >
          <Link to={`/viewArticle/${post.id}`} state={{ post: post }}>
            <span
              style={{
                color: "blue",
                width: "100%",
                display: "inline-block",
                textDecoration: "none",
              }}
            >
              {post.title}
            </span>
          </Link>
          <p style={{ fontWeight: "900", display: "inline" }}>{post.author}</p>
          <p style={{ marginTop: -10 }}>
            First Published : {dateFormat(post.publicationYear)}
          </p>

          <div style={{ display: "flex", marginTop: 5 }}>
            <i className="fas fa-chevron-right" />
            <p
              style={{ marginLeft: 5, marginTop: -5, cursor: "pointer" }}
              onClick={() => setPreview(!preview)}
            >
              Preview{" "}
            </p>
            <br />
            <p
              style={
                preview
                  ? {
                      marginTop: 20,
                      width: "40%",
                      backgroundColor: "#5f9ab450",
                      padding: 10,
                      borderRadius: 5,
                    }
                  : {
                      display: "none",
                      marginTop: 20,
                      width: "40%",
                      backgroundColor: "#5f9ab450",
                      padding: 10,
                      borderRadius: 5,
                    }
              }
            >
              Lorem Ipsum is that it has a more-or-less normal distribution of
              letters, as opposed to using 'Content here, content here', making
              it look like readable English. Many desktop publishing packages
              and web page editors now use Lorem Ipsum as their default model
              text, and a search for 'lorem ipsum' will uncover many web sites
              still in their infancy.
            </p>
          </div>
          <div
            style={{ display: "flex", marginTop: -5, cursor: "pointer" }}
            onClick={() => downloadFile(post.file)}
          >
            <i className="fas fa-download" style={{ marginLeft: 10 }} />
          </div>
        </div>
      </div>
      <hr style={{ width: "50%" }} />
    </div>
  ));
}

export default JournalBlock;
