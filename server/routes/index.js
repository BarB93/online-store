const Router       = require('express')
const userRouter   = require('./userRouter')
const deviceRouter = require('./deviceRouter')
const brandRouter  = require('./brandRouter')
const typeRouter   = require('./typeRouter')
const router       = new Router()

router.use('/user',   userRouter)
router.use('/device', deviceRouter)
router.use('/type',   typeRouter)
router.use('/brand',  brandRouter)

module.exports = router 