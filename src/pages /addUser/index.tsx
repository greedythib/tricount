import "../../utils/style/css/addUser.css";
import { useState, useEffect } from "react";
import { Props } from "../../interfaces/interfaces";
import AddUserDialog from "../../components/addUserDialog";
// import Material UI components
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
// import Buttons
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// import Icons
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import { Stack } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";

const uuidv4 = require("uuid/v4");
// const { ObjectId } = require("mongoose");
function AddUser({ activeUsers, updateActiveUsers }: Props) {
  // Retrieve list of users
  let users_list: string[] = [];
  for (let i = 0; i < activeUsers.length; i++) {
    users_list.push(activeUsers[i].name);
  }
  // Init states
  const [newUser, setNewUser] = useState("");
  const [inputError, setInputError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  // const [checkBox, setCheckBox] = useState(false);

  // States and variables for loading button design
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer: any = React.useRef();
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  function handleNewUser(e: any) {
    setSuccess(false); // make button blue
    // check input validity
    if (users_list.includes(e.target.value)) {
      setInputError(true);
      setErrorMessage("User already exists");
    } else if (e.target.value.includes("@")) {
      setInputError(true);
      setErrorMessage("No email address nor special characters");
    } else {
      setInputError(false);
      setErrorMessage("");
      setNewUser(e.target.value);
    }
  }

  // function addNewUser(e: any) {
  //   if (newUser !== "") {
  //     if (!loading) {
  //       setSuccess(false);
  //       setLoading(true);
  //       timer.current = window.setTimeout(() => {
  //         setSuccess(true);
  //         setLoading(false);
  //       }, 750);
  //     }
  //     // update parent state
  //     let new_user_id: string = uuidv4();
  //     let mongoID: string = "";
  //     // BACKEND w/ NODE
  //     // if (checkBox) {
  //     //   console.log(
  //     //     "send POST request to backend in order to add new user to MongoDB"
  //     //   );
  //     //   let user = {
  //     //     id: new_user_id,
  //     //     name: newUser,
  //     //     totalDebt: "0",
  //     //     debtors: [],
  //     //     creditors: [],
  //     //   };
  //     //   fetch("/api", {
  //     //     method: "POST",
  //     //     headers: {
  //     //       Accept: "application/json",
  //     //       "Content-Type": "application/json",
  //     //     },
  //     //     body: JSON.stringify(user),
  //     //   })
  //     //     .then(function (res) {
  //     //       if (res.ok) {
  //     //         return res.json();
  //     //       }
  //     //     })
  //     //     .then(function (value) {
  //     //       mongoID = value;
  //     //     });
  //     // }
  //
  //     let user = {
  //       _id: mongoID,
  //       id: new_user_id,
  //       name: newUser,
  //       totalDebt: "0",
  //       debtors: [],
  //       creditors: [],
  //     };
  //
  //     updateActiveUsers([
  //       ...activeUsers,
  //       {
  //         _id: mongoID,
  //         id: new_user_id,
  //         name: newUser,
  //         totalDebt: "0",
  //         creditors: [],
  //         debtors: [],
  //       },
  //     ]);
  //
  //     // localStorage.setItem("users", JSON.stringify(activeUsers));
  //     setNewUser("");
  //   }
  // }

  // function handleCheckBox(e: any) {
  //   checkBox ? setCheckBox(false) : setCheckBox(true);
  // }

  return (
    <div className="add-user-div">
      {/*<div className='add-user-header'>*/}
      {/*    <span id = 'add-user-header-logo'> <PersonAddIcon/> </span>*/}
      {/*    Add new user*/}
      {/*</div>*/}
      {/*<div className = 'add-user-input'>*/}
      {/*<div id = 'add-user-input-field'>*/}
      <Stack direction="row" spacing={2} justifyContent="center" mt={5}>
        <TextField
          label="Choose username"
          error={inputError}
          helperText={ErrorMessage}
          variant="standard"
          value={newUser}
          // label = {newUser}
          onChange={handleNewUser}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon />
              </InputAdornment>
            ),
          }}
        />

        <AddUserDialog
          newUser={newUser}
          activeUsers={activeUsers}
          updateActiveUsers={updateActiveUsers}
        />

        {/*<FormControlLabel*/}
        {/*  // value="false"*/}
        {/*  control={<Checkbox />}*/}
        {/*  onClick={handleCheckBox}*/}
        {/*  label={`Register ${newUser} on database`}*/}
        {/*  labelPlacement="end"*/}
        {/*/>*/}

        {/*<Button*/}
        {/*  id="add-user-submit-btn"*/}
        {/*  variant="contained"*/}
        {/*  sx={buttonSx}*/}
        {/*  disabled={loading || inputError}*/}
        {/*  onClick={addNewUser}*/}
        {/*  endIcon={success ? <CatchingPokemonIcon /> : <ControlPointIcon />}*/}
        {/*>*/}
        {/*  {success ? `${newUser}  added` : "Add"}*/}
        {/*</Button>*/}
        {/*{loading && (*/}
        {/*  <CircularProgress*/}
        {/*    size={24}*/}
        {/*    sx={{*/}
        {/*      color: green[500],*/}
        {/*      position: "absolute",*/}
        {/*      top: "50%",*/}
        {/*      left: "50%",*/}
        {/*      marginTop: "-12px",*/}
        {/*      marginLeft: "-12px",*/}
        {/*    }}*/}
        {/*  />*/}
        {/*)}*/}
      </Stack>
      {/*</div>*/}
      {/*</div>*/}
    </div>
  );
}

export default AddUser;
