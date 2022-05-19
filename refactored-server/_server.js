const express = require('express'),
      cors = require('cors'),
      app = express();
const {ApolloServer} = require("apollo-server-express");
const {verify} = require("jsonwebtoken");
const {resolvers, typeDefs} = require('./schemas');
const gqlServer = new ApolloServer({
    resolvers,
    typeDefs,
    cors: {
        origin: ["https://studio.apollographql.com", "http://localhost:3000", "http://localhost:3001"]
    },
    introspection: true,
    // context: (req) => {
    //     const token = req.headers.authorization || "";
    //     let checkToken = verify(token, process.env.JWT_SECRET, {}, (err, decoded)=>{
    //         if (err) throw err;
    //         return {
    //             username: decoded.username,
    //             game_code: decoded.game_code
    //         };
    //     })
    //     return {checkToken};
    // }
});
const PORT = process.env.PORT || 4000;

const {Server} = require('socket.io');




require('./config/mongoDB').connection.once('open', async()=>{
    await gqlServer.start();
    const server = require('http').createServer(app);
    const io = new Server(server, {
        transports: ['websocket', 'polling']
    })
//middleware
    app.use(cors());
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
    }
    gqlServer.applyMiddleware({app});
    app.listen(PORT, ()=>{
        console.log("listening on " + PORT+`${gqlServer.graphqlPath}`)
    })
})