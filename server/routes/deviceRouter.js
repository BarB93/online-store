const Router           = require('express')
const router           = new Router()
const deviceController = require('../controllers/deviceController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/',    deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.post('/', checkRoleMiddleware('ADMIN'), deviceController.create)

module.exports = router