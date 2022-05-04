const jwt            = require('jsonwebtoken')
const bcrypt         = require('bcrypt')
const ApiError       = require('../error/ApiError')
const {User, Basket} = require('../models/models')

const generateJWT = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, role})
        await Basket.create({userId: user.id})
        const token = generateJWT(user.id, user.email, user.role)

        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user) {
            return next(ApiError.badRequest('Пользователя с таким email не существует'))
        }
        const comperedPassword = bcrypt.compareSync(password, user.password)
        if(!comperedPassword) {
            return next(ApiError.badRequest('Неправильный email или пароль'))
        }
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }

    async checkAuth(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()