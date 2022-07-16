import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const path = useLocation().pathname;

  if (path.split("/")[1] === "user") return null;

  return (
    <div className="stickFooter">
      <div className="footer">
        <div className="upperRow">
          <div className="column line">
            <span className="bold">Explore Journals</span>
            <ul className="pages">
              <li>About</li>
              <li>Privacy Policy</li>
              <li>Terms of Use</li>
              <li>Contact US</li>
              <li>Help</li>
              <li>Accessibility</li>
            </ul>
          </div>
          <div className="column line">
            <span className="bold">Opportunities</span>
            <ul className="pages">
              <li>About</li>
              <li>Privacy Policy</li>
              <li>Terms of Use</li>
              <li>Contact US</li>
              <li>Help</li>
              <li>Accessibility</li>
            </ul>
          </div>
          <div className="column">
            <span className="bold">Resources</span>
            <ul className="pages">
              <li>About</li>
              <li>Privacy Policy</li>
              <li>Terms of Use</li>
              <li>Contact US</li>
              <li>Help</li>
              <li>Accessibility</li>
            </ul>
          </div>
        </div>
        <div className="bottomRow">
          <p className="leftText">
            Journals is part of ITHAKA, a not-for-profit organization helping
            the academic community use digital technologies to preserve the
            scholarly record and to advance research and teaching in sustainable
            ways.©2000-2021 ITHAKA. All Rights Reserved. JSTOR®, the JSTOR logo,
            JPASS®, Artstor®, Reveal Digital™ and ITHAKA® are registered
            trademarks of ITHAKA.
          </p>
          <div className="rightText">
            Journals
            <br />
            ISSN: 2158-2440
            <br />
            Online ISSN: 2158-2440
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
