import React, { Component } from 'react'
import News from "./News.js";
import Calendar from "./Calendar.js"
import Header from "./Header.js";
import CreateNews from "./CreateNews.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "HEJ",
            title: "DAV",
            news: [],
            days: [],
            status: ""
            
        }
        this.sendNoti = this.sendNoti.bind(this);
       
    }

    componentDidMount() {
        //https://express-push.herokuapp.com/
        // http://localhost:9090
        fetch('https://kindergarden-pwa.herokuapp.com/getNews')
            .then(response => response.json())
            .then(data => this.setState({ news: data }))

        fetch('https://kindergarden-pwa.herokuapp.com/getDays')
            .then(response => response.json())
            .then(data => this.setState({ days: data }))
    }

 
    addNews(title, date, text ) {
    fetch('https://kindergarden-pwa.herokuapp.com/createNews', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          date: date,
          text: text
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      fetch('https://kindergarden-pwa.herokuapp.com/api/push_message', {
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

    sendNoti(text, title) {
        fetch('https://kindergarden-pwa.herokuapp.com/api/push_message', {
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

    updateTime(inTime, outTime) {
        fetch('https://kindergarden-pwa.herokuapp.com/changeTime/5cdac5129e4bbdc614ec37bd', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                in: inTime,
                out: outTime
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
                                                <div class="no-display-push">
                                                    <div className="container">
                                                        <h1>Push Notifications</h1>
                                                        <button onClick={() => this.sendNoti(this.state.text, this.state.title)}>SEND NOTI</button>
                                                        <p>This page will try to display Notifications from Web Push messages.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="front-wrapper">
                                                <h1><span>Kinder</span>garden</h1>
                                                <img src="https://unixtitan.net/images/ballon-vector-kids-3.png" />
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
                        <div class="wrapper">
                            <div id="content">                           
                                <News {...props} news={this.state.news} />    
                                <CreateNews {...props} addNews={this.addNews}></CreateNews>                         
                            </div>
                        </div>                                     
                            </React.Fragment>      
                                }
                        />

                        <Route exact path={"/Calendar"}
                            render={(props) =>
                                <React.Fragment>
                                    <Calendar {...props} days={this.state.days} updateTime={this.updateTime} />
                                </React.Fragment>}
                        />
                    </Switch>
                </React.Fragment>
            </Router>
        )
    }
}
