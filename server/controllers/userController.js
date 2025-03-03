const jwt = require('jsonwebtoken')
const ApiError = require("../error/ApiError");
const {User} = require("../models/models");
const bcrypt = require('bcrypt')

const generateJWT = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, fio, groupId} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректные данные'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({email, role, password: hashPassword, fio, groupId})
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        let comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан не верный пароль'))
        }
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    // Удаление пользователя по ID
    async delete(req, res, next) {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await user.destroy();
                return res.json({message: 'Пользователь успешно удален'});
            } else {
                return next(ApiError.badRequest('Пользователь не найден'));
            }
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    // Обновление данных пользователя по ID
    async update(req, res, next) {
        try {
            const {email, password, role} = req.body;
            const user = await User.findByPk(req.params.id);
            if (user) {
                if (email) user.email = email;
                if (password) user.password = await bcrypt.hash(password, 10);
                if (role) user.role = role;
                await user.save();
                return res.json(user);
            } else {
                return next(ApiError.badRequest('Пользователь не найден'));
            }
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    // Очистка таблицы пользователей и сброс автоинкремента
    async clearUsers(req, res, next) {
        try {
            await User.truncate({restartIdentity: true});
            return res.json({message: 'Таблица пользователей очищена, автоинкремент сброшен'});
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }
}

module.exports = new UserController();