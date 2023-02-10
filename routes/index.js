const Router = require('express')
const router = new Router()

const userRouter = require('./user.routes')
const terminalRouter = require('./terminal.routes')
const systemicRouter = require('./systemic.routes')

router.use('/user', userRouter)
router.use('/terminal', terminalRouter)
router.use('/systemic', systemicRouter)

module.exports = router
