const router = require('express').Router();
const {api} = require('../../controllers');


router.post('/register',api.authEvents.postRegister);
router.post("/login", api.authEvents.postLogin);


module.exports = router;
