const Router = require('express');
const router = new Router();
const groupController = require('../controllers/groupController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('TEACHER'),  groupController.create) // Добавить новую группу
router.get('/', groupController.getAll) // Получить всех участников всех групп
router.get('/:id', groupController.getById) // Получить участников определенной группы по ID
router.put('/:id', checkRole('TEACHER'), groupController.update) // Редактировать имя группы по ID
router.delete('/:id', checkRole('TEACHER'), groupController.delete) // Удалить группу по ID

module.exports = router;
