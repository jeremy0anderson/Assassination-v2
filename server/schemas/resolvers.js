const {Players} = require('../models');
const {signToken} = require("../utils/auth");
const verify = Players.schema.methods.verifyPassword;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config();
const resolvers = {
    Query: {
        players: async()=>{
            return Players.find().populate("game_code")
        },
        player: async({ username })=>{
            return Players.findOne({username}).populate("game_code");
        }
    },
    Mutation: {
        addPlayer: async(parent, args)=>{
            const player = await Players.create(args)
                .then(()=>{
                    const token = signToken(player)
                    return {token, player}
                });
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
