const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const {Device, DeviceInfo} = require('../models/models')
const { Op } = require('sequelize')

class DeviceController {
    
    async getAll(req, res) {
        let {typeIds, brandIds, limit, page, minPrice, maxPrice, arrayId} = req.query
        const restult = typeof typeIds
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices
        const options = {
            limit,
            offset,
            where: {}
        }
        const optionsForPriceRange = {where: {}}

        if(brandIds) {
            options.where.brandId = brandIds
            optionsForPriceRange.where.brandId = brandIds
        }
        if(typeIds) {
            options.where.typeId = typeIds
            optionsForPriceRange.where.typeId = typeIds
        } 
        if(minPrice && maxPrice) {
            options.where.price = {
                [Op.gte]: minPrice,
                [Op.lte]: maxPrice,
            }
        }
        else if(minPrice) options.where.price = {[Op.gte]: minPrice}
        else if(maxPrice) options.where.price = {[Op.lte]: maxPrice}
        
        if(arrayId) {
            devices = await Device.findAll({
                where: {id: arrayId},
                include: [{model: DeviceInfo, as: 'info'}]
            })
        }
        else {
            devices = await Device.findAndCountAll(options)

            const min = await Device.min('price', optionsForPriceRange)
            const max = await Device.max('price', optionsForPriceRange)
            devices.minPrice = min
            devices.maxPrice = max
        }

        return res.json(devices)   
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        })

        return res.json(device)
    }

    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName})
    
            if(info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                });
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new DeviceController()