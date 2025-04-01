const Router = require('express')
const userRouter = require('./userRouter')
const groupRouter = require('./groupRouter')
const lessonRouter = require('./lessonRouter')
const router = new Router()
const attendanceRouter = require('./attendanceRouter')

router.use('/user', userRouter)
router.use('/group',  groupRouter)
router.use('/lesson', lessonRouter)
router.use('/attendance', attendanceRouter);
module.exports = router