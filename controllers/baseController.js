const { authenticateToken } = require("../utils/auth");

class BaseController {
    constructor(baseName, server) {
        this.baseName = baseName;
        this.model = require("../models/" + baseName + "Model");
        this.server = server;

        this.addDefaultRoutes();
    }

    async create(req, res, next) {
        const data = req.body;
        try {
            const result = await this.model.create(req.body);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
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

            const filters = {};
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

            const result = await this.model.findAll({
                where: filters,
                include,
                limit,
                offset,
                order: sort
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
            const result = await this.model.findByPk(id, { include });
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
        const id = req.params.id;
        const data = req.body;
        try {
            const result = await this.model.update(data, { where: { [this.primaryKey]: id } });
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
        const id = req.params.id;
        try {
            const result = await this.model.destroy(data, { where: { [this.primaryKey]: id } });
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

    addDefaultRoutes() {
        const self = this;

        self.server.get('/' + self.baseName, authenticateToken, function (req, res, next) {
            self.getAll(req, res, next);
        });

        self.server.get('/' + self.baseName + '/:id', authenticateToken, function (req, res, next) {
            self.getById(req, res, next);
        });

        self.server.post('/' + self.baseName, authenticateToken, function (req, res, next) {
            self.create(req, res, next);
        });

        self.server.put('/' + self.baseName + '/:id', authenticateToken, function (req, res, next) {
            self.updateById(req, res, next);
        });

        self.server.delete('/' + self.baseName + '/:id', authenticateToken, function (req, res, next) {
            self.deleteById(req, res, next);
        });
    }
}

module.exports = BaseController;