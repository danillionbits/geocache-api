const cacheModel = require('../models/cachesModel');
const BaseController = require('./baseController');
const restServer = require('../restServer');
const { verifyToken } = require('../utils');

class CachesController extends BaseController {
  constructor(baseName, server) {
     super(baseName, server);
  }
/*
  async create(req, res) {
    verifyToken(req, res);
    const data = req.body;
    try {
      const result = await cacheModel.create(data);
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
  }

  async getAll(req, res, next) {
    verifyToken(req, res, next);
    const filters = parseFilters(req.query);

    try {
      const result = await cacheModel.findAll({
        where: filters,
        include: [
          {
            model: Log,
            as: 'logs',
            where: {
              userID: req.user_id
            },
            required: false
          }
        ]
      });
      result.forEach(cache => {
        cache.foundByCurrentUser = cache.logs && cache.logs.length > 0;
        delete cache.logs;
      });
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
  }

  async getById(req, res, next) {
    verifyToken(req, res, next);
    const id = req.params.id;
    const filters = parseFilters(req.query);

    try {
      const result = await cacheModel.findByPk(id, {
        where: filters,
        include: [
          {
            model: User,
            as: 'user'
          }, {
            model: Image,
            as: 'images'
          }, {
            model: Log,
            as: 'logs',
            where: { userID: user_id, logType: 'found' },
            required: false
          }
        ]
      });
      if (!result) {
        return res.status(404).send('Not found');
      } else {
        const cache = result.toJSON();
        cache.foundByCurrentUser = cache.logs && cache.logs.length > 0;
        delete cache.logs;
        return res.json(cache);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
  }

  async updateById(req, res, next) {
    verifyToken(req, res, next);
    const id = req.params.id;
    const data = req.body;
    try {
      const result = await cacheModel.update(data, { where: { cacheID: id } });
      if (result[0] === 0) {
        return res.status(404).send('Not found');
      } else {
        return res.json({ message: 'Updated successfully' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
  }

  async deleteById(req, res, next) {
    verifyToken(req, res, next);
    const id = req.params.id;
    try {
      const result = await cacheModel.destroy({ where: { cacheID: id } });
      if (result === 0) {
        return res.status(404).send('Not found');
      } else {
        return res.json({ message: 'Deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
  }
  */
}

module.exports = new CachesController('caches', restServer);
