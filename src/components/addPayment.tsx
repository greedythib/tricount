import '../style/addPayment.css'
import {removeCreditor, simplifyUnilateralCredit, updateCreditor} from "../utils/handleUsers";
import { useState, useEffect } from 'react'
// import {users} from './addUser'
// import {users_list} from './addUser'
import PaymentIcon from '@mui/icons-material/Payment';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

// FIXME: simplify interface below
interface enumCreditorItems{
        name: string;
        value: string;
}
interface enumCreditors extends Array<enumCreditorItems>{ }
interface enumUserItems{
        name: string;
        id: string;
        totalCredit: string;
        creditors: enumCreditors;
        debtors: enumCreditors;
}
interface enumUsers extends Array<enumUserItems>{ }

interface activeUsersProps{
        activeUsers: enumUsers;
        updateActiveUsers: React.Dispatch<React.SetStateAction<enumUsers>>
}

function AddPayment({activeUsers, updateActiveUsers}){

    const [payer, setPayer] = useState(activeUsers[0].name);
    const [payee, setPayee] = useState(activeUsers[1].name);
    const [amountPaid, setAmountPaid] = useState('')
    const [inputError, setInputError] = useState(false)

    function handlePayer(e){
        setPayer(e.target.value);
    }
    function handlePayee(e){
        setPayee(e.target.value);
    }
    function handleAmountPaid(e){
        setAmountPaid(e.target.value);
    }

    function handlePayment(){
        if (payer === payee){
            setInputError(true)
            return(1)
        }
        if (amountPaid === '' ){
            setInputError(true);
            return(1)
        }
        setInputError(false)
        // Update active users => display payment in `BalanceSheet`
        // console.log(activeUsers.filter(user => {return user.name == payee})[0].creditors)
        let payee_creditors = activeUsers.filter(user => {return user.name == payee})[0].creditors;
        let payer_creditors = activeUsers.filter(user => {return user.name == payer})[0].creditors;

        // STEP 1: Init payment and create debt between payee and payer
        // FIXME: add `simplifyUnilateralCredit`
        // case 1: payer owes payee
        if (payer_creditors.filter(creditor => {return creditor.name == payee}).length!==0){
            console.log('payer has debts with payee')
            let payerDebt = payer_creditors.filter(creditor => {return creditor.name == payee})[0].value;
                if (parseInt(amountPaid) == parseInt(payerDebt)){
                    // then debts compensate
                    payer_creditors = removeCreditor(payee, payer_creditors);
                }
                else if ( parseInt(amountPaid) > parseInt(payerDebt)){
                    // then 1_ we erase payer debts
                    payer_creditors = removeCreditor(payee, payer_creditors);
                    // and 2_ create a debt for payee
                    let deductedCredit = String(parseInt(amountPaid) - parseInt(payerDebt));
                    payee_creditors.push({'name': payer, 'value':deductedCredit});
                }
                else{
                    // the we reduce payer debt
                    let newPayerDebt = parseInt(payerDebt) - parseInt(amountPaid);
                    payer_creditors.filter(creditor => {return creditor.name == payee})[0].value = String(newPayerDebt);
                }
        }
        // case 2: either increase debt either create new creditor for payee
        else{
            payee_creditors = updateCreditor(payer, payee_creditors, parseInt(amountPaid));
        }
        // What is the outstanding debt of payee now?
        let payeeDebt;
        if (payee_creditors.filter(creditor => {return creditor.name === payer}).length !==0){
            payeeDebt = parseInt(payee_creditors.filter(creditor => {return creditor.name === payer})[0].value);
        }
        else{payeeDebt = 0 }
        console.log('Payee debt', payeeDebt);
        // STEP 2 ==> If payer has outstanding debts, we could simplify the balance sheet!
        if (payer_creditors.length !== 0 && payeeDebt > 0){
            let i = 0;
            let payer_creditors_tmp = payer_creditors.slice();
            console.log('let`s share payment')
            console.log(' payer creditors list length:', payer_creditors.length);
            while (payeeDebt > 0 && i < payer_creditors_tmp.length){
                console.log('i = ', i)
                if (parseInt(payer_creditors_tmp[i].value) <= payeeDebt){
                    console.log('evaluating',payer_creditors_tmp[i].name, 'credit' )
                    // delete payer debt with `payer_creditor[i]`
                    payer_creditors = removeCreditor(payer_creditors_tmp[i].name, payer_creditors);
                    // update `payer_creditor[i]` as a new creditor for payee
                    payee_creditors = updateCreditor(payer_creditors_tmp[i].name, payee_creditors, parseInt(payer_creditors_tmp[i].value))
                    // update payee debt with payer
                    payee_creditors = updateCreditor(payer, payee_creditors, -parseInt(payer_creditors_tmp[i].value));
                    payeeDebt = payeeDebt - parseInt(payer_creditors_tmp[i].value);
                    console.log('now payee debt to payer is: ', payeeDebt);
                }
                else{
                    payee_creditors = removeCreditor(payer, payee_creditors);
                    payee_creditors = updateCreditor(payer_creditors_tmp[i].name, payee_creditors, payeeDebt);
                    payer_creditors = updateCreditor(payer_creditors_tmp[i].name, payer_creditors, -payeeDebt);
                    payeeDebt = payeeDebt - parseInt(payer_creditors_tmp[i].value);
                }
                i++;
            }
        }
        // STEP 3 ==> If payee has outstanding credits, we could simplify the balance sheet
        for (let k = 0; k < activeUsers.length; k++) {
            if (payeeDebt > 0 &&
                activeUsers[k].name !== payee &&
                activeUsers[k].name !== payer &&
                activeUsers[k].creditors.filter(cred => {
                    return cred.name === payee
                }).length !== 0) {
                let payeeCredit = parseInt(activeUsers[k].creditors.filter(cred => {
                    return cred.name == payee
                })[0].value);
                let activeUser_k_creditors = activeUsers[k].creditors;
                if (payeeCredit == payeeDebt) {
                    payee_creditors = removeCreditor(payer, payee_creditors);
                    activeUser_k_creditors = removeCreditor(payee, activeUser_k_creditors);
                    // add payer to `activeUser[k]` 's creditors or update if already a creditor
                    activeUser_k_creditors = updateCreditor(payer, activeUser_k_creditors, payeeDebt);
                } else if (payeeCredit > payeeDebt) {
                    payee_creditors = removeCreditor(payer, payee_creditors);
                    activeUser_k_creditors = updateCreditor(payee, activeUser_k_creditors, -payeeDebt);
                    activeUser_k_creditors = updateCreditor(payer, activeUser_k_creditors, payeeDebt);
                } else {
                    activeUser_k_creditors = removeCreditor(payee, activeUser_k_creditors);
                    payee_creditors = updateCreditor(payer, payee_creditors, -payeeCredit);
                    activeUser_k_creditors = updateCreditor(payer, activeUser_k_creditors, payeeDebt);
                }

                activeUsers[k].creditors = activeUser_k_creditors;
            }
        }


        // Update payee/payer creditors
        activeUsers.filter(user => {return user.name == payee})[0].creditors = payee_creditors;
        activeUsers.filter(user => {return user.name == payer})[0].creditors = payer_creditors;

        // FIXME: handle trilateral payment
        // // STEP 4 ==> Search for debts that can be simplified
        // for (let k = 0; k < activeUsers.length; k++){
        //     for (let l = k+1; l < activeUsers.length; l++){
        //         let user_k = activeUsers[k].name;
        //         let user_l = activeUsers[l].name;
        //         let [user_k_creditors, user_l_creditors] = simplifyUnilateralCredit(user_k, user_l)
        //         activeUsers.filter(user => {return user.name == user_k})[0].creditors = user_k_creditors;
        //         activeUsers.filter(user => {return user.name == payer})[0].creditors = user_l_creditors;
        //     }
        // }


        // STEP 4: Final update of the state
        // activeUsers.filter(user => {return user.name == payee})[0].creditors = payee_creditors;
        // activeUsers.filter(user => {return user.name == payer})[0].creditors = payer_creditors;
        updateActiveUsers([...activeUsers])

        //TODO: add banner to confirm payment
    }

    return(
        <div className='add-payment-div'>
            <div className='add-payment-header'>
                <span id = 'add-payment-header-logo'> <PaymentIcon/> </span>
                Add new payment
            </div>
            <Stack direction = 'row' spacing = {2} justifyContent = 'center' mt = {5}>
                <TextField label = 'Select Payer'
                           select
                           value = {payer}
                           error = {inputError}
                           onChange = {handlePayer} >
                    {
                        activeUsers.map((user) => (
                            <MenuItem key = {user} value = {user.name}>
                                {user.name}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <span id = 'add-payment-frag'> pays </span>
                <TextField label = '$'
                           id = 'add-payment-amount'
                           value = {amountPaid}
                           onChange = {handleAmountPaid}
                           error = {inputError}
                />
                <span id = 'add-payment-frag'> to </span>
                <TextField label='Select Payee'
                           select
                           error = {inputError}
                           value = {payee}
                           onChange = {handlePayee}
                >
                    {
                        activeUsers.map((user) => (
                            <MenuItem key = {user.name} value = {user.name}>
                                {user.name}
                            </MenuItem>
                        ))
                    }
                </TextField>
            </Stack>
            <div id = 'add-payment-submit-btn'>
                    <Button
                        variant="contained"
                        // disabled={inputError}
                        onClick={handlePayment}
                        endIcon={<ControlPointIcon/>}>
                        Confirm
                    </Button>
            </div>

        </div>
    )
}

export default AddPayment