const Router = require('express')
const router = new Router
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check) // Проверка авторизации пользователя
router.put('/:id', userController.update) // Обновление данных пользователя по ID
router.delete('/:id', userController.delete) // Удаление пользователя по ID
router.post('/clear', userController.clearUsers) // Очистка таблицы пользователей и сброс автоинкремента

module.exports = router
