import React, { Component } from 'react'
import News from "./News.js";
import Calendar from "./Calendar.js"
import Header from "./Header.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: "fire.auth().currentUser.email",
            text:"HEJ",
            title:"DAV",
            news: [],
            days: []
        }
        this.sendNoti = this.sendNoti.bind(this);
    }

    componentDidMount() {
        this.setState({
            userEmail: "fire.auth().currentUser.email"
        })

        fetch('http://localhost:9090/getNews')
        .then(response => response.json())
        .then(data => this.setState({ news: data }))

        fetch('http://localhost:9090/getDays')
        .then(response => response.json())
        .then(data => this.setState({ days: data }))
    }

    sendNoti(text, title) {        
        fetch('https://express-push.herokuapp.com/api/push_message', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                title: title
            }),
        }).catch(error => console.error(error));
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Switch>
                        <Route exact path={"/"}
                            render={(props) =>
                                <React.Fragment>
                                    <div className="wrapper">
                                        <div id="content">
                                            <Header></Header>
                                            <div>
                                                <br></br> <br></br>
                                                <div className="container">
                                                    <h1>Push Notifications</h1>
                                                    <button onClick={() => this.sendNoti(this.state.text, this.state.title)}>SEND NOTI</button>
                                                    <p>This page will try to display Notifications from Web Push messages.</p>
                                                </div>
                                            </div>
                                            <div id="front-wrapper">
                                                <h1>Kindergarten App</h1>
                                                <img src="~/imageslogo.jpg" alt="Kindergarten Logo" />
                                                <a href="/news" ><button className="btn btn-primary center-block"> News </button></a>
                                                <a href="/calendar"><button className="btn btn-primary center-block"> Calendar </button></a>
                                            </div>
                                        </div></div>
                                </React.Fragment>
                            }
                        />
                        <Route exact path={"/News"}
                            render={(props) =>
                                <React.Fragment>
                                    <News {...props} news={this.state.news} />
                                </React.Fragment>}
                        />

                        <Route exact path={"/Calendar"}
                            render={(props) =>
                                <React.Fragment>
                                    <Calendar {...props} days={this.state.days} />
                                </React.Fragment>}
                        />
                    </Switch>
                </React.Fragment>
            </Router>
        )
    }
}
