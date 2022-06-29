const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware(['ADMIN', 'USER']), basketController.add)

module.exports = router 