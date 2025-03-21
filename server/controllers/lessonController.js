const { Lesson, Group, User, LessonGroup } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class LessonController {
    // Создание нового занятия
    async create(req, res, next) {
        try {
            const { title, type, date, startTime, endTime, teacherId, groupIds } = req.body;

            // Проверка существования преподавателя
            const teacher = await User.findOne({
                where: { id: teacherId, role: 'TEACHER' }
            });

            if (!teacher) {
                return next(ApiError.badRequest('Преподаватель не найден'));
            }

            // Проверка существования групп
            if (groupIds && groupIds.length > 0) {
                const groups = await Group.findAll({
                    where: { id: { [Op.in]: groupIds } }
                });

                if (groups.length !== groupIds.length) {
                    return next(ApiError.badRequest('Одна или несколько групп не найдены'));
                }
            }

            // Создание занятия
            const lesson = await Lesson.create({
                title,
                type,
                date,
                startTime,
                endTime,
                teacherId
            });

            // Связывание занятия с группами
            if (groupIds && groupIds.length > 0) {
                await Promise.all(groupIds.map(groupId =>
                    LessonGroup.create({ lessonId: lesson.id, groupId })
                ));
            }

            // Получение полной информации о созданном занятии
            const createdLesson = await Lesson.findByPk(lesson.id, {
                include: [
                    {
                        model: Group,
                        through: { attributes: [] } // Исключаем атрибуты промежуточной таблицы
                    },
                    {
                        model: User,
                        as: 'teacher',
                        attributes: ['id', 'fio', 'email'] // Выбираем только нужные атрибуты преподавателя
                    }
                ]
            });

            return res.status(201).json(createdLesson);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    // Получение всех занятий
    async getAll(req, res, next) {
        try {
            // Параметры фильтрации
            const { type, teacherId, groupId, date } = req.query;
            const where = {};

            // Применяем фильтры, если они указаны
            if (type) where.type = type;
            if (teacherId) where.teacherId = teacherId;
            if (date) where.date = date;

            // Базовый запрос
            const query = {
                where,
                include: [
                    {
                        model: Group,
                        through: { attributes: [] }
                    },
                    {
                        model: User,
                        as: 'teacher',
                        attributes: ['id', 'fio', 'email']
                    }
                ],
                order: [['date', 'ASC'], ['startTime', 'ASC']]
            };

            // Если указан groupId, фильтруем по группе
            if (groupId) {
                query.include[0].where = { id: groupId };
            }

            const lessons = await Lesson.findAll(query);
            return res.json(lessons);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    // Получение занятия по ID
    async getById(req, res, next) {
        try {
            const lesson = await Lesson.findByPk(req.params.id, {
                include: [
                    {
                        model: Group,
                        through: { attributes: [] },
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'fio', 'email'],
                                where: { role: 'STUDENT' }
                            }
                        ]
                    },
                    {
                        model: User,
                        as: 'teacher',
                        attributes: ['id', 'fio', 'email']
                    }
                ]
            });

            if (lesson) {
                return res.json(lesson);
            } else {
                return next(ApiError.badRequest('Занятие не найдено'));
            }
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    // Обновление занятия по ID
    async update(req, res, next) {
        try {
            const { title, type, date, startTime, endTime, teacherId, groupIds } = req.body;
            const lessonId = req.params.id;

            // Проверка существования занятия
            const lesson = await Lesson.findByPk(lessonId);
            if (!lesson) {
                return next(ApiError.badRequest('Занятие не найдено'));
            }

            // Проверка существования преподавателя, если он указан
            if (teacherId) {
                const teacher = await User.findOne({
                    where: { id: teacherId, role: 'TEACHER' }
                });

                if (!teacher) {
                    return next(ApiError.badRequest('Преподаватель не найден'));
                }
            }

            // Обновление основных данных занятия
            await lesson.update({
                title: title || lesson.title,
                type: type || lesson.type,
                date: date || lesson.date,
                startTime: startTime || lesson.startTime,
                endTime: endTime || lesson.endTime,
                teacherId: teacherId || lesson.teacherId
            });

            // Обновление связей с группами, если они указаны
            if (groupIds) {
                // Проверка существования групп
                if (groupIds.length > 0) {
                    const groups = await Group.findAll({
                        where: { id: { [Op.in]: groupIds } }
                    });

                    if (groups.length !== groupIds.length) {
                        return next(ApiError.badRequest('Одна или несколько групп не найдены'));
                    }
                }

                // Удаление старых связей
                await LessonGroup.destroy({ where: { lessonId } });

                // Создание новых связей
                if (groupIds.length > 0) {
                    await Promise.all(groupIds.map(groupId =>
                        LessonGroup.create({ lessonId, groupId })
                    ));
                }
            }

            // Получение обновленного занятия с полной информацией
            const updatedLesson = await Lesson.findByPk(lessonId, {
                include: [
                    {
                        model: Group,
                        through: { attributes: [] }
                    },
                    {
                        model: User,
                        as: 'teacher',
                        attributes: ['id', 'fio', 'email']
                    }
                ]
            });

            return res.json(updatedLesson);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    // Удаление занятия по ID
    async delete(req, res, next) {
        try {
            const lessonId = req.params.id;
            const lesson = await Lesson.findByPk(lessonId);

            if (!lesson) {
                return next(ApiError.badRequest('Занятие не найдено'));
            }

            // Удаление связей с группами
            await LessonGroup.destroy({ where: { lessonId } });

            // Удаление самого занятия
            await lesson.destroy();

            return res.json({ message: 'Занятие успешно удалено' });
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }
}

module.exports = new LessonController();
