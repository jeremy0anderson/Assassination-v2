const router = require('express').Router();
const lobby = require('./lobby');
const home = require('./home');
router.use('/lobby', lobby);
router.use('/',home);
module.exports = router;