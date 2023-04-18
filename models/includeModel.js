
const sequelize = require("../db");

const Include = {
    caches: [{
        model: sequelize.images,
    }, {
        model: sequelize.users,
    }, {
        model: sequelize.logs,
    }]
}

module.exports = IncludeModel;