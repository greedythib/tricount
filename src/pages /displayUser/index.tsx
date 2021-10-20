import {useEffect, useState} from "react";
import {activeUserProp, userProp, UserInterface} from '../../interfaces/interfaces'
import AlertDialogSlide from '../../components/slideDialog'
import '../../utils/style/css/displayUser.css'
// ----- Import MaterialUI components -----
import {Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";

function DisplayUser({activeUsers}: activeUserProp) {

    let initUser: UserInterface = {_id: '', id : '', name: '', totalCredit: '', creditors : [], debtors: []};
    const [userToDisplay, setUserToDisplay] = useState<UserInterface>(initUser);

    return(
        <div className= 'delete-user'>
            <Stack direction = 'row' spacing = {2} justifyContent = 'center' mt = {5}>
                <TextField label = 'Select User to display info'
                           select
                           value = {userToDisplay.name}
                           color = 'info'
                           // error = {!allowDeletion}
                           id = 'select-user-to-display'
                           onChange = {(e) => {
                               setUserToDisplay(activeUsers.filter(
                                   (user) => {return user.name === e.target.value})[0])
                           }}
                >
                    {
                        activeUsers.map((user) => (
                            <MenuItem key = {user.id} value = {user.name}>
                                {user.name}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <AlertDialogSlide user = {userToDisplay} />
            </Stack>
        </div>
    )
};

export default DisplayUser