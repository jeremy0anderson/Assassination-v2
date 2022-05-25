const playerEvents = require('./playersHandler');
const authEvents = require('./authorize');
const api = {
    playerEvents,
    authEvents
}
module.exports = api;
