const cacheModel = require('../models/cacheModel');
const Image = require('../models/imageModel');
const User = require('../models/userModel');
const BaseController = require('./baseController');

class CacheController extends BaseController {
  constructor(modelName, primaryKey) {
    super(modelName, primaryKey);
  }

  async create(req, res) {
    const data = req.body;
    try {
      const result = await cacheModel.create(data);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async getAll(req, res) {
    try {
      const result = await cacheModel.findAll();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async getById(req, res) {
    const id = req.params.id;
    try {
      const result = await cacheModel.findByPk(id, {
        include: [
          {
            model: User,
            as: 'user'
          }, {
            model: Image,
            as: 'images'
          }
        ]
      });
      if (!result) {
        res.status(404).send('Not found');
      } else {
        res.json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async updateById(req, res) {
    const id = req.params.id;
    const data = req.body;
    try {
      const result = await cacheModel.update(data, { where: { cacheID: id } });
      if (result[0] === 0) {
        res.status(404).send('Not found');
      } else {
        res.json({ message: 'Updated successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async deleteById(req, res) {
    const id = req.params.id;
    try {
      const result = await cacheModel.destroy({ where: { cacheID: id } });
      if (result === 0) {
        res.status(404).send('Not found');
      } else {
        res.json({ message: 'Deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
}

module.exports = new CacheController('caches', 'cacheID');
