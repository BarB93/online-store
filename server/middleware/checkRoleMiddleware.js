const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

module.exports = function (role) {
    return function (req, res, next) {
        if(req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return next(ApiError.unauthorized())
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            if(typeof role === 'string') {
                if(decoded.role !== role) {
                    return res.status(403).json({message: 'Not access'})
                } 
            } else if(Array.isArray(role)) {
                if(!role.some(r => r === decoded.role)) {
                    return res.status(403).json({message: 'Not access'})
                }
            }

            req.user = decoded
            next()
        } catch(e) {
            return next(ApiError.unauthorized()) 
        }
    }
}