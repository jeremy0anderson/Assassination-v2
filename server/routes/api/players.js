const router = require('express').Router();
const {Players} = require('../../models');
const {api} = require('../../controllers');

router.get('/', (req, res)=>{
    api.playerEvents.Get(req, res);
});
router.route('/:username')
    .get((req, res)=>{
        api.playerEvents.GetByUsername(req, res);
    })
    .delete((req, res)=>{
        api.playerEvents.Delete(req, res);
    })
router.get('/code/:gameCode', (req, res)=>{
    api.playerEvents.GetByCode(req, res);
})
router.post('/', (req, res)=>{
    api.playerEvents.Post(req, res);
});


module.exports = router;