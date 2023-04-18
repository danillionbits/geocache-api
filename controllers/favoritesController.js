const BaseController = require('./baseController');
const restServer = require('../restServer');

class FavoritesController extends BaseController {
  constructor(baseName, server) {
    super(baseName, server);
  }
}

module.exports = new FavoritesController('favorites', restServer);