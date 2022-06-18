import React, { useEffect, useState } from "react";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Block from "./Block";
import { useMediaQuery } from "react-responsive";
import api from "../../backend/apiCalls";
import "../Shared/shared.css";

function TabSection() {
  const [article, setArticle] = useState([]);

  async function getTopThree() {
    const { data } = await api.bestThreeJournals();
    setArticle(data);
  }

  useEffect(() => {
    getTopThree();
  }, []);

  const isMobile = useMediaQuery({
    query: "(max-width: 480px)",
  });

  return (
    <>
      <Tabs
        style={{
          backgroundColor: "#d6f2ff",
          border: "1px solid black",
          marginBottom: 80,
        }}
      >
        <TabList
          style={
            isMobile
              ? { display: "flex", marginTop: -2, fontSize: "0.75rem" }
              : { display: "flex", marginTop: -2, fontSize: "1.2rem" }
          }
        >
          <Tab
            style={{
              flex: 1,
              backgroundColor: "black",
              color: "white",
              padding: "15px 0px",
              textAlign: "center",
              borderRadius: "0px",
              borderColor: "black",
            }}
          >
            Latest Articles
          </Tab>
          <Tab
            disabled
            style={{
              flex: 1,
              backgroundColor: "#5f9ab4",
              color: "#d4d4d4",
              padding: "15px 0px",
              textAlign: "center",
              borderRadius: "0px",

              border: "1px solid black",
            }}
          >
            Most Read
          </Tab>
          <Tab
            disabled
            style={{
              flex: 1,
              backgroundColor: "#5f9ab4",
              color: "#d4d4d4",
              padding: "15px 0px",
              textAlign: "center",
              borderRadius: "0px",
              border: "1px solid black",
            }}
          >
            Most Cited
          </Tab>
        </TabList>

        <TabPanel
          style={
            isMobile
              ? {
                  display: "flex",
                  flexDirection: "column",

                  alignItems: "center",
                }
              : { display: "flex", flexDirection: "row" }
          }
        >
          {article &&
            article.map((singleArticle, index) => (
              <Block
                key={index}
                title={singleArticle.title}
                authors={singleArticle.author}
                date={singleArticle.publicationYear}
              />
            ))}
        </TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
    </>
  );
}

export default TabSection;
