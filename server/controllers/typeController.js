const {Type}   = require('../models/models')
const ApiError = require('../error/ApiError')
class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            let type = await Type.findOne({where: {name}})
            if(type !== null) return next(ApiError.badRequest('Тип с таким названием уже существует'))
            type = await Type.create({name}) 
            return res.json(type)   

        } catch(e) {
            next(ApiError.badRequest(e))
        }
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()