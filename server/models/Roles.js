const {Schema, model} = require('mongoose');

const roleSchema = new Schema({
    role_id: {
        type: Number,
    },
    title: {
        type: String,
        required: "Need a role title"
    },
    loyalty: {
        type: String
    },
    ability: {
        type: String
    }
}, {
    toJSON:{
        virtuals: true
    }
})
