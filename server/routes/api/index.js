const router = require('express').Router();
const playerRoutes = require('./players');
const authorizeRoutes = require('./authorize');
const lobbyRoutes = require('./lobby');
router.use('/lobby', lobbyRoutes);
router.use('/authorize', authorizeRoutes);
router.use('/players', playerRoutes);
module.exports = router;