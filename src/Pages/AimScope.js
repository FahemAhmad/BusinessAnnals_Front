import React from "react";
import Cover from "../Components/Home/Cover";
import IconButton from "../Components/Shared/IconButton";
import SidePanel from "../Components/Shared/SidePanel";

function AimScope() {
  return (
    <>
      <Cover />
      <div style={{ padding: "0% 10%" }}>
        <div
          style={{
            padding: "80px 0px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex" }}>
            <i
              className="fas fa-crosshairs"
              style={{ fontSize: 60, color: "#003951" }}
            />
            <p
              style={{
                fontSize: 50,
                color: "#003951",
                textDecoration: "underline",
                marginLeft: 20,
              }}
            >
              Aim & Scope
            </p>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 4 }}>
              <p
                style={{
                  marginTop: 20,
                  color: "#4f4f4f",
                  textAlign: "center",
                  width: "90%",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lectus quam id leo in vitae turpis massa sed elementum. Bibendum
                est ultricies integer quis auctor elit sed vulputate. In nibh
                mauris cursus mattis. Sed id semper risus in hendrerit gravida
                rutrum. Sit amet risus nullam eget felis eget nunc lobortis.
                Quis risus sed vulputate odio ut enim blandit volutpat maecenas.
                In tellus integer feugiat scelerisque varius morbi enim nunc.
                Purus faucibus ornare suspendisse sed. Fames ac turpis egestas
                sed. Scelerisque fermentum dui faucibus in ornare quam viverra
                orci sagittis. Mi in nulla posuere sollicitudin aliquam ultrices
                sagittis orci a. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Lectus quam id leo in vitae turpis massa
                sed elementum. Bibendum est ultricies integer quis auctor elit
                sed vulputate. In nibh mauris cursus mattis. Sed id semper risus
                in hendrerit gravida rutrum. Sit amet risus nullam eget felis
                eget nunc lobortis. Quis risus sed vulputate odio ut enim
                blandit volutpat maecenas. In tellus integer feugiat scelerisque
                varius morbi enim nunc. Purus faucibus ornare suspendisse sed.
                Fames ac turpis egestas sed. Scelerisque fermentum dui faucibus
                in ornare quam viverra orci sagittis. Mi in nulla posuere
                sollicitudin aliquam ultrices sagittis orci a.
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <SidePanel />
            </div>
          </div>
          <hr style={{ marginTop: "5%" }} />

          <p
            style={{
              fontSize: 40,
              color: "#003951",
              fontWeight: "100",
              marginLeft: 20,
            }}
          >
            More About this Journal...
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "50%",
              }}
            >
              <IconButton title={"Editorial Board"} icon={"fas fa-users"} />
              <IconButton title={"Submit Paper"} icon={"fas fa-scroll"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AimScope;
