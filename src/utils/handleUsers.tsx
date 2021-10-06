
// FIXME: add interfaces

export function removeCreditor(creditor, creditors){
    let creditorIndex = creditors.indexOf(creditors.filter(cred => {return cred.name == creditor})[0])
    if (creditorIndex > -1){
        creditors.splice(creditorIndex, 1)
    }
    return(creditors)
}

// export function simplifyCredit(creditorA, debtA, creditorB, debtB){
//     if (parseInt(amountPaid) == parseInt(payerDebt)){
//         // then debts compensate
//         payer_creditors = removeCreditor(payee, payer_creditors);
//     }
//     else if ( parseInt(amountPaid) > parseInt(payerDebt)){
//         // then 1_ we erase payer debts
//         payer_creditors = removeCreditor(payee, payer_creditors);
//         // and 2_ create a debt for payee
//         let deductedCredit = String(parseInt(amountPaid) - parseInt(payerDebt));
//         payee_creditors.push({'name': payer, 'value':deductedCredit});
//     }
//     else{
//         // the we reduce payer debt
//         let newPayerDebt = parseInt(payerDebt) - parseInt(amountPaid);
//         payer_creditors.filter(creditor => {return creditor.name == payee})[0].value = String(newPayerDebt);
//     }
// }

export function updateCreditor(creditor, creditors, amount){
    // CASE 1: Not a creditor yet => add a new creditor
    if (creditors.filter(cred => {return cred.name == creditor}).length===0){
        if (amount > 0){
            creditors.push({'name': creditor, 'value': String(amount)});
        }
    }
    // CASE 2: Already a creditor
    else{
        let oldCredit = creditors.filter(cred => {return cred.name == creditor})[0].value;
        let newCredit = parseInt(oldCredit) + amount;
        if (newCredit > 0 ){
            creditors.filter(cred => {return cred.name == creditor})[0].value = String(newCredit);
        }
        else if (newCredit == 0){
            // FIXME
            creditors = removeCreditor(creditor, creditors)
        }

    }
    return(creditors)
}

export function simplifyUnilateralCredit(user_A, user_B){
    let user_A_creditors = user_A.filter(user => {return user.name == user_A})[0].creditors;
    let user_A_owes_user_B = user_A_creditors.filter(cred => {return cred.name == user_B})
    let user_B_creditors = user_A.filter(user => {return user.name == user_B})[0].creditors;
    let user_B_owes_user_A = user_B_creditors.filter(cred => {return cred.name == user_A})
    if (user_A_owes_user_B.length !==0 && user_B_owes_user_A.length !==0){
        // then let's simplify the debts
        let user_B_debt = parseInt(user_B_owes_user_A[0].value);
        let user_A_debt = parseInt(user_A_owes_user_B[0].value);
        if (parseInt(String(user_A_debt)) == parseInt(String(user_B_debt))){
            // then debts compensate
            user_A_creditors = removeCreditor(user_B, user_A_creditors);
            user_B_creditors = removeCreditor(user_A, user_B_creditors);
        }
        else if ( user_B_debt > user_A_debt){
            // then 1_ we erase payer debts
            user_A_creditors = removeCreditor(user_B, user_A_creditors);
            // and 2_ create a debt for payee
            user_B_creditors = updateCreditor(user_A, user_A_creditors, -user_A_debt);
        }
        else{
            // then 1_ we erase payer debts
            user_B_creditors = removeCreditor(user_A, user_B_creditors);
            // and 2_ create a debt for payee
            user_A_creditors = updateCreditor(user_B, user_B_creditors, -user_B_debt);
        }
    }
    return([user_A_creditors, user_B_creditors])
}