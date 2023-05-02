const jwt = require('jsonwebtoken');

require('dotenv').config()

const authentication = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: 'Login to Continue' });
    }
    jwt.verify(token, process.env.privateKey, function (err, decoded) {
        if (err) {
            return res.status(501).send({ message: err.message })
        }
        req.body.userData = decoded;
        next()
    });
}

module.exports = {
    authentication
}