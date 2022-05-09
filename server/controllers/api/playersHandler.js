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
                username: req.params.username,
                game_code: req.params.game_code,
            }).then(playerData => {
                if (playerData)
                    res.redirect("/")
                else res.json({message: "error creating user"})
            })
        } else if (req.body.password){
            Players.create({
                first_name: req.params.first_name,
                last_name: req.params.last_name,
                username: req.params.username,
                email: req.params.email,
                password: req.params.password,
                game_code: Math.random().toString(36).slice(2,8)
            }).then(playerData => {
                console.log(playerData);
                if (playerData) res.redirect("/");
                else res.json({message: "error creating user"});
            })
        }
    },
    Put: (req, res)=>{

    },
    Delete: (req, res)=>{

    }
}
module.exports = events;