import '../style/deleteUser.css'
import * as React from "react";
import {useState} from "react";
import {activeUserProp, UserInterface, Props} from '../interfaces/interfaces'
// import Material UI icons
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Stack} from "@mui/material";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function DeleteUser({activeUsers, updateActiveUsers}: Props){

    const [text, setText] = useState('');
    // const [userToDelete, setUserToDelete] = useState<UserInterface>(activeUsers[0]);
    const [userToDelete, setUserToDelete] = useState<String>('Bartok');
    const [deleteCheckButton, setDeleteCheckButton] = useState(false);
    const [allowDeletion, setDeletionState] = useState(true);

    function handleButton(){
        console.log('click on button');
        // console.log(activeUsers[1]?._id);
        setText(JSON.stringify(activeUsers[0]));
        // setText(activeUsers[0]._id);
        fetch('/api/Bartok',{
                method: "GET",
            }
            )
            .then(
                function(res){
                    if (res.ok){return res.json()};
                }
            )
            .then(
                function(value){
                    setText(JSON.stringify(value));
                }
            );
    }
    function handleDeleteSelect(e: any){
        // console.log('Checking user before sending delete http request...');
        // console.log(e.target.value)
        // console.log(JSON.stringify(activeUsers.filter((user) => {return user.name === e.target.value})[0].creditors));
        if (activeUsers.filter((user) => {return user.name === e.target.value})[0].creditors.length !== 0){
            console.log(`${e.target.value} still has outstanding debt`);
            // TODO trigger warning & set error
            setDeletionState(false);
        }
        else{
            setDeletionState(true)
        }
        setUserToDelete(e.target.value);
    }
    function handleDeleteCheckButton(){
        deleteCheckButton? setDeleteCheckButton(false):setDeleteCheckButton(true);
    }
    function handleDeleteClick(){
        console.log('about to delete', userToDelete, '...')
        if (deleteCheckButton){
            console.log('Erase user from MongoDB');
            let api_endpoint = '/api/' + userToDelete;
            fetch(api_endpoint, {
                method: "DELETE"
            })
                .then(function(res){
                    if (res.ok){return res.json()}
                })
                .then(function(value){
                    console.log(value);
                })
        }
        // TODO add dialog window to confirm deletion
        let activeUsers_tmp = activeUsers.filter((user) => {return user.name !== userToDelete});
        console.log(activeUsers_tmp);
        updateActiveUsers([...activeUsers_tmp]);
    }

    return(
        <div className = 'delete-user'>
            <div className='delete-user-header'>
                <span id = 'delete-user-header-logo'> <PersonRemoveIcon/> </span>
                Delete User
            </div>

            <button onClick={handleButton}>
                Button
            </button>
            <p>{text}</p>

            <Stack direction = 'row' spacing = {2} justifyContent = 'center' mt = {5}>
                <TextField label = 'Select Payer to delete'
                           select
                           value = {userToDelete}
                           error = {!allowDeletion}
                           id = 'select-user-to-delete'
                           onChange = {handleDeleteSelect} >
                    {
                        activeUsers.map((user) => (
                            <MenuItem key = {user.id} value = {user.name}>
                                {user.name}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange = {handleDeleteCheckButton}
                            disabled = {!allowDeletion}
                        />
                    }
                    // onClick = {handleCheckBox}
                    label = {`Delete ${userToDelete} from database`}
                    labelPlacement = "end"
                />
                <IconButton aria-label="delete"
                            size="large"
                            onClick = {handleDeleteClick}
                            disabled = {!allowDeletion}
                >
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </Stack>
            {/*<br/>*/}
            {/*<Alert onClose={() => {}} severity = "warning">*/}
            {/*    {`${userToDelete} still has outstanding debts...`}*/}
            {/*</Alert>*/}
        </div>
    )
}

export default DeleteUser