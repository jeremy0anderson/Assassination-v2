const {Players} = require('../../models');
const {signToken, verifyToken} = require('../../utils/auth');
const bcrypt = require('bcrypt');
require('dotenv').config();

const events = {
    postLogin: (req, res) =>{
        Players.findOne({
            username: req.body.username
        }).then(playerData => {
            if (!playerData){
                res.status(400).json({message: "No player with that username found"});
            }
            let validPW = bcrypt.compareSync(req.body.password, playerData.password)
            if (validPW) {
            signToken({
                username: playerData.username,
                game_code: playerData.game_code,
                _id: playerData._id
            },req, res);
            } else {
                res.status(400).json({message: "Incorrect password"})
            }
        })
    },
    postRegister: (req, res)=>{
        Players.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }).then(playerData=>{
            console.log(playerData);
            signToken({
                    username: playerData.username,
                    game_code: playerData.game_code,
                    _id: playerData._id
            },req, res);
        })
    },
    verify: (req, res)=>{
        const headers = req.getHeaders().json();
        verifyToken()
    }
}

module.exports = events;
