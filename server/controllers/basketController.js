const ApiError = require('../error/ApiError')
const {Basket, BasketDevice} = require('../models/models')

class BasketController {
    async add(req, res, next) {
        const device = req.body
        const user = req.user
        console.log('in BasketController', device)
        if(!device) {
            return next(ApiError.badRequest('Not got device'))
        } 
        console.log('in BasketController 1')
        const basket = await Basket.findOne({
            where: {
                userId: user.id,
                include: [{model: BasketDevice, as: 'devices'}]
            }
        })
        console.log('in BasketController 2')
        if(!basket) {
            return next(ApiError.badRequest('Basket not exist'))
        }

        if(dev = basket.devices.find(item => item.id === device.id)) {
            console.log('in BasketController3')
            await BasketDevice.update({quantity: dev.quantity + 1})
        } else {
            console.log('in BasketController 4')
            await BasketDevice.create({deviceId: device.id})
        }
        console.log('in BasketController 5')
    }
}

module.exports = new BasketController()