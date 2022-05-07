const {Hosts, Players, Active} = require('../../models');
const events = {
    Get: (req, res)=>{
        Hosts.find({}).select('-password').then(hostData => {
            res.status(200).json(hostData);
        })
    },
    Post: (req, res)=>{
        let testHost = new Hosts({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        testHost.save()
            .then(newHost => {
            let newActive = new Active({
                username: newHost.username,
                game_code: newHost.game_code
            });
            newActive.save()
                .then(active=>{
                    res.status(201).json(active);
                })
        }).catch((err)=>{
            if (err)
            res.json(err);
        })
    }
};
module.exports = events;