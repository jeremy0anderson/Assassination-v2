const jwt = require('jsonwebtoken');
require('dotenv').config();
//runs JWT authentication
module.exports = {
  signToken: async function ({game_code, username, _id }) {
    const payload = {game_code, username, _id}
      return jwt.sign({data:payload}, "secret", {},
(err, token) => {
            if (err) throw err;
            return token;
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

