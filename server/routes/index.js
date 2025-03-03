const Router = require('express')
const userRouter = require('./userRouter')
const groupRouter = require('./groupRouter')
const router = new Router()

router.use('/user', userRouter)
router.use('/group',  groupRouter)

module.exports = router