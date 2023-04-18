const baseRoutes = require('./baseRoutes');
const FavoritesController = require('../controllers/favoritesController');

const router = baseRoutes(FavoritesController);

module.exports = router;