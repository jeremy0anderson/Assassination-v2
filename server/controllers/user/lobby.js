const {Hosts, Players, Active}=require('../../models');
let activePlayers = [];
const events = {
    GetByGame: (req, res)=>{
        Hosts.find({
            game_code: req.params.gameCode
        }).then((hostsArr) => {
            if (hostsArr.length === 1) {
            } else console.log("can't have two hosts");
        }).catch(err=>{
            if (err){
                throw err;
            }
        });
        Players.find({
            game_code: req.params.gameCode
        }).then((playersArr) => {
        }).catch(err=> {
            if (err) {
                throw err;
            }
        });
        // Active.find({
        // }).then(actives => {
        //     res.json(actives);
        // })
    },
    Post: (req, res)=>{
        Active.create({
            username: req.body.username,
            game_code: req.body.game_code
        }).then(actives =>{
            res.status(201).json(actives);
        })
    },
    Get:(req, res)=>{

    }
}

module.exports = events;