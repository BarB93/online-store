const Router              = require('express')
const router              = new Router()
const typeController      = require('../controllers/typeController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', typeController.getAll)
router.post('/', checkRoleMiddleware('ADMIN'), typeController.create)

module.exports = router 