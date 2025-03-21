const Router = require('express')
const userRouter = require('./userRouter')
const groupRouter = require('./groupRouter')
const lessonRouter = require('./lessonRouter')
const router = new Router()

router.use('/user', userRouter)
router.use('/group',  groupRouter)
router.use('/lesson', lessonRouter)

module.exports = router