const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const playerSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: "Must have a username"
    },
    game_code: {
        type: String,
        required: "must have a valid game code"
    },
    first_name: String,
    last_name: String,
    email: String,
    password: String
},{
    toJSON:{
        virtuals: true,
        getters: true
    }
});
playerSchema.virtual('host').get(function(){
    if (this.password){
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            username: this.username,
            game_code: this.game_code,
            is_host: true
        }
    }
})
playerSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
});
const Players = model('players', playerSchema);

module.exports = Players;