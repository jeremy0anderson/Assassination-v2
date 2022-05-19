const {Schema, model} = require('mongoose');


const activePlayerSchema = new Schema({
    player: {
        type: String,
        required:"Player required"
    },
    game_code: {
        type: String,
        required:"game code or room required"
    },
    socket_id: {
        type: String,
        required:"socket connection is required"
    }

}, {
    toJSON:{
        virtuals: true
    }
});

const ActivePlayers = model('activePlayers', activePlayerSchema);

module.exports = ActivePlayers;
