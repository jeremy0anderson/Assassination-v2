const {Mongoose, Schema, model} = require('mongoose');

const roomSchema = new Schema({
    players: {
        type: Schema.Types.Array,
        ref: "Players"
    },
    rooms: {
        type: Schema.Types.Array,
        ref: "Players"
    }
})