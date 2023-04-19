const cacheModel = require('../models/cachesModel');
const BaseController = require('./baseController');
const restServer = require('../restServer');
const { verifyToken } = require('../utils');
const logsModel = require("../models/logsModel");

class CachesController extends BaseController {
  constructor(baseName, server) {
    super(baseName, server);
  }

  async getAll(req, res, next) {
    try {
      let limit = 100;
      let offset = 0;
      let range;
      if (req.query.range) {
        range = JSON.parse(req.query.range);
        limit = range[1] - range[0] + 1;
        offset = range[0];
      }

      let sort = [];
      if (req.query.sort) {
        sort = JSON.parse(req.query.sort);
      }

      let filters = {};
      for (let key in req.query) {
        if (!['include', 'range', 'sort'].includes(key)) {
          const values = req.query[key];
          if (values instanceof Object) {
            filters[key] = values;
          } else {
            filters[key] = values.split(',');
          }
        }
      }

      let include = [];
      if (req.query.include) {
        include = req.query.include.split(',').map(i => ({ model: require('../models/' + i + 'Model') }));
      }
      include.push({
        model: logsModel,
        where: { userID: req.user.userID, logType: 'found' },
        required: false
      })

      const result = await this.model.findAll({
        where: filters,
        include,
        limit,
        offset,
        order: sort
      });

      result.forEach(cache => {
        const plainCache = cache.get();
        plainCache.foundByCurrentUser = plainCache.logs && plainCache.logs.length > 0;
        delete plainCache.logs;
        cache.set(plainCache);
      });
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async getById(req, res, next) {
    const id = req.params.id;
    try {
      let include = [];
      if (req.query.include) {
        include = req.query.include.split(',').map(i => ({ model: require('../models/' + i + 'Model') }));
      }

      include.push({
        model: logsModel,
        where: { userID: req.user.userID, logType: 'found' },
        required: false
      })

      const result = await this.model.findByPk(id, { include });
      if (!result) {
        res.status(404).send('Not found');
      } else {
        const cache = result.toJSON();
        cache.foundByCurrentUser = cache.logs && cache.logs.length > 0;
        res.json(cache);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
}

module.exports = new CachesController('caches', restServer);
