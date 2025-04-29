const { Attendance, Lesson, User, Group} = require('../models/models');
const ApiError = require('../error/ApiError');

class AttendanceController {
    // Студент отмечает посещение
    async markAttendance(req, res, next) {
        const { lessonId, attendanceCode } = req.body;
        const userId = req.user.id; // Предполагая, что идентификатор пользователя доступен из промежуточного программного обеспечения авторизации.

        try {
            // Получить данные занятия
            const lesson = await Lesson.findByPk(lessonId, {
                include: [{ model: Group, as: 'groups' }] // Используем alias 'groups' для связи Lesson <-> Group
            });

            if (!lesson) {
                return res.status(404).json({ message: 'Занятие не найдено' });
            }

            // Проверить, совпадает ли код посещаемости
            if (lesson.attendanceCode !== attendanceCode) {
                return res.status(400).json({ message: 'Неверный код посещения' });
            }

            // Проверить, не отметился ли студент уже
            const existingAttendance = await Attendance.findOne({
                where: {
                    lessonId,
                    userId
                }
            });

            if (existingAttendance) {
                return res.status(400).json({ message: 'Вы уже отметили посещение этого занятия' });
            }

            // Получить группы, к которым принадлежит пользователь
            const user = await User.findByPk(userId, {
                include: [{ model: Group, as: 'group' }] // Используем alias 'group' для связи User <-> Group
            });

            if (!user) {
                return res.status(404).json({ message: 'Участник не найден' });
            }

            const userGroupIds = user.group ? [user.group.id] : []; // Убедиться, что group не null
            const lessonGroupIds = lesson.groups.map((group) => group.id);

            // Проверить, принадлежит ли пользователь к группе занятия
            const isInGroup = lessonGroupIds.some((groupId) => userGroupIds.includes(groupId));

            if (!isInGroup) {
                return res.status(403).json({ message: 'Вы не являетесь частью какой-либо группы, связанной с этим уроком' });
            }

            // Отметить посещаемость
            await Attendance.create({
                lessonId,
                userId,
                present: true,
                markedAt: new Date()
            });

            return res.status(200).json({ message: 'Посещаемость отмечена успешно' });
        } catch (error) {
            console.error('Ошибка при отметке посещаемости:', error);
            return res.status(500).json({ message: 'Internal server error' });
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
