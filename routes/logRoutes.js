const baseRoutes = require('./baseRoutes');
const LogController = require('../controllers/logController');

const router = baseRoutes(LogController);

module.exports = router;