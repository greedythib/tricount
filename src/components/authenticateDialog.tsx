import { forwardRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { userProp } from "../interfaces/interfaces";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import * as React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";

interface newUserProp {
  newUser: String;
}

export default function AuthenticateDialog({ newUser }: newUserProp) {
  const [open, setOpen] = useState(false);
  const [newUserPubkey, setNewUserPubkey] = useState("");
  const [inputError, setInputError] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleNewUserPubkey(e: any) {
    // TODO: check user input
    // TODO: check if account exists
    setInputError(false);
    setNewUserPubkey(e.target.value);
  }

  function handleAddUser() {
    // TODO add user
  }

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        id="display-user-btn"
        disabled={newUser ? false : true}
        endIcon={<ControlPointIcon />}
      >
        Confirm
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          Which existing account would you like to use for {newUser}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Valid Pubkey required"
              error={inputError}
              helperText={
                inputError ? "Solana account pubkey must be valid" : null
              }
              variant="standard"
              // value={newUser}
              // label = {newUser}
              onChange={handleNewUserPubkey}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FingerprintIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              id="add-user-submit-btn"
              variant="contained"
              // sx={buttonSx}
              // disabled={loading || inputError}
              disabled={inputError}
              onClick={handleAddUser}
              endIcon={<ControlPointIcon />}
            >
              {/*{success ? `${newUser}  added` : "Add"}*/}
              Add
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Close </Button>
          {/*<Button onClick={handleClose}>Agree</Button>*/}
        </DialogActions>
      </Dialog>
    </div>
  );
}
