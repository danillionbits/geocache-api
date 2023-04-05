const baseRoutes = require('./baseRoutes');
const UserController = require('../controllers/userController');

const router = baseRoutes(UserController);

module.exports = router;
