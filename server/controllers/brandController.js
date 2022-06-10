const ApiError = require('../error/ApiError')
const {Brand}  = require('../models/models')

class BrandController {
    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
    async create(req, res, next) {
        try {
            const {name} = req.body
            let brand = await Brand.findOne({where: {name}})
            if(brand !== null) return next(ApiError.badRequest('Бренда с таким название уже существует'))
            brand = await Brand.create({name})
            return res.json(brand)
        } catch(e) {
            next(ApiError.badRequest(e))
        }
    }
}

module.exports = new BrandController()