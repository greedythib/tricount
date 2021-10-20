import '../../utils/style/css/deleteUser.css'
import * as React from "react";
import {useState} from "react";
import {Props} from '../../interfaces/interfaces'

// import Material UI icons
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
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

    //
    const [text, setText] = useState('');
    //
    const [userToDelete, setUserToDelete] = useState<String>('Bartok');
    const [deleteCheckButton, setDeleteCheckButton] = useState(false);
    const [allowDeletion, setDeletionState] = useState(true);
    const [open, setOpen] = useState(false);

    function handleButton(){
        console.log('click on button');
        console.log(activeUsers[0].totalCredit);
        // setText(JSON.stringify(activeUsers[0]));
        // setText(activeUsers[0]._id);
        let updatedUser = {
            id: activeUsers[0].id,
            name: activeUsers[0].name,
            totalCredit: 666,
            creditors: activeUsers[0].creditors,
            debtors: activeUsers[0].debtors,
        };
        let userToDeleteMongoID:string = activeUsers[0]._id;
        //     = activeUsers.filter(
        //     (user) => {return user.name === 'Bartok'}
        // )[0]._id;
        fetch('/api/' + userToDeleteMongoID,{
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                            },
                body: JSON.stringify(updatedUser)
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
            )
            .catch((error) => setText(error));
    }
    function handleDeleteSelect(e: any){
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
        let userToDeleteMongoID:string = activeUsers.filter(
            (user) => {return user.name === userToDelete}
        )[0]._id;
        if (deleteCheckButton){
            console.log('Erase user from MongoDB');
            let api_endpoint = '/api/' + userToDeleteMongoID;
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
            {/*<div className='delete-user-header'>*/}
            {/*    <span id = 'delete-user-header-logo'> <PersonRemoveIcon/> </span>*/}
            {/*    Delete User*/}
            {/*</div>*/}

            {/*<button onClick={handleButton}>*/}
            {/*    Button*/}
            {/*</button>*/}
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
            <br/>
            <Collapse in={!allowDeletion}>
                <Alert
                    severity = "warning"
                    sx={{ mb: 2 }}
                >
                    {`Cannot delete ${userToDelete} because he/she/it has outstanding debts!`}
                </Alert>
            </Collapse>
        </div>
    )
}

export default DeleteUser