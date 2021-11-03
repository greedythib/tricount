import { forwardRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  userProp,
  newUserProps,
  authenticateDialogProps,
} from "../interfaces/interfaces";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import * as React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { green } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
// SOLANA
import * as solanaWeb3 from "@solana/web3.js";

// TODO: add loading circle
export default function AddUserDialog({
  newUser,
  activeUsers,
  updateActiveUsers,
}: authenticateDialogProps) {
  const [open, setOpen] = useState(false);
  const [newUserPubkey, setNewUserPubkey] = useState("");
  const [inputError, setInputError] = useState(true);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handlePubkeyInput(e: any) {
    // TODO: add more conditions to check user input
    setSuccess(false);
    if (e.target.value.length === 44) {
      setInputError(false);
    } else {
      setInputError(true);
    }
    // TODO: check if account exists
    setNewUserPubkey(e.target.value);
  }

  async function handleAddUser() {
    if (newUser !== "") {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        // TODO: establish connection (prop? context?)
        console.log("Connecting to Solana cluster...");
        const rpcUrl = "http://localhost:8899";
        let connection = new solanaWeb3.Connection(rpcUrl, "confirmed");
        const version = await connection.getVersion();
        console.log("Connection to cluster established:", rpcUrl, version);
        console.log(
          "Checking if pubkey",
          newUserPubkey,
          "is associated to an existing account..."
        );
        try {
          let PubKey_input: solanaWeb3.PublicKey =
            await new solanaWeb3.PublicKey(newUserPubkey);
          // console.log(PubKey_input);
          let account = await connection.getAccountInfo(PubKey_input);
          // console.log(account);
          if (account === null) {
            alert("pubkey does not match any account on cluster");
            timer.current = window.setTimeout(() => {
              setLoading(false);
            }, 750);
          } else {
            // alert("ADDRESS VALID");
            // console.log("adding new user to local browser storage");
            updateActiveUsers([
              ...activeUsers,
              {
                pubkey: newUserPubkey,
                name: newUser,
                totalDebt: "0",
                creditors: [],
                debtors: [],
              },
            ]);
            timer.current = window.setTimeout(() => {
              setSuccess(true);
              setLoading(false);
            }, 750);
          }

          // setNewUserPubkey("");
        } catch (err) {
          setSuccess(false);
          setInputError(true);
          setLoading(false);
          alert(err);
        }
      }
      // TODO: pass activeUsers and updateActiveUsers as props
      // TODO: update activeUsers
    }
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
              onChange={handlePubkeyInput}
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
              sx={buttonSx}
              disabled={loading || inputError}
              // disabled={inputError}
              onClick={handleAddUser}
              endIcon={<ControlPointIcon />}
            >
              {success ? "Added" : "Add"}
              {/*{!success }*/}
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
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
