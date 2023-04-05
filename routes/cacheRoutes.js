const baseRoutes = require('./baseRoutes');
const CacheController = require('../controllers/cacheController');

const router = baseRoutes(CacheController);

module.exports = router;