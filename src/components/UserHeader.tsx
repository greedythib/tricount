import "../utils/style/css/userTabsHeader.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import MaterialUI icons
import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import * as React from "react";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useState } from "react";

interface styledHeaderProps {
  readonly isSelected: boolean;
}

// FIXME: pass props to styled components -> https://styled-components.com/docs/api#typescript
const StyledHeader = styled.div<styledHeaderProps>`
  color: #4e44ce;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  /*border-bottom: solid .2px darkblue;*/
  /*border-right: solid .5px lightgray;*/
  border-radius: 5px;
  padding: 0px 15px 0px 15px;
  background-color: ${(props) =>
    props.isSelected ? String("lightgray") : String("white")};
  &:hover {
    //cursor: pointer;
    background-color: lightgray;
  }
`;

function UserHeader() {
  const [isTab1Selected, setTab1Selection] = useState(true);
  const [isTab2Selected, setTab2Selection] = useState(false);
  const [isTab3Selected, setTab3Selection] = useState(false);
  return (
    <div className="user-tabs">
      <Link
        to="/"
        className="router-link"
        onClick={() => {
          setTab1Selection(true);
          setTab2Selection(false);
          setTab3Selection(false);
        }}
      >
        <StyledHeader id="first-header" isSelected={isTab1Selected}>
          <span className="user-header-logo">
            {" "}
            <PersonAddIcon />{" "}
          </span>
          Add new user
        </StyledHeader>
      </Link>
      <Link
        to="/delete-user"
        className="router-link"
        onClick={() => {
          setTab2Selection(true);
          setTab1Selection(false);
          setTab3Selection(false);
        }}
      >
        <StyledHeader isSelected={isTab2Selected}>
          <span className="user-header-logo">
            {" "}
            <PersonRemoveIcon />{" "}
          </span>
          Delete User
        </StyledHeader>
      </Link>

      <Link
        to="/display-user"
        className="router-link"
        onClick={() => {
          setTab3Selection(true);
          setTab1Selection(false);
          setTab2Selection(false);
        }}
      >
        <StyledHeader isSelected={isTab3Selected}>
          <span className="user-header-logo">
            {" "}
            <AssignmentIndIcon />{" "}
          </span>
          Display User
        </StyledHeader>
      </Link>
    </div>
  );
}

export default UserHeader;
