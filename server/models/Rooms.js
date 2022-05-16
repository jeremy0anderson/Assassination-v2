const {Mongoose, Schema, model} = require('mongoose');

const roomSchema = new Schema({
    game_code: {
        type: String,
        ref: ""
    },
    players: {
        type: Schema.Types.Array,
        ref: "Players"
    },
});
const Rooms = model("rooms", roomSchema);
module.exports = Rooms;
