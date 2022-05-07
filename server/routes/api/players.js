const router = require('express').Router();
const {Players} = require('../../models');
const {api} = require('../../controllers');

router.get('/', (req, res)=>{
    api.playerEvents.Get(req, res);
});
router.get('/:username', (req, res)=>{
    api.playerEvents.GetByUsername(req, res);
})
router.post('/', (req, res)=>{
    api.playerEvents.Post(req, res);
});



module.exports = router;