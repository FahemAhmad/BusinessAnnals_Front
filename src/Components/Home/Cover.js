import React, { useState } from "react";
import "./Cover.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import httpService from "../../backend/httpService";
import { Link, useNavigate } from "react-router-dom";

function Cover({ setTrigger, trigger }) {
  const navigate = useNavigate();

  const [data, setdata] = useState([]);
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);

  const moveToSearchResults = (e) => {
    if (e.key === "Enter") {
      setdata([]);
      if (setTrigger !== undefined) {
        setTrigger(!trigger);
      }

      setValue("");
      navigate("/searchResult", {
        state: {
          data: value,
          count: count,
        },
      });
    }
  };

  let cancelToken;
  const handleSearchChange = (e) => {
    const q = e.target.value;
    const searchTerm = q;
    setValue(q);

    if (searchTerm.length >= 3) {
      searchCall(searchTerm, cancelToken);
    }
  };

  //search call
  const searchCall = async (searchTerm, cancelToken) => {
    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
      await cancelToken.cancel("Operation canceled due to new request.");
    }

    //Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();
    const results = await httpService.get(
      `/journal/search?q=${searchTerm}&limit=5&start=0&select=true`,
      {
        cancelToken: cancelToken.token,
      }
    );

    setCount(results.data.count);
    setdata(results.data.journal);
  };

  return (
    <div className="cover">
      <div className="searchResult">
        <h2 className="title">Your gateway to world class research Journals</h2>
        <div className="searchField">
          <input
            type={"text"}
            className="field"
            placeholder="Search"
            onChange={handleSearchChange}
            value={value}
            onKeyDown={moveToSearchResults}
          />
          <Button
            type="submit"
            variant="dark"
            style={{
              backgroundColor: "#c4c4c4",
              cursor: "pointer",
              marginRight: "1%",
              border: "none",
              borderRadius: 0,
              borderTopRightRadius: 3,
              borderBottomRightRadius: 3,
            }}
          >
            <i
              className="fas fa-search"
              style={{ color: "black", marginRight: 10, marginLeft: 10 }}
              onClick={() => moveToSearchResults({ key: "Enter" })}
            />
          </Button>
        </div>
        {data.length > 0 && value !== "" ? (
          <div>
            <ul
              style={{
                position: "absolute",
                listStyle: "none",
                backgroundColor: "#c4c4c4",
                borderRadius: 3,
                borderTopLeftRadius: 0,
                marginTop: 1,
                zIndex: 1000,
                paddingRight: "2.5%",
              }}
            >
              {data.slice(0, 5).map(
                (item, index) => (
                  console.log(item),
                  (
                    <Link
                      to={`/viewArticle/${item.id}`}
                      state={{ post: item }}
                      style={{ textDecoration: "none", color: "black" }}
                      key={index}
                      onClick={() => setdata([])}
                    >
                      <li className="listItem">
                        <h2
                          style={{
                            fontWeight: "900",
                            marginLeft: 10,
                          }}
                        >
                          Title:{" "}
                        </h2>
                        <h6
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "5%",
                          }}
                        >
                          {item.title}
                        </h6>
                      </li>
                    </Link>
                  )
                )
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Cover;
