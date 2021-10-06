import logo from '../logo.svg';
import {useEffect, useState} from 'react'
import '../style/App.css';
import AddPayment from "./addPayment";
import AddUser from "./addUser";
import BalanceSheet from "./BalanceSheet";
import Header from "./Header";
import Footer from "./Footer";
// import users data
import {users} from '../data/usersList'
import {createInterface} from "readline";

// Personalize theme
// import { ThemeProvider } from "@material-ui/styles";
// import { createTheme, ThemeProvider } from '@material-ui/core/styles';
// import green from '@material-ui/core/colors/green';
function App() {


    // interface enumCreditorItems{
    //     name: string;
    //     value: string;
    // }
    // interface enumCreditors extends Array<enumCreditorItems>{ }
    // interface enumUserItems{
    //     name: string;
    //     id: string;
    //     totalCredit: string;
    //     creditors: enumCreditors;
    //     debtors: enumCreditors;
    // }
    // interface enumUsers extends Array<enumUserItems>{ }
    //
    // interface activeUsersProps{
    //     activeUsers: enumUsers;
    // }

    const [activeUsers, updateActiveUsers] = useState(users);
    // const [newUser, setNewUser] = useState('');
    // setInterval(function(){ console.log(activeUsers.filter(user => {return user.id === '1'})[0]); }, 10000);
    //
    // useEffect(() => {
    //     console.log('one user has been added in `App`');}, [activeUsers]);

  return (
    <div className="App">
          <Header/>
          <BalanceSheet activeUsers={activeUsers}/>
          <AddUser activeUsers = {activeUsers} updateActiveUsers = {updateActiveUsers}/>
          <AddPayment activeUsers = {activeUsers} updateActiveUsers={updateActiveUsers}/>
          <Footer/>
    </div>
  )
}

export default App;
