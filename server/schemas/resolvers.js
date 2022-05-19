const {Players, ActivePlayers} = require('../models');
const {signToken} = require("../utils/auth");
const verify = Players.schema.methods.verifyPassword;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config();
const resolvers = {
    Query: {
        players: async()=>{
             return Players.find({});
        },
        singlePlayer: async(parent, args)=>{
             return Players.findOne({username: args.username});
        },
        game_code: async(parent, args)=>{
            return Players.find({game_code: args.game_code});
        }
    },
    Mutation: {
        addPlayer: async(parent, args)=>{
            return await ActivePlayers.create({
                username: args.username,
                game_code: args.game_code
            })
                .then((playerData)=>{
                    const token = signToken({
                        game_code: playerData.game_code,
                        username: playerData.username,
                        _id: playerData._id})
                    return {playerData}
                });
        },
        registerPlayer: async(parent, args) =>{
            await Players.create({

            })
                .then(activePlayerData=>{})
        },

        login: async ({username, password})=>{
            const player = await Players.findOne({username})
                .then((playerData)=> {
                    if (!playerData) {
                        console.log('err');
                    }
                    const validPw = bcrypt.compareSync(password, playerData.password);
                    if (!validPw) {
                        throw new Error("bad pw")
                    }
                    return jwt.sign({
                        data: {
                            game_code: playerData.game_code,
                            username: playerData.username,
                            _id: playerData._id
                        }}, process.env.JWT_SECRET,
                        {expiresIn: process.env.JWT_EXP},
                        (err, token)=>{
                            if (err) throw err;
                            return token;
                        });
                });
        }

    }
}
module.exports=resolvers;
