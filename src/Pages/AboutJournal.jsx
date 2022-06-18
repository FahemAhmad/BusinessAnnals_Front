import React from "react";
import Cover from "../Components/Home/Cover";
import SidePanel from "../Components/Shared/SidePanel";
import "../Components/Shared/form.css";

function AboutJournal() {
  return (
    <>
      <Cover />
      <div style={{ padding: "0% 10%" }}>
        <div
          style={{
            padding: "80px 0px",
            display: "flex",
          }}
        >
          <div style={{ flex: 5 }}>
            <h2 className="mainHeading">About Us</h2>
            <p style={{ width: "70%", marginTop: "3%" }}>
              SAGE Open is an open access publication from SAGE. It publishes
              peer-reviewed, original research and review articles in an
              interactive, open access format. Articles span the full spectrum
              of the social and behavioral sciences and the humanities.
              <br /> SAGE Open seeks to be the world's premier open access
              outlet for academic research. As such, unlike traditional
              journals, SAGE Open does not limit content due to page budgets or
              thematic significance. This journal is a member of the Committee
              on Publication Ethics (COPE)
            </p>
            <p>
              <span style={{ fontWeight: "bolder" }}>
                Why publish in SAGE Open:
              </span>
              <br />
              <ol style={{ width: "85%" }}>
                <li>
                  Global distribution of your research via the award-winning
                  SAGE Journals online platform, including enhanced online
                  features such as: public usage metrics, subject categories,
                  and article ranking and recommendations.
                </li>
                <li>
                  Professional copyediting and typesetting of your article will
                  ensure quality.
                </li>
                <li> $800 author acceptance fee. </li>
                <li>Continuous-publication online.</li>
              </ol>

              <span style={{ fontWeight: "bolder" }}>
                Who should submit manuscripts to SAGE Open?
              </span>
              <br />
              <ul>
                <li>
                  Authors who want their articles to receive free, broad, and
                  global distribution on a powerful, highly discoverable
                  publishing platform
                </li>
                <li>
                  Authors who want their articles branded and marketed by a
                  world-leading social science publisher
                </li>
                <li>
                  Authors who want or need their articles to be open access
                  because of university or government mandates
                </li>
                <li>
                  Authors who want their articles to receive quality reviews and
                  efficient production
                </li>
              </ul>
            </p>
            <p>
              Manuscript submissions will be handled online through SAGE Track,
              SAGE's web-based peer review and submission system, powered by
              ScholarOne ManuscriptsTM. Visit
              http://mc.manuscriptcentral.com/sageopen for full manuscript
              submission guidelines.
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <SidePanel />
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutJournal;
