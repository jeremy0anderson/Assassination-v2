const {Players, ActivePlayers} = require('../models');
const {signToken} = require("../utils/auth");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config();
class Auth{
    constructor(accessToken){
        this.accessToken = accessToken;
    }
}
const getToken = ({username, game_code, _id})=>{
    return jwt.sign({
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
        getActivePlayers: async (parent, args) =>{
            return ActivePlayers.find({});
        }
    },
    Mutation: {
        addActivePlayer: async (parent, args) => {
            return ActivePlayers.create({
                username: args.username,
                game_code: args.game_code
            })
        },
        registerHost: async (parent, args) => {
            const newHost = new Players({
                first_name: args.first_name,
                last_name: args.last_name,
                username: args.username,
                email: args.email,
                password: args.password,
                game_code: Math.random().toString(36).slice(2,8)
            });
            return await newHost.save();

        },
        registerPlayer: async(parent,args)=>{
            const newPlayer = new Players({
                username: args.username,
                game_code: args.game_code
            });
            return await newPlayer.save();
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
            const accessToken = await getToken({username: player.username, game_code: player.game_code,_id: player._id});
            return {
                id: player._id,
                username: player.username,
                game_code: player.game_code,
                accessToken: accessToken
            }
        }
    }
}
module.exports=resolvers;
