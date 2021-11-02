import logo from "../logo.svg";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../utils/style/css/App.css";
import MyStyledGlobalStyle from "../utils/style/styled-components/globalStyle";
import { ThemeProvider } from "../utils/context/theme-context";
import UserHeader from "./UserHeader";
import AddPayment from "./addPayment";
import AddUser from "../pages /addUser";
import DeleteUser from "../pages /deleteUser";
import DisplayUser from "../pages /displayUser";
import BalanceSheet from "./BalanceSheet";
import Header from "./Header";
import Footer from "./Footer";
import { UserInterface } from "../interfaces/interfaces";
// import users data
import { users } from "../data/usersList";

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

  // useEffect(() => {
  //   // console.log('useEffect called from App.tsx!')
  //   fetch("/api", { method: "GET" })
  //     .then(function (res) {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then((value) => {
  //       console.log(value);
  //       updateActiveUsers(value);
  //     });
  // }, []);

  // Hook for retrieving data from browser local storage
  useEffect(() => {
    let savedActiveUsers: UserInterface[] = [];
    if (activeUsers.length === 0) {
      console.log("init step");
      try {
        let saved: any = localStorage.getItem("activeUsers");
        savedActiveUsers = JSON.parse(saved);
      } catch (error: any) {
        console.log(error);
      }
      console.log("savedActiveUser", savedActiveUsers);
      updateActiveUsers(savedActiveUsers);
    }
  }, []);

  // Hook for updating data to browser local storage
  useEffect(() => {
    localStorage.setItem("activeUsers", JSON.stringify(activeUsers));
  }, [activeUsers]);

  return (
    <div className="App">
      <Router>
        <ThemeProvider>
          <MyStyledGlobalStyle />
          <Header />
          <BalanceSheet activeUsers={activeUsers} />
          <UserHeader />
          <Route exact path="/">
            <AddUser
              activeUsers={activeUsers}
              updateActiveUsers={updateActiveUsers}
            />
          </Route>
          <Route path="/delete-user">
            <DeleteUser
              activeUsers={activeUsers}
              updateActiveUsers={updateActiveUsers}
            />
          </Route>
          <Route path="/display-user">
            <DisplayUser activeUsers={activeUsers} />
          </Route>
          <AddPayment
            activeUsers={activeUsers}
            updateActiveUsers={updateActiveUsers}
          />
          <Footer />
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
