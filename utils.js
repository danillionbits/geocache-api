const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

function parseFilters(queryParams) {
  const filters = {};

  if (Object.keys(queryParams).length > 0) {
    for (const [key, value] of Object.entries(queryParams)) {
      // Check if the filter key has the format "attribute[operator]"
      const match = key.match(/^(.+)\[(.+)\]$/);
      if (match) {
        const attribute = match[1];
        const operator = match[2];
        if (!filters[attribute]) {
          filters[attribute] = {};
        }
        filters[attribute][Op[operator]] = value;
      } else {
        // If the filter key does not have an operator, use the equality operator
        filters[key] = value;
      }
    }
  }

  return filters;
}


function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }
    req.user_id = decoded.user_id;
    //next();
  });
}

module.exports = {
  parseFilters,
  verifyToken
};
