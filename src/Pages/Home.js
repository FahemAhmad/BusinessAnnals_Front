import React from "react";
import Cover from "../Components/Home/Cover";
import InfoSection from "../Components/Home/InfoSection";
import MyCarasoul from "../Components/Home/MyCarasoul";
import TabSection from "../Components/Home/TabSection";
import SidePanel from "../Components/Shared/SidePanel";
import "./Home.css";

function Home() {
  return (
    <>
      <Cover />
      <div className="sides">
        <div className="arrangement">
          <div style={{ flex: 5 }}>
            <MyCarasoul />
          </div>
          <div style={{ flex: 1 }}>
            <SidePanel />
          </div>
        </div>
        <InfoSection />
        <TabSection />
      </div>
    </>
  );
}

export default Home;
