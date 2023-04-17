const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const BaseController = require('./baseController');
const { verifyToken } = require('../utils');

class UserController extends BaseController {
  constructor(modelName, primaryKey) {
    super(modelName, primaryKey);
  }

  async register(req, res, next) {
    const data = req.body;
    try {
      const hash = await bcrypt.hash(data.password, 10);
      const result = await userModel.create({ ...data, password: hash });
      const token = jwt.sign({ user_id: result.user_id }, 'secret_key');
      res.json({ user: result, token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async login(req, res, next) {
    const { username, password } = req.body;
    try {
      const user = await userModel.findOne({ where: { username } });
      if (!user) {
        return res.status(404).send('User not found');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send('Incorrect password');
      }
      const token = jwt.sign({ user_id: user.user_id }, 'secret_key');
      res.json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async getAll(req, res, next) {
    verifyToken(req, res, next);
    try {
      const result = await userModel.findAll();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async getById(req, res, next) {
    verifyToken(req, res, next);
    const id = req.params.id;
    try {
      const result = await userModel.findByPk(id);
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

  async updateById(req, res, next) {
    verifyToken(req, res, next);
    const id = req.params.id;
    const data = req.body;
    try {
      const result = await userModel.update(data, { where: { id: id } });
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

  async deleteById(req, res, next) {
    verifyToken(req, res, next);
    const id = req.params.id;
    try {
      const result = await userModel.destroy({ where: { id: id } });
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

module.exports = new UserController('users', 'userID');