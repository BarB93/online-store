const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const {Device, DeviceInfo} = require('../models/models')

class DeviceController {
    
    async getAll(req, res) {
        let {typeIds, brandIds, limit, page, arrayId} = req.query
        const restult = typeof typeIds
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices
      
        if(arrayId) {
            devices = await Device.findAll({
                where: {id: arrayId},
                include: [{model: DeviceInfo, as: 'info'}]
            })
        }
        else if(!brandIds && !typeIds) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        else if(brandIds && !typeIds) {
            brandIds = brandIds.map(item => Number(item))
            devices = await Device.findAndCountAll({where: {brandId: brandIds}, limit, offset})
        }
        else if(!brandIds && typeIds) {
            typeIds = typeIds.map(item => Number(item))
            devices = await Device.findAndCountAll({where: {typeId: typeIds}, limit, offset})
        }
        else if(brandIds && typeIds) {
            typeIds = typeIds.map(item => Number(item))
            brandIds = brandIds.map(item => Number(item))
            devices = await Device.findAndCountAll({where: {typeId: typeIds, brandId: brandIds}, limit, offset})
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