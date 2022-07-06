const ApiError = require('../error/ApiError')
const {Basket, BasketDevice} = require('../models/models')

class BasketController {
    async addDevice(req, res, next) {
        const device = req.body
        const user = req.user
        let result

        if(!device) {
            return next(ApiError.badRequest('Not got device'))
        } 
        
        try {
            const basket = await Basket.findOne({
                where: {userId: user.id}
            })
            
            if(!basket) {
                return next(ApiError.badRequest('Basket not exist'))
            }

            const basketDevice = await BasketDevice.findOne({
                where: {
                    basketId: basket.id, 
                    deviceId: device.id,
                }
            })

            if(basketDevice) {
                result = await basketDevice.update({quantity: basketDevice.quantity + 1})
            } else {
                result = await BasketDevice.create({deviceId: device.id, basketId: basket.id})
            }

            res.status(201).json(result)
        } catch(e) {
            return next(ApiError.badRequest('Error happened while add to basket'))
        }
    }

    async getBasketDevices(req, res, next) {
        const user = req.user
        if(!user) return next(ApiError.unauthorized())
        try {
            const basket = await Basket.findOne({where: {userId: user.id}})
            if(!basket) return next(ApiError.badRequest('Basket not found'))
            
            const basketDevices = await BasketDevice.findAll({where: {basketId: basket.id}})
            res.json(basketDevices)

        } catch(e) {
            return next(ApiError.badRequest('Error while get basket devices'))
        }
    }

    async getQuantity(req, res, next) {
        const user = req.user
        let quantity = 0

        if(!user) return next(ApiError.unauthorized())

        try {
            const basket = await Basket.findOne({where: {userId: user.id}})
            if(!basket) return next(ApiError.badRequest('Basket not found'))
    
            const devices = await BasketDevice.findAll({where: {basketId: basket.id}})
            if(devices.length) {
                quantity = devices.reduce(
                    (count, device) => count + device.quantity,
                    0
                )
            }
    
            return res.json(quantity)

        } catch(e) {
            return next(ApiError.forbidden('Error while get quantity items in basket'))
        }
    }

    async setQuantity(req, res, next) {
        const {id, quantity} = req.body
        const user = req.user
        if(!id || !quantity) return next(ApiError.badRequest('Error: id or quantity not specified'))
        if(quantity < 1) return next(ApiError.badRequest('Error: quantity is less than one'))
        
        try{
            const basket = await Basket.findOne({where: {userId: user.id}})
            if(!basket) return next(ApiError.badRequest('Error: basket not found'))
            const data = await BasketDevice.update(
                {quantity},
                {where:{basketId: basket.id, deviceId: id}}
            )
            
            res.json(data[0])
        } catch(e) {
            return next(ApiError.badRequest('Error while set quantity'))
        }
    
    }
}

module.exports = new BasketController()