const BaseController = require('./baseController');
const restServer = require('../restServer');

class MessagesController extends BaseController {
  constructor(baseName, server) {
    super(baseName, server);
  }
}

module.exports = new MessagesController('messages', restServer);