import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "./DropDown.css";

const DropDown = ({ dropDownOptions, dropDownState }) => {
  const [value, setValue] = dropDownState;

  const handleSelect = (e) => {
    console.log(e);
    setValue(e);
  };
  return (
    <DropdownButton
      title={value}
      id="dropdown-menu-align-right"
      onSelect={handleSelect}
    >
      {dropDownOptions.map((option) => {
        return (
          <Dropdown.Item
            key={option}
            onClick={(e) => {
              console.log(e.target.parentNode);
            }}
            eventKey={option}
          >
            {option}
          </Dropdown.Item>
        );
      })}
    </DropdownButton>
  );
};

export default DropDown;
