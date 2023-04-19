const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const BaseController = require('./baseController');
const restServer = require('../restServer');

class UsersController extends BaseController {
  constructor(baseName, server) {
    super(baseName, server);
    this.addRoutes();
  }

  async login(req, res, next) {
    const { username, password } = req.body;
    try {
      const user = await usersModel.findOne({ where: { username } });
      if (!user) {
        return res.status(404).send('User not found');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send('Incorrect password');
      }
      const token = jwt.sign({ userID: user.userID, username: user.username }, 'secret_key');
      res.json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  async register(req, res, next) {
    const data = req.body;
    try {
      const hash = await bcrypt.hash(data.password, 10);
      const result = await usersModel.create({ ...data, password: hash });
      const token = jwt.sign({ userID: user.userID, username: user.username }, 'secret_key');
      res.json({ user: result, token });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

  addRoutes() {
    const self = this;

    restServer.post('/login', function (req, res, next) {
      self.login(req, res, next);
    });

    restServer.post('/register', function (req, res, next) {
      self.register(req, res, next);
    });
  }
}

module.exports = new UsersController('users', restServer);