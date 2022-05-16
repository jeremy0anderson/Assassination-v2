const {Schema, model} = require('mongoose');


const activePlayerSchema = new Schema({
    player: {
        type: String,
        required:"Player required"
    },
    room: {
        type: String,
        required:"game code or room required"
    },

})
const ActivePlayers = model('activePlayers', activePlayerSchema);

module.exports = ActivePlayers;
