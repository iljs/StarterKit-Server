const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(200).json({
                status: "Error",
                code: -1
            })
        }

        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (e) {
        res.status(200).json({
            status: "Error",
            code: -2
        })
    }
};