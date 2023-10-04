const jwt = require('jsonwebtoken');
const createError = require('./error');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) next(createError(401, "you are not authenticated!"));
    jwt.verify(token, "shshshs", (err, data) => {
        if (err) next(createError(403, "token is not valid!"));
        req.user = data; //req.hello <-- any name you can give
        next();
        // res.send(data);
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
            next(createError(401, "you are not authenticated!"));
        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            next(createError(401, "you are not a Admin!"));
        }
    })
}

module.exports = { verifyToken, verifyUser, verifyAdmin };