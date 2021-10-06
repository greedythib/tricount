import '../style/addUser.css'
import { useState, useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
// import Buttons
import Button from '@mui/material/Button';
// import Icons
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import {Stack} from "@mui/material";
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';


function AddUser({activeUsers, updateActiveUsers}){

    // Retrieve list of users
    let users_list: string[] = [];
    for (let i = 0; i < activeUsers.length; i++){
        users_list.push(activeUsers[i].name)
    }
    // Init states
    const [newUser, setNewUser] = useState('');
    const [inputError, setInputError] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');

    // States and variables for loading button design
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer:any= React.useRef();
    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
            bgcolor: green[700],
            },
            }),
    };

    React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
    }, []);

    function handleNewUser(e) {
        setSuccess(false); // make button blue
        // check input validity
        if (users_list.includes(e.target.value)){
            setInputError(true);
            setErrorMessage('User already exists');
        }
        else if(e.target.value.includes('@')){
            setInputError(true)
            setErrorMessage('No email address nor special characters')
        }
        else{
            setInputError(false);
            setErrorMessage('');
            setNewUser(e.target.value);
        }
	}

	function addNewUser(e){
        if (newUser !== ''){
            if (!loading) {
                setSuccess(false);
                setLoading(true);
                timer.current = window.setTimeout(() => {
                    setSuccess(true);
                    setLoading(false);
                    }, 750);
            }
            // update parent state
            updateActiveUsers([...activeUsers, {'name': newUser, 'creditors':[]}]);
            setNewUser('');
            console.log('parent state updated');
        }
    }

    return(
        <div className='add-user-div'>
            <div className='add-user-header'>
                <span id = 'add-user-header-logo'> <PersonAddIcon/> </span>
                Add new user
            </div>
            {/*<div className = 'add-user-input'>*/}
                {/*<div id = 'add-user-input-field'>*/}
                    <Stack direction = 'row' spacing = {2} justifyContent = 'center' mt = {5}>
                    {/*<InputLabel htmlFor="input-with-icon-adornment">*/}
                    {/*    Please enter the name of the new user*/}
			        {/*</InputLabel>*/}
                    <TextField
                          placeholder='Enter new user here'
                          error = {inputError}
                          helperText = {ErrorMessage}
                          variant = 'standard'
                          value = {newUser}
                          // label = {newUser}
                          onChange={handleNewUser}
                          InputProps={{
                              startAdornment: <InputAdornment position="start">
                                  <PersonOutlineIcon />
                              </InputAdornment>,
                            }}
                    />

                {/*</div>*/}
                {/*<div id = 'add-user-submit-btn'>*/}
                    <Button
                        id = 'add-user-submit-btn'
                        variant="contained"
                        sx={buttonSx}
                        disabled={loading || inputError}
                        onClick={addNewUser}
                        endIcon={success? <CatchingPokemonIcon/> :<ControlPointIcon/>}
                    >
                        {success? `${newUser}  added`: 'Add'}
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                      />
                    )}
                    </Stack>
                {/*</div>*/}
            {/*</div>*/}
        </div>
    )
}

export default AddUser