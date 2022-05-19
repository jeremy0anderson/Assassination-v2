const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/assassination_db",
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err)=>{
    if (err){
        console.log(err)
        throw err;
    }
});


module.exports = mongoose;