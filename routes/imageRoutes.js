const baseRoutes = require('./baseRoutes');
const ImagesController = require('../controllers/imagesController');

const router = baseRoutes(ImagesController);

module.exports = router;