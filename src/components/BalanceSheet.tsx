import '../style/BalanceSheet.css'
import BalanceItem from "./BalanceItem";
import {activeUserProp, Props, UserInterface} from '../interfaces/interfaces'
// import material UI components
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';

function BalanceSheet({activeUsers}: activeUserProp){
    // console.log(users);
    return(
        <div className= 'balance-sheet-div'>
            <div className='balance-sheet-header'>
                <span id = 'balance-header-logo'> <AccountBalanceRoundedIcon/> </span>
                Balance Sheet
            </div>
            <ul className='balance-sheet-users-list'>
                {
                    activeUsers.map((user) =>(
                        <li key = {user.id}>
                            <BalanceItem user = {user}/>
                        </li>
                    ))
                }
            </ul>
        </div>

    )
}

export default BalanceSheet