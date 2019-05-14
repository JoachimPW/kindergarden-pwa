import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from './components/Login.js'
import Home from './components/Home.js'
import './App.css';
require('dotenv').config()
var store = require('store')

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HomeButtonNews: <button> NEWS </button>,
            HomeButtonCalendar: <button> Calendar </button>,
            user: null,
            text: "Hej du",
            title: "Tester",
            isLoggedIn: "",
            username: "",
            password: "",
            loggedIn: false
            
        };
    }

    // https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679
    componentDidMount() {
        if (!localStorage.getItem("loggedIn")) {
            localStorage.setItem("loggedIn", "")
        }

       

    }
    

    render() {
        if (localStorage.getItem("loggedIn").length == 0) {
            return (<Login />)
        }
        return ((<Home />))        
    }
}

export default App;
