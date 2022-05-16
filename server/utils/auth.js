const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  signToken: function ({game_code, username, _id }, req, res) {
    const payload = {game_code, username, _id}
      return jwt.sign({data:payload}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXP},
(err, token) => {
            if (err) throw err;
            return res.status(200).json({accessToken: token});
        });
      },
    verifyToken: function(token){
      try{
            jwt.verify(token, process.env.JWT_SECRET,{},(err, decoded)=>{
                if (err) throw err;
                console.log(decoded);
                return decoded;
            })
      } catch(e){
            if (e)
                throw e;
      }
    }
};

