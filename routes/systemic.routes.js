const Router = require('express')
const router = new Router()

const SystemicController = require("../controllers/systemic.controller")


router.post('/uploadFiles', SystemicController.uploadFiles)

module.exports = router;