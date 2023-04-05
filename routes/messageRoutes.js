const baseRoutes = require('./baseRoutes');
const MessageController = require('../controllers/messageController');

const router = baseRoutes(MessageController);

module.exports = router;