import React, {Component} from 'react';
require('dotenv').config()

class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          questions: [],
          comments: [],
          user: "",
          authErr: "",
          loggedIn: false,
          text:"Hej du",
          title: "Tester"
        };    

        this.sendNoti = this.sendNoti.bind(this);
       
      }
      // https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679

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
        

        console.log("KEY:" + process.env.REACT_APP_PUBLIC_VAPID_KEY)
        return (
            <div className="container">
                <h1>Push Notifications</h1>
                <button onClick={() => this.sendNoti(this.state.text, this.state.title)}>SEND NOTI</button>
                <p>This page will try to display Notifications from Web Push messages.</p>
            </div>
        );
    }
}

export default App;
