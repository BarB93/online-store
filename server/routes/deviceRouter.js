const Router           = require('express')
const router           = new Router()
const deviceController = require('../controllers/deviceController')

router.get('/',    deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.post('/',   deviceController.create)

module.exports = router