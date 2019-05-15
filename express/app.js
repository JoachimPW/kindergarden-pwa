const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const morgan = require('morgan');
const webpush = require('web-push');
require('dotenv').config({
    path: "../.env"
})
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

var User = new Schema({
    username: String,
    password: String
})

var Users = mongoose.model("User", User)

var New = new Schema({
    title: String,
    date: String,
    text: String
})

var News = mongoose.model("New", New)

var Day = new Schema({
    date: String,
    in: String,
    out: String
})

var Days = mongoose.model("Day", Day)

var Sub = new Schema({
    endpoint: String,
    expirationTime: String,
    keys: {
        p256dh: String,
        auth: String
    }
})

var Subscriptions = mongoose.model("Subscription", Sub)

// Finder alle subs
app.get('/subs', (req, res) => {
    Subscriptions.find({}, (err, subs) => {
        if (err) {
            console.log(err)
        }
        res.send(subs)
    })
})

// Finder alle nyheder
app.get("/getNews", (req, res) => {
    News.find({}, (err, news) => {
        if (err) {
            console.log(err)
        }
        res.send(news)
    })
})

// Finder alle aflevere/afhent
app.get("/getDays", (req, res) => {
    Days.find({}, (err, days) => {
        if (err) {
            console.log(err)
        }
        res.send(days)
    })
})

// Post en nyhed
app.post("/createNews", (req, res) => {
    var news = new News(req.body)
    news.save(function (err, news) {
        if (err) {
            console.log(err)
            return res.status(500).send();
        }
        res.json(201, news)
    })
})

// Post en aflevere/afhentning
app.post("/createTime", (req, res) => {
    var day = new Days(req.body)
    day.save(function (err, day) {
        if (err) {
            console.log(err)
            return res.status(500).send();
        }
        res.json(201, day)
    })
})

// Opret en user
app.post("/signup", (req, res) => {
    var user = new Users(req.body)
    user.save(function (err, user) {
        if (err) {
            console.log(err);
            send.json("fejl");
        }
        res.json(201, user);
    })
})

// Login med en user
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Users.findOne({
        username: username,
        password: password
    }, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        if (!user) {
            return res.status(404).send();
        }

        return res.status(200).send(user);

    })
})

// Gemmer subscription i DB
app.post('/api/subscribe', (req, res) => { // Store subscription on server
    const subscription = req.body;
    Subscriptions.findOne({ endpoint: req.body.endpoint }, (err, checksub) => {
        if (err) {
            console.log(err)
        }
        if (checksub) {
            console.log("sub:" + checksub)
            console.log("Already stored");
            res.send("Sub already stored")
        }
        else {
            console.log("checksub:" + checksub)
            var sub = new Subscriptions(req.body);
            sub.save(function (err, sub) {
                if (err) {
                    return (err)
                }
                res.json(201, sub)
                console.log("Ny sub tilføjet", sub);
            })
        }

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

// Finder alle subscriptions i DB og sender en push notification til hver af dem
app.post('/api/push_message', (req, res, next) => {
    let text = req.body.text;
    let title = req.body.title;

    Subscriptions.find({}, (err, sub) => {
        if (err) {
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
        res.json({
            message: "Sending push messages initiated"
        })
    })
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});
/**** Start server ****/
const server = app.listen(port,
    () => console.log(`API Service running on port ${port}!`));