import logo from '../logo.svg';
import {useEffect, useState} from 'react'
import '../style/App.css';
import AddPayment from "./addPayment";
import AddUser from "./addUser";
import BalanceSheet from "./BalanceSheet";
import Header from "./Header";
import Footer from "./Footer";
import {Props, UserInterface} from '../interfaces/interfaces'
// import users data
import {users} from '../data/usersList'
import {createInterface} from "readline";

// Personalize theme
// import { ThemeProvider } from "@material-ui/styles";
// import { createTheme, ThemeProvider } from '@material-ui/core/styles';
// import green from '@material-ui/core/colors/green';
function App() {

    const [activeUsers, updateActiveUsers] = useState<UserInterface[]>(users);

    useEffect(() => {
        let newUser = {
            'name': 'Bartok',
            'id': '1',
            'totalCredit': '0',
            'debtors': [],
            'creditors':[]
        };
        fetch('/api',{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(function(res){
                if (res.ok){return res.json()}
            })
            .then(function(value){console.log(value)})
    }, [])

    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((value) => console.log(value));
        },
        [activeUsers]);


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
