const baseRoutes = require('./baseRoutes');
const MessagesController = require('../controllers/messagesController');

const router = baseRoutes(MessagesController);

module.exports = router;