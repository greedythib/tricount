import logo from '../logo.svg';
import {useEffect, useState} from 'react'
import '../style/App.css';
import AddPayment from "./addPayment";
import AddUser from "./addUser";
import BalanceSheet from "./BalanceSheet";
import Header from "./Header";
import DeleteUser from './deleteUser'
import Footer from "./Footer";
import {UserInterface} from '../interfaces/interfaces'
// import users data
import {users} from '../data/usersList'
import {createInterface} from "readline";

// Personalize theme
// import { ThemeProvider } from "@material-ui/styles";
// import { createTheme, ThemeProvider } from '@material-ui/core/styles';
// import green from '@material-ui/core/colors/green';
function App() {

    const [activeUsers, updateActiveUsers] = useState<UserInterface[]>([]);

    // useEffect(() => {
    //     let newUser = {
    //         'name': 'Rumba',
    //         'id': '3',
    //         'totalCredit': '-10',
    //         'debtors': [],
    //         'creditors':[]
    //     };
    //     fetch('/api',{
    //         method: "POST",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(newUser)
    //     })
    //         .then(function(res){
    //             if (res.ok){return res.json()}
    //         })
    //         .then(function(value){console.log(value)})
    // }, [])

    useEffect(() => {
        console.log('useEffect called from App.tsx!')
        fetch("/api", {method: "GET"})
            .then(function(res){
                if (res.ok){return res.json()}
            })
            .then((value) => {
                console.log(value);
                updateActiveUsers(value);
            });
        },
        []);

  return (
    <div className="App">
          <Header/>
          <BalanceSheet activeUsers={activeUsers}/>
          <AddUser activeUsers = {activeUsers} updateActiveUsers = {updateActiveUsers}/>
          <AddPayment activeUsers = {activeUsers} updateActiveUsers={updateActiveUsers}/>
          <DeleteUser activeUsers={activeUsers} updateActiveUsers = {updateActiveUsers}/>
          <Footer/>
    </div>
  )
}

export default App;
