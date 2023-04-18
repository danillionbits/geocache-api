const baseRoutes = require('./baseRoutes');
const LogsController = require('../controllers/logsController');

const router = baseRoutes(LogsController);

module.exports = router;