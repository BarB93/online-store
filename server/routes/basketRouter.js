const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', authMiddleware, basketController.getBasketDevices)
router.post('/', checkRoleMiddleware(['ADMIN', 'USER']), basketController.addDevice)
router.get('/quantity', authMiddleware, basketController.getQuantity)
router.put('/quantity', authMiddleware, basketController.setQuantity)

module.exports = router 