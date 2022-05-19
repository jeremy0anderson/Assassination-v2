const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const playerSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: "Must have a username"
    },
    game_code: {
        type: String
    },
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    is_host: Boolean,
    role: {
        type: Schema.Types.ObjectId,
        ref: "Roles"
    }
},{
    toJSON:{
        virtuals: true,
        getters: true
    }
});
playerSchema.virtual('host').get(function(){
    if (this.password) {
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            username: this.username,
            game_code: this.game_code,
        }
    }
})
playerSchema.virtual('player').get(function(){
    if (!this.password){
        return {
            username: this.username,
            game_code: this.game_code
        }
    }
})
playerSchema.pre("save", async function(next) {
    if (this.password) {
        this.game_code = Math.random().toString(36).slice(2, 8);
        if (!this.isModified("password")) return next();
        // this.game_code = this.game_code.toUppercase();
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            return next();
        } catch (error) {
            return next(error);
        }
    } else {
        return next();
    }
});
playerSchema.statics.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}
const Players = model('players', playerSchema);
module.exports = Players;
