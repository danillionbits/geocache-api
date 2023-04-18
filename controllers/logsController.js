const BaseController = require('./baseController');
const restServer = require('../restServer');

class LogsController extends BaseController {
  constructor(baseName, server) {
    super(baseName, server);
  }
}

module.exports = new LogsController('logs', restServer);