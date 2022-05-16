const express = require('express'),
    app=express(),
    {ApolloServer} = require('apollo-server-express'),
    PORT = process.env.PORT || 4007,
    mongoose = require('./config/mongoDB'),
    connection = mongoose.connection,
    routes = require('./routes'),
    session = require('express-session'),
    MongooseStore = require('mongoose-express-session')(session.Store),
    cors = require('cors'),
    path = require('path');

    require('dotenv').config();

    const graphQLServer = new ApolloServer({
    typeDefs: require('./schemas/typeDefs'),
    resolvers: require('./schemas/resolvers')
})

const gqlServer = async() =>{
    await graphQLServer.start();
    graphQLServer.applyMiddleware({app,...routes})
}

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors({
    origin: "*",
}))
app.use(session({
    name: "sid",
    secret: "secret",
    cookie: {
        maxAge: 1000*60*60*24,
        secure: process.env.NODE_ENV==="production"
    },
    resave: false,
    saveUninitialized: false,
    store: new MongooseStore({
        connection: mongoose
        })
}));

app.use(routes);
const mainServer = require('http').createServer(app);
const {Server} = require('socket.io');
const io = new Server(mainServer,{
    transports: ['websocket'],
    cors: {
        origin: "*"
    }
});
app.set('io', io);

connection.once("open", ()=>{
    mainServer.listen({port: PORT}, ()=>{
        console.log('listening on ' + PORT)
    })
});

module.exports = {graphQLServer, app};