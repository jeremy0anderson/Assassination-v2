const {Players, ActivePlayers} = require('../models');
const {signToken} = require("../utils/auth");
const verify = Players.schema.methods.verifyPassword;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config();
const resolvers = {
    Query: {
        players: async () => {
            return Players.find({}).populate('game_code');
        },
        player: async (parent, args) => {
            return Players.findOne({username: args.username});
        },
        game_code: async (parent, args) => {
            return Players.find({game_code: args.game_code});
        }
    },
    Mutation: {
        addPlayer: async (parent, args) => {
            return ActivePlayers.create({
                username: args.username,
                game_code: args.game_code
            })
            // .then((playerData)=>{
            //     const token = signToken({
            //         game_code: playerData.game_code,
            //         username: playerData.username,
            //         _id: playerData._id})
            //     return {playerData}
            // });
        },
        registerHost: async (parent, args) => {
                return Players.create({
                    first_name: args.first_name,
                    last_name: args.last_name,
                    username: args.username,
                    email: args.email,
                    password: args.password
                })
                //     .then((playerData) => {
                //
                // })

            //     .then((playerData)=>{
            //
            // })
        },
        registerPlayer: async(parent,args)=>{
            return Players.create({
                username: args.username,
                game_code: args.game_code
            })
        },
        login: async (parent, args) => {
            return Players.findOne({username: args.username})
                .then((playerData) => {
                    if (!playerData) {
                        console.log('err');
                    }
                    const validPw = bcrypt.compareSync(args.password, playerData.password);
                    if (!validPw) {
                        throw new Error("bad pw")
                    }
                    return signToken({
                        game_code: playerData.game_code,
                        username: playerData.username,
                        _id: playerData._id
                    });
                        // });, process.env.JWT_SECRET,
                        // {expiresIn: process.env.JWT_EXP},
                        // (err, token) => {
                        //     if (err) throw err;
                        //     console.log(token);
                        //     return token;
                        // })
                    });
        }
    }
}
module.exports=resolvers;
