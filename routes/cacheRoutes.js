const baseRoutes = require('./baseRoutes');
const CachesController = require('../controllers/cachesController');

const router = baseRoutes(CachesController);

module.exports = router;