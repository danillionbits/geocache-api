const BaseController = require('./baseController');
const restServer = require('../restServer');

class ImagesController extends BaseController {
  constructor(baseName, server) {
    super(baseName, server);
  }
}

module.exports = new ImagesController('images', restServer);