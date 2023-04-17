const baseRoutes = require('./baseRoutes');
const FavoriteController = require('../controllers/favoriteController');

const router = baseRoutes(FavoriteController);

module.exports = router;