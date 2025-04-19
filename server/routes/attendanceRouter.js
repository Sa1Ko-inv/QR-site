const Router = require('express');
const router = new Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware');

// Студент отмечает посещение
router.post('/mark', authMiddleware, attendanceController.markAttendance);
router.get('/lesson/:lessonId', attendanceController.getAttendanceForLesson);

module.exports = router;
