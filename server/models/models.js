const sequelize = require('./../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING,},
    fio: {type: DataTypes.STRING,},
    role: {type: DataTypes.ENUM('STUDENT', 'TEACHER'), allowNull: false,},
    groupId: { type: DataTypes.INTEGER, allowNull: true }
});

const Group = sequelize.define('group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false},
    name: {type: DataTypes.STRING, allowNull: false,},
});

// Модель занятия
const Lesson = sequelize.define('lesson', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false}, // Название занятия
    type: {type: DataTypes.ENUM('LECTURE', 'LABORATORY', 'PRACTICE'), allowNull: false}, // Тип занятия
    date: {type: DataTypes.DATE, allowNull: false}, // Дата проведения
    startTime: {type: DataTypes.TIME, allowNull: false}, // Время начала
    endTime: {type: DataTypes.TIME, allowNull: false}, // Время окончания
    teacherId: {type: DataTypes.INTEGER, allowNull: false} // ID преподавателя
});

// Промежуточная таблица для связи многие-ко-многим между занятиями и группами
const LessonGroup = sequelize.define('lesson_group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

// Связи между моделями
Group.hasMany(User);
User.belongsTo(Group);

// Связь многие-ко-многим между занятиями и группами
Lesson.belongsToMany(Group, { through: LessonGroup });
Group.belongsToMany(Lesson, { through: LessonGroup });

// Связь между занятием и преподавателем
User.hasMany(Lesson, { foreignKey: 'teacherId' });
Lesson.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });

module.exports = {
    User,
    Group,
    Lesson,
    LessonGroup
}