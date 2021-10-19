import '../style/userTabsHeader.css'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
// import MaterialUI icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import * as React from "react";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {useState} from "react";

interface styledProp{
    isSelected: Boolean
}

// TODO: pass props to styled components -> https://styled-components.com/docs/api#typescript
const StyledHeader = styled.div`
  color:darkblue;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  /*border-bottom: solid .2px darkblue;*/
  /*border-right: solid .5px lightgray;*/
  border-radius: 5px;
  padding: 0px 15px 0px 15px;
  &:hover{
    //cursor: pointer;
    background-color: lightgray;
  }
`

function UserHeader(){
    const [isTab1, updateIsTab1] = useState<Boolean>(false)
    return(
        <div className='user-tabs'>
            <Link to = '/' className = 'router-link'>
                <StyledHeader id = "first-header">
                    <span className = 'user-header-logo'> <PersonAddIcon/> </span>
                     Add new user
                </StyledHeader>
            </Link>
            <Link to = '/delete-user' className = 'router-link'>
                <StyledHeader>
                    <span className = 'user-header-logo'> <PersonRemoveIcon/> </span>
                     Delete User
                </StyledHeader>
            </Link>

            <Link to = '/display-user' className = 'router-link'>
                <StyledHeader>
                    <span className = 'user-header-logo'> <AssignmentIndIcon/> </span>
                    Display User
                </StyledHeader>
            </Link>
        </div>
    )
}

export default UserHeader