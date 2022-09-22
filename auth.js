const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require('../constant');
const auth = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query.token || req.body.token;
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        req.user = decoded;
    } catch (e) {
        return res.status(401).send('invalid token');
    }

    return next();
}

module.exports = { auth }