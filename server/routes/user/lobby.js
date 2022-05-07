const router = require('express').Router();
const {user} = require('../../controllers');
const {Hosts, Players, Active} = require('../../models');
let activeUsers = [];
router.get('/', (req, res)=>{
    user.lobbyEvents.GetByGame(req, res);
})
router.get('/:gameCode', (req, res)=> {
    const io = req.app.get('io');
    let gameNSP = io.of(`/${req.params.gameCode}`);
    gameNSP.on('connection', (socket)=>{
        console.log(socket.id);
    })
    Hosts.find({
        game_code: req.params.gameCode
    }).then(hosts => {
        activeUsers.push({
            username: hosts.username,
            game_code: hosts.game_code
        });
    });
    Players.find({
        game_code: req.params.gameCode
    }).then(players => {
        players.forEach(player => {
            activeUsers.push({
                username: player.username,
                game_code: player.game_code
            });
        });
    })
    res.json(activeUsers);
});


module.exports=router;

