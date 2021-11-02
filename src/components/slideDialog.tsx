import { forwardRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { userProp } from "../interfaces/interfaces";
import Slide from "@mui/material/Slide";

// const Transition = forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

export default function AlertDialogSlide({ user }: userProp) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // TODO: pass to child element
  const hasCreditorsItem = (
    <div>
      <p> {user.name} owes money to: </p>
      <ul>
        {user.creditors.map((creditor, index) => (
          <li key={index}>
            {" "}
            {creditor.name} ({creditor.value} SOL){" "}
          </li>
        ))}
      </ul>
    </div>
  );
  const noCreditorItem = <p> No creditors </p>;
  const hasDebtorsItem = (
    <div>
      <p> Users who owe money to {user.name}: </p>
      <ul>
        {user.debtors.map((debtor, index) => (
          <li key={index}>
            {" "}
            {debtor.name} ({debtor.value} SOL){" "}
          </li>
        ))}
      </ul>
    </div>
  );
  const noDebtorItem = <p> No debtors </p>;

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        id="display-user-btn"
        disabled={user.name ? false : true}
      >
        Get {user.name} information
      </Button>
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle> About {user.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
          <p> User ID: {user.id}</p>
          <p> User name : {user.name} </p>
          {/*<p> User outstanding debt: ${user.totalDebt} </p>*/}
          {parseInt(user.totalDebt) === 0 && <p> No credit/debt </p>}
          {parseInt(user.totalDebt) > 0 && (
            <p>
              {" "}
              {user.name} has an outstanding debt of {user.totalDebt} SOL
            </p>
          )}
          {parseInt(user.totalDebt) < 0 && (
            <p>
              {" "}
              {user.name} has an outstanding credit of{" "}
              {-parseInt(user.totalDebt)} SOL
            </p>
          )}
          {user.creditors.length !== 0 ? hasCreditorsItem : noCreditorItem}
          {user.debtors.length !== 0 ? hasDebtorsItem : noDebtorItem}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Close </Button>
          {/*<Button onClick={handleClose}>Agree</Button>*/}
        </DialogActions>
      </Dialog>
    </div>
  );
}
