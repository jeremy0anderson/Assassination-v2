const {Players} = require('../../models');

const events = {
    Get: (req, res)=>{
        Players.find().then(playerData=>{
            res.json(playerData);
        })
    },
    GetByUsername:(req, res)=>{
        Players.find({
            username: req.params.username
        }).then(player=>{
            res.json(player);
        })
    },
    GetByCode: (req, res)=>{
        Players.find({
            game_code: req.params.gameCode
        }).then(players =>{
            res.json(players);
        })
    },
    Post: (req, res)=>{
        if (!req.body.password) {
            Players.create({
                username: req.body.username,
                game_code: req.body.game_code,
                is_host: false
            }).then(playerData => {
                if (playerData)
                    res.status(200).json(playerData);
                else res.json({message: "error creating user"})
            }).catch(error=>{
                res.status(500).json(error)
            })
        } else {
            Players.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                game_code: Math.random().toString(36).slice(2, 8),
                is_host: true
            }).then(playerData => {
                if (playerData) {
                    res.status(201).json(playerData);
                } else {
                    res.json({message: "error creating user"});
                }
            }).catch(err => {
                res.status(500).json({error: err})
            })
        }
    },
    Put: (req, res)=>{

    },
    Delete: (req, res)=>{
        Players.deleteOne({
            username: req.params.username
        }).then((data)=>{
            res.status(200).json(data[1])
        })
    }
}
module.exports = events;
