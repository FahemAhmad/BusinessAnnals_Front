import React, { useState, useEffect } from "react";
import "./NewSubmission.css";
import { Dropdown, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Link
    to=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{
      color: "black",
      textDecoration: "none",
      margin: "0px 10px",
    }}
  >
    {children} &#x25bc;
  </Link>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

function FIlterDropDown({ title, data, setFunc, trigger }) {
  const [value, setValue] = useState(title);

  const handleSelect = (e) => {
    setFunc(() => {
      const id = data.filter((d) => d.firstName === e);
      return id[0].id !== undefined
        ? { id: id[0].id, firstName: id[0].firstName }
        : id[0].firstName;
    });
    setValue(e);
  };

  useEffect(() => {
    setValue(title);
  }, [trigger]);
  return (
    <>
      <div style={{ display: "flex", marginRight: 20 }}>
        <Dropdown className={"customDropdown"} onSelect={handleSelect}>
          <Dropdown.Toggle
            as={CustomToggle}
            id="dropdown-custom-components"
            style={{
              backgroundColor: "red",
            }}
          >
            {value}
          </Dropdown.Toggle>

          <Dropdown.Menu as={CustomMenu} className="dropDownMenu">
            {data &&
              data.map((singleItem, index) => (
                <Dropdown.Item
                  eventKey={singleItem.firstName}
                  style={{ color: "black" }}
                  key={index}
                >
                  {singleItem.firstName}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default FIlterDropDown;
