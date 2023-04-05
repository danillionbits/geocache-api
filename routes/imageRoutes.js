const baseRoutes = require('./baseRoutes');
const ImageController = require('../controllers/imageController');

const router = baseRoutes(ImageController);

module.exports = router;