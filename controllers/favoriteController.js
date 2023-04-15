const favoriteModel = require('../models/favoriteModel');
const BaseController = require('./baseController');
const { verifyToken } = require('../utils');

class FavoriteController extends BaseController {
  constructor(modelName, primaryKey) {
    super(modelName, primaryKey);
  }

  async create(req, res) {
    verifyToken(req, res);
    const data = req.body;
    try {
      const result = await favoriteModel.create(data);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async getAll(req, res) {
    verifyToken(req, res);
    try {
      const result = await favoriteModel.findAll();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async getById(req, res) {
    verifyToken(req, res);
    const id = req.params.id;
    try {
      const result = await favoriteModel.findByPk(id);
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
    verifyToken(req, res);
    const id = req.params.id;
    const data = req.body;
    try {
      const result = await favoriteModel.update(data, { where: { favoriteID: id } });
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
    verifyToken(req, res);
    const id = req.params.id;
    try {
      const result = await favoriteModel.destroy({ where: { favoriteID: id } });
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

module.exports = new FavoriteController('favorites', 'favoriteID');
