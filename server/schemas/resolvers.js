const {Players, ActivePlayers} = require('../models');
const {signToken} = require("../utils/auth");
const {sign, verify} = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const {AuthenticationError} = require("apollo-server");
require('dotenv').config();
class Auth{
    constructor(accessToken){
        this.accessToken = accessToken;
    }
}
const verifyToken = ({accessToken})=>{
    return verify(accessToken, process.env.JWT_SECRET, {expiresIn: "1d"})
}
const getToken = ({username, game_code, _id})=>{
    return sign({
        username,
        game_code,
        _id
    }, process.env.JWT_SECRET, {expiresIn: "1d"});
};
const resolvers = {
    Query: {
        players: async (parent, args) => {
            return Players.find({})
        },
        player: async (parent, args) => {
            return Players.findOne({username: args.username});
        },
        game_code: async (parent, args) => {
            return Players.find({game_code: args.game_code});
        },
        getActivePlayers: async () =>{
            return ActivePlayers.find({});
        },
        getPlayersInSocketRoom: async (parent, args)=>{
            return ActivePlayers.find({socket_room: args.socket_room});
        }
    },

    Mutation: {
        getAuthorizedPlayer: async (parent, {token, socket_id}) => {
            if (!token || token.length <= 4) throw new AuthenticationError("Error. No token");

            const accessToken = token.slice(1, token.length-1);
            if (!token) throw new AuthenticationError("Please provide a token");

const player = await verify(accessToken, process.env.JWT_SECRET, {expiresIn:"1d"},(err, decoded)=>{
            if (err) throw new AuthenticationError("invalid token");
            return ActivePlayers.create({
                _id: decoded._id,
                username: decoded.username,
                game_code: decoded.game_code,
                socket_id: socket_id
            })
        });
        console.log(player);
            return player;
        },
        removeActivePlayer: async(parent, args)=>{
            await ActivePlayers.findOneAndDelete({socket_id: args.socket_id});
            const currentPlayers = await ActivePlayers.find({});
            return currentPlayers;
        },
        addActivePlayer: async (parent, args) => {
            return ActivePlayers.create({
                username: args.username,
                game_code: args.game_code,
                socket_id: args.socket_id,
                is_host: args.is_host
            })
        },
        registerHost: async (parent, args) => {
            const newHost = await Players.create({
                first_name: args.first_name,
                last_name: args.last_name,
                username: args.username,
                email: args.email,
                password: args.password,
                is_host: true,
                game_code: Math.random().toString(36).slice(2,8)
            });
            const accessToken = await getToken({username: newHost.username, game_code: newHost.game_code,_id: newHost._id, is_host: newHost.is_host});
            return {
                id: newHost._id,
                username: newHost.username,
                game_code: newHost.game_code,
                is_host: newHost.is_host,
                accessToken: accessToken
            }

        },
        registerPlayer: async(parent,args)=>{
            const newPlayer = {
                username: args.username,
                game_code: args.game_code,
                is_host: false
            };
            const accessToken = await getToken({username: newPlayer.username, game_code: newPlayer.game_code,_id: newPlayer._id, is_host: newPlayer.is_host});
            return {
                id: newPlayer._id,
                username: newPlayer.username,
                game_code: newPlayer.game_code,
                is_host: newPlayer.is_host,
                accessToken: accessToken
            }
        },
        login: async (parent, args) =>{
            const player = await Players.findOne({username: args.username});

            if (!player){
                throw new Error("no player found")
            }
            const validPassword = await bcrypt.compare(args.password, player.password)
            if (!validPassword) {
                throw new Error("Invalid Password");
            }
            const accessToken = await getToken({username: player.username, game_code: player.game_code,_id: player._id, is_host: player.is_host});
            return {
                id: player._id,
                username: player.username,
                game_code: player.game_code,
                is_host: player.is_host,
                accessToken: accessToken
            }
        }
    }
}
class SocketConnection{
    constructor(io, socket){
        this.io = io;
        this.socket = socket;
    }
    handleNewConnection(){
        this.socket.on('')
    }
}
function bindToActiveUser(io){
    io.on("connection", (socket)=>{
        const activePlayer = new SocketConnection(io, socket);
    })
}
module.exports= {resolvers, SocketConnection, bindToActiveUser};
