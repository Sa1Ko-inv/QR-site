const {Group, User} = require('../models/models');
const ApiError = require('../error/ApiError');

class GroupController {
    // Создание новой группы
    async create(req, res, next) {
        try {
            const {name} = req.body;

            // Найти минимальный свободный id
            const ids = await Group.findAll({
                attributes: ['id'], // Выборка только id
                order: [['id', 'ASC']], // Сортировка по возрастанию id
            });

            let newId = 1; // Начинаем поиск свободного id с 1
            for (let i = 0; i < ids.length; i++) { // Проходим по списку существующих id (который уже отсортирован по возрастанию).
                if (ids[i].id !== newId) { // Если текущий id группы не совпадает с newId, значит, найдено свободное место.
                    break; // Найден пробел в ID
                }
                newId++;
            }

            // Создание группы с заданным id
            const group = await Group.create({id: newId, name});

            return res.status(201).json(group);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }


    // Получение всех групп с участниками
    async getAll(req, res, next) {
        try {
            const groups = await Group.findAll({include: User}); // Получение всех групп с их участниками
            return res.json(groups); // Возврат списка групп
        } catch (error) {
            return next(ApiError.internal(error.message)); // Обработка ошибки и передача ее в следующий middleware
        }
    }

    // Получение группы по ID с участниками
    async getById(req, res, next) {
        try {
            const group = await Group.findByPk(req.params.id, {include: User}); // Получение группы по ID с ее участниками
            if (group) {
                return res.json(group); // Возврат найденной группы
            } else {
                return next(ApiError.badRequest('Группа не найдена')); // Обработка случая, когда группа не найдена
            }
        } catch (error) {
            return next(ApiError.internal(error.message)); // Обработка ошибки и передача ее в следующий middleware
        }
    }

    // Обновление имени группы по ID
    async update(req, res, next) {
        try {
            const {name} = req.body; // Извлечение нового имени группы из тела запроса
            const group = await Group.findByPk(req.params.id); // Поиск группы по ID
            if (group) {
                group.name = name; // Обновление имени группы
                await group.save(); // Сохранение изменений в базе данных
                return res.json(group); // Возврат обновленной группы
            } else {
                return next(ApiError.badRequest('Группа не найдена')); // Обработка случая, когда группа не найдена
            }
        } catch (error) {
            return next(ApiError.internal(error.message)); // Обработка ошибки и передача ее в следующий middleware
        }
    }

    // Удаление группы по ID
    async delete(req, res, next) {
        try {
            const group = await Group.findByPk(req.params.id); // Поиск группы по ID
            if (group) {
                await group.destroy(); // Удаление группы из базы данных
                return res.json({message: 'Группа успешна удалена'}); // Возврат сообщения об успешном удалении
            } else {
                return next(ApiError.badRequest('Группа не найдена')); // Обработка случая, когда группа не найдена
            }
        } catch (error) {
            return next(ApiError.internal(error.message)); // Обработка ошибки и передача ее в следующий middleware
        }
    }
}

module.exports = new GroupController();