const express = require('express'),
    app=express();
const PORT = process.env.PORT || 3001,
    dbConfig = require('./config/mongoDB'),
    routes = require('./routes');

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(routes);

const server = require('http').createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
    transports: ['websocket', 'polling']
});
app.set('io', io);


dbConfig.once("open", ()=>{
    server.listen(PORT, ()=>{
        console.log('listening on ' + PORT)
    })
});

