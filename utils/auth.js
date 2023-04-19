const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401);

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized');
        }
        req.user = {
            userID: decoded.userID,
            username: decoded.username
        };
        next();
    });
}

module.exports = {
    authenticateToken
};