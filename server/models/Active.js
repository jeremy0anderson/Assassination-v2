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
    socket_id: {
        type: String
    },
    socket_room:{

    }

})
const ActivePlayers = model('activePlayers', activePlayerSchema);

module.exports = ActivePlayers;
