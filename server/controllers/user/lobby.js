const {Hosts, Players, Active}=require('../../models');

const events = {
    GetByGame: (req, res)=>{
        let activePlayers = [];
        Hosts.find({
            game_code: req.params.gameCode
        }).then(hostsArr => {
            if (hostsArr.length === 1) {
                activePlayers.push(hostsArr[0]);
            } else console.log("can't have two hosts");
        }).catch(err=>{
            if (err){
                throw err;
                console.log(err);
            }
        });
        Players.find({
            game_code: req.params.gameCode
        }).then(playersArr => {
            activePlayers.push(playersArr);
        }).catch(err=> {
            if (err) {
                throw err;
                console.log(err);
            }
        });
        // Active.find({
        // }).then(actives => {
        //     res.json(actives);
        // })
        const io = req.app.get('io');
        const gameNSP = io.of(`${req.params.gameCode}`);
        gameNSP.on('connection', (socket)=>{
            console.log(`${socket.id} connected`)
        })
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