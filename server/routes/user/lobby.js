const router = require('express').Router();
const {user} = require('../../controllers');
const {Players, Active} = require('../../models');
let activeUsers = [];
router.get('/', (req, res)=>{
    user.lobbyEvents.GetByGame(req, res);
})
router.get('/:gameCode', (req, res)=> {
    const io = req.app.get('io');
    let gameNSP = io.of('/game');
    gameNSP.on('connection', (socket)=>{
        console.log(socket.id);
    })
    Players.find({
        game_code: req.params.gameCode
    }).then(players => {
       players.map()
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

router.get('/', (req, res)=>{
    const io = req.app.get('io');
    const gameNSP = io.of("/game");
    io.on('connection', (socket)=>{
        console.log(socket.id);
    })
})
module.exports=router;

