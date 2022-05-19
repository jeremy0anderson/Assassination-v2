const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  signToken: function ({game_code, username, _id }) {
    const payload = {game_code, username, _id}
      return jwt.sign({data:payload}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP},
(err, token) => {
            if (err) throw err;
            return token;
        });
      },
    verifyToken: function(token){
      try{
            jwt.verify(token,process.env.JWT_SECRET,{}
            ,(err, decoded)=>{
                if (err) throw err;
                console.log(decoded);
                return {username: decoded.username,
                        game_code: decoded.game_code};
            })
      } catch(e){
            if (e)
                throw e;
      }
    },
    decodeToken: (token)=>{
    }
};

