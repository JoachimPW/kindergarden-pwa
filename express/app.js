const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const morgan = require('morgan');
const webpush = require('web-push');
require('dotenv').config({path: "../.env"})
var mongoose = require('mongoose')
/**** Configuration ****/
const port = (process.env.PORT || 9090);
const app = express();

app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console

// TODO: Don't put these directly in source! Keep them somewhere else.
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:krdo@eaaa.dk', publicVapidKey, privateVapidKey);
const subscriptions = []; // TODO: Store these in a database!
app.use(express.static(path.join(__dirname, '../build')));

// Additional headers for the response to avoid trigger CORS security errors in the browser
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});

mongoose.connect(process.env.dbUrl, (err) => {
    console.log("MongoDB connection status:", err)
})

var Schema = mongoose.Schema;

var Sub = new Schema({
    endpoint: String,
    expirationTime: String,
    keys: {
        p256dh: String,
        auth: String
    }
})

var Subs = mongoose.model("Sub", Sub)

app.get('/subs', (req, res) => {
    Subs.find({}, (err, subs) => {
        if (err) {
            console.log(err)
        }
        res.send(subs)
    })
})

/**** Routes ****/
app.post('/api/subscribe', (req, res) => { // Store subscription on server
    const subscription = req.body;
    var sub = new Subs(req.body);
    sub.save(function (err, sub)  {
        if(err) {
            return (err)
        }
        res.json(201, sub)
        console.log("Ny sub tilføjet", sub);
    })
    //const sub = Sub.find(elm => elm.endpoint === endpoint);

    /*if (sub) {
        let msg = "Subscription already stored";
        console.log(msg, sub);
        res.status(201).json({msg: msg});
    } else {*/
        /*Sub.push(sub);  
        console.log("Sub:" + sub)
        res.send(sub)
        res.status(201).json({msg: 'Subscription is successful'});
        sub.save(); */   
});

app.post('/api/push_message', (req, res, next) => {
    let text = req.body.text;
    let title = req.body.title;

    Subs.find({}, (err, sub) => {  
        if(err) {
            console.log(err);
        }
        sub.forEach((elm) => {
            const payload = JSON.stringify({
                msg: text,
                title: title            
        });
    
        webpush.sendNotification(elm, payload).catch(error => {
            console.error(error.stack);
        });   
        });
    res.json({message: "Sending push messages initiated"})
    })              
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });         
/**** Start server ****/
const server = app.listen(port,
    () => console.log(`API Service running on port ${port}!`));
