import React, { useState, useEffect } from "react";
import apiCalls from "../../backend/apiCalls";
import "./Saved.css";
import date from "date-and-time";
import { dateFormat } from "../../Utility/dateFormat";

function SavedSearches({ id }) {
  const [SS, setSS] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSS = async () => {
    setLoading(true);
    const res = await apiCalls.getBookmarks_publisher(id);
    if (res.status === 200) {
      setSS(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id !== undefined) getSS();
  }, [id]);

  return (
    <>
      <h2 style={{ fontSize: "35px", fontWeight: "800", color: "#003951" }}>
        Bookmarks:
      </h2>

      <table className="ss">
        <tbody>
          <tr className="inverted">
            <th>Journal Name</th>
            <th>Author</th>
            <th>Issue Date</th>
          </tr>
          {SS.length > 0 &&
            SS.map((s, index) => (
              <tr className="inverted" key={index}>
                <td>{s.title}</td>
                <td>
                  {s.author.map((singleAuthor, i) =>
                    i !== 0 ? `, ${singleAuthor}` : singleAuthor
                  )}
                </td>
                <td>{dateFormat(s.publicationYear)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default SavedSearches;
