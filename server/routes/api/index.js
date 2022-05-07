const router = require('express').Router();
const playerRoutes = require('./players');
router.use('/players', playerRoutes);
module.exports = router;