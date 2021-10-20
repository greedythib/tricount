import {forwardRef, useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {userProp} from '../interfaces/interfaces'
import Slide from '@mui/material/Slide';

// const Transition = forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

export default function AlertDialogSlide({user}: userProp) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                id = 'display-user-btn'
                disabled = {user.name?false:true}
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
                    <DialogContentText id="alert-dialog-slide-description">
                        {/*Display {user.name} information by calling child component*/}
                        {/*TODO: wrap it as a new child component or styled-components for `<p>` below*/}
                        <span> User ID: {user.id}</span>
                        <span> User name : {user.name} </span>
                        <span> User outstanding debt: ${user.totalCredit} </span>
                         {/*TODO: fix array iteration*/}
                        {/*<span> User creditors list: {user.creditors}  </span>*/}
                        {/*<span> User debtors list: {user.debtors}</span>*/}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}> Close </Button>
                    {/*<Button onClick={handleClose}>Agree</Button>*/}
                </DialogActions>
            </Dialog>
        </div>
    );
}
