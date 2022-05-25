const {Players} = require('../../models');
const bcrypt = require('bcrypt');
const events = {
    Get: (req, res)=>{

    },
    Post: (req, res)=>{
        const body = req.body;
        Hosts.find({
            username: body.username
        }).then(function(hostData){
            if (!hostData){
                res.status(404).json();
            } else {
                let pass = bcrypt.compareSync(body.password, hostData.password);
                if (pass){
                    console.log("correct");
                } else{
                    console.log('incorrect');
                }
            }
        })
    },
    Put: (req, res)=>{

    },
    Delete: (req, res)=>{

    }
}