const { Attendance, Lesson, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class AttendanceController {
    // Студент отмечает посещение
    async markAttendance(req, res, next) {
        try {
            const { lessonId, attendanceCode } = req.body;
            const studentId = req.user.id;

            // Проверяем существование занятия
            const lesson = await Lesson.findByPk(lessonId);
            if (!lesson) {
                return next(ApiError.badRequest('Занятие не найдено'));
            }

            // Проверяем, активна ли отметка
            if (!lesson.attendanceActive) {
                return next(ApiError.badRequest('Отметка посещаемости не активна'));
            }

            // Проверяем, правильный ли код
            if (lesson.attendanceCode !== attendanceCode) {
                return next(ApiError.badRequest('Неверный код посещаемости'));
            }

            // Проверяем, не отмечался ли студент ранее
            const existingAttendance = await Attendance.findOne({
                where: { lessonId, userId: studentId }
            });

            if (existingAttendance) {
                return next(ApiError.badRequest('Вы уже отметили посещение'));
            }

            // Записываем посещение
            const attendance = await Attendance.create({
                lessonId,
                userId: studentId,
                present: true,
            });

            // Таймер для автоматической деактивации через 5 минут (300000 мс)
            setTimeout(async () => {
                try {
                    await attendance.update({ present: false });
                    console.log(`Посещаемость для студента ${studentId} на занятии ${lessonId} деактивирована`);
                } catch (err) {
                    console.error('Ошибка при деактивации посещаемости:', err);
                }
            }, 300000);

            return res.json({ message: 'Посещаемость отмечена', attendance });
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }
    async getAttendanceForLesson(req, res, next) {
        try {
            const { lessonId } = req.params;

            // Проверяем, существует ли занятие
            const lesson = await Lesson.findByPk(lessonId);
            if (!lesson) {
                return next(ApiError.badRequest('Занятие не найдено'));
            }

            // Получаем список отметившихся студентов
            const attendanceList = await Attendance.findAll({
                where: { lessonId },
                include: [{ model: User, attributes: ['id', 'fio', 'email'] }] // Подгружаем данные студентов
            });

            return res.json(attendanceList);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

}

module.exports = new AttendanceController();
