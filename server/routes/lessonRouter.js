const Router = require('express');
const router = new Router();
const lessonController = require('../controllers/lessonController');
const checkRole = require('../middleware/checkRoleMiddleware');

// Маршруты для занятий (только преподаватели могут создавать, обновлять и удалять)
router.post('/', checkRole('TEACHER'), lessonController.create);
router.get('/', lessonController.getAll);
router.get('/:id', lessonController.getById);
router.put('/:id', checkRole('TEACHER'), lessonController.update);
router.delete('/:id', checkRole('TEACHER'), lessonController.delete);

module.exports = router;
