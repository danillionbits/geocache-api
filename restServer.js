const  express = require('express');
const restServer = express.Router();

restServer.use(function (req, res, next) {
    next();
});

module.exports = express.Router();
