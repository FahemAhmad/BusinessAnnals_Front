import "./Adminpanel.css";
import Logo from "../../Assets/logo.png";
import Logo_Small from "../../Assets/logo_small.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = ({ navOptions }) => {
  const [open, setOpen] = useState(true);

  const toggler = () => {
    setOpen(!open);
  };

  return (
    <>
      <nav className="sidebar" style={open === false ? { width: 88 } : {}}>
        <header>
          <div className="image-text">
            <span className="image">
              <img
                src={open === false ? Logo_Small : Logo}
                alt=""
                style={open ? { height: 100 } : { height: 80 }}
              />
            </span>
          </div>
          <ArrowForwardIosIcon className="toggle" onClick={() => toggler()} />
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              {navOptions?.map((navItem, index) => (
                <div key={index}>
                  {navItem?.name && open && (
                    <p className="category">{navItem?.name}</p>
                  )}
                  <li
                    className="nav-link"
                    style={open === false ? { padding: 0 } : {}}
                  >
                    {navItem?.icon}

                    <span
                      className="text nav-text"
                      style={open ? { display: "inline" } : { display: "none" }}
                    >
                      {navItem?.title}
                    </span>
                  </li>
                </div>
              ))}
              <li
                className="nav-link"
                style={
                  open === false
                    ? { padding: 0, backgroundColor: "black", color: "white" }
                    : { backgroundColor: "black", color: "white" }
                }
              >
                <LogoutIcon className="icon" />
                <span
                  className="text nav-text"
                  style={open ? { display: "inline" } : { display: "none" }}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
