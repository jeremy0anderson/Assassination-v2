const {Schema, model} = require('mongoose');


const activePlayerSchema = new Schema({
    username: {
        type: String,
        required:"Player required"
    },
    game_code: {
        type: String,
        required:"game code or room required"
    },
})
const ActivePlayers = model('activePlayers', activePlayerSchema);

module.exports = ActivePlayers;
