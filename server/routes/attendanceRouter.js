const Router = require('express');
const router = new Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware');

// Студент отмечает посещение
router.post('/mark', authMiddleware, attendanceController.markAttendance); //Активация метки
router.get('/lesson/:lessonId', attendanceController.getAttendanceForLesson); // Просмотр посещаемости по занятию

module.exports = router;
