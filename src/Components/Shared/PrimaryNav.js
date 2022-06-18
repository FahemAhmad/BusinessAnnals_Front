import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import "./PrimryNav.css";
import Logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";

function PrimryNav({ user }) {
  const [expanded, setExpanded] = useState(false);
  let address = "";

  if (user !== undefined) {
    const cat =
      user.user.userType === "user" ? "publisher" : user.user.userType;
    address = `/user/${cat}/${user.user.userId}`;
  }

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  return (
    <>
      <Navbar
        bg="journalPrimary"
        variant="dark"
        sticky="top"
        expand="md"
        collapseOnSelect
        style={{ maxHeight: 90 }}
        expanded={expanded}
      >
        <Navbar.Brand style={{ paddingLeft: "5%" }}>
          <Link to="/">
            <img src={Logo} className="logo" alt="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          style={{ marginRight: "5%" }}
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse
          style={{
            textAlign: "center",
            padding: "50px 0",
          }}
        >
          <Nav className="ms-auto" style={{ paddingRight: "1%" }}>
            <NavDropdown
              title="Browse"
              id="basic-nav-dropdown"
              menuVariant="jp"
              show={show1}
              onMouseEnter={() => setShow1(true)}
              onMouseLeave={() => setShow1(false)}
              style={{ height: "100%" }}
            >
              <NavDropdown.Item
                as={Link}
                to="/allIssues"
                className="dropdownItem"
              >
                All Issues
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Last Issue</NavDropdown.Item>
              <NavDropdown.Item>Browse by Year</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Resources"
              id="basic-nav-dropdown"
              menuVariant="jp"
              show={show2}
              onMouseEnter={() => setShow2(true)}
              onMouseLeave={() => setShow2(false)}
            >
              <NavDropdown.Item
                as={Link}
                to="/submitpaper"
                className="dropdownItem"
              >
                Submit Paper
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/submissionGuide">
                Submission Guidelines
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/editorilBoard">
                Editorial Board
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Journal Info"
              id="basic-nav-dropdown"
              menuVariant="jp"
              show={show3}
              onMouseEnter={() => setShow3(true)}
              onMouseLeave={() => setShow3(false)}
            >
              <NavDropdown.Item
                as={Link}
                to="/aboutJournal"
                className="dropdownItem"
              >
                About Journal
              </NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item as={Link} to="/aimScope">
                Aim & Scope
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/description">
                Journal Description
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Navbar.Text
            style={{
              borderLeft: "2px solid white",
              paddingLeft: "3%",
              marginRight: "2%",
            }}
          >
            Access Options :
          </Navbar.Text>

          {!user && (
            <>
              <Button
                as={Link}
                to="/login"
                variant="dark"
                style={{
                  backgroundColor: "black",
                  cursor: "pointer",
                  marginRight: "1%",
                  color: "white",
                  textDecoration: "none",
                }}
                className="btnResize"
                onClick={() => setExpanded(false)}
              >
                <i className="fas fa-user" style={{ marginRight: 2 }} /> Sign In
              </Button>

              <Button
                variant="dark"
                style={{
                  backgroundColor: "black",
                  cursor: "pointer",
                  marginRight: "1%",
                }}
              >
                <i className="fas fa-university" style={{ marginRight: 2 }} />
                Institue
              </Button>
            </>
          )}
          {user && (
            <>
              <Button
                as={Link}
                variant="dark"
                to={address}
                style={{
                  backgroundColor: "#D6F2FF",
                  cursor: "pointer",
                  marginRight: "1%",
                  fontWeight: "800",
                  color: "#003951",
                  textDecoration: "none",
                }}
                className="btnResize"
                onClick={() => setExpanded(false)}
              >
                {user.user.name}
              </Button>
              <Button
                as={Link}
                to="/logout"
                variant="dark"
                style={{
                  backgroundColor: "#D6F2FF",
                  cursor: "pointer",
                  marginRight: "1%",
                  fontWeight: "800",
                  color: "#003951",
                  textDecoration: "none",
                }}
                className="btnResize"
                onClick={() => setExpanded(false)}
              >
                Log out
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default PrimryNav;
