const express = require('express'),
    app=express();
    require('dotenv').config();
const PORT = process.env.PORT || 3001,
    mongoose = require('./config/mongoDB'),
    routes = require('./routes'),
    session = require('express-session'),
    MongooseStore = require('mongoose-express-session')(session.Store);

app.use(express.static("../client/build"));
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(session({
    name: "sid",
    secret: "secret",
    cookie: {
        maxAge: 1000*60*60*24,
        secure: process.env.NODE_ENV==="production"
    },
    proxy: process.env.NODE_ENV==="production",
    resave: false,
    saveUninitialized: false,
    store: new MongooseStore({
        mongoose: mongoose,
    })
}));

app.use(routes);
const server = require('http').createServer(app);
const {Server} = require('socket.io');
const io = new Server(server,{
    transports: ['websocket', 'polling']
});
app.set('io', io);

mongoose.connection.once("open", ()=>{
    server.listen(PORT, ()=>{
        console.log('listening on ' + PORT)
    })
});