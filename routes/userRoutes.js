const baseRoutes = require('./baseRoutes');
const UsersController = require('../controllers/usersController');

const router = baseRoutes(UsersController);

module.exports = router;
