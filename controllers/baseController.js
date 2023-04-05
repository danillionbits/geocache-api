const sequelize = require("../db");

class BaseController {
    constructor(modelName, primaryKey) {
        this.modelName = modelName;
        this.primaryKey = primaryKey;
    }

    async create(req, res) {
        const data = req.body;
        try {
            const result = await sequelize[this.modelName].create(data);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    async getAll(req, res) {
        try {
            console.log(this.primaryKey);
            const result = await sequelize[this.modelName].findAll();
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    }

    async getById(req, res) {
        const id = req.params.id;
        try {
            const result = await sequelize[this.modelName].findByPk(id);
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
            const result = await sequelize[this.modelName].update(data, { where: { id: id } });
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
            const result = await sequelize[this.modelName].destroy({ where: { id: id } });
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

module.exports = BaseController;