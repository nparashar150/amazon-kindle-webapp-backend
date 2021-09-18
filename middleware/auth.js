const jwt = require('jsonwebtoken');
const config = process.env;
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        res.status(403).sen('A token is required for Auth.');
    }
    try {
        const decode = jwt.verify(token, config.TOKEN_KEY);
        req.user = decode;
    }
    catch (error) {
        return res.status(401).send('Invalid Token');
    }
    return next();
}
module.exports = verifyToken;