const sequelize = require('./../db');
const {DataTypes} = require('sequelize');
const {parse, format, isValid} = require('date-fns');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING,},
    fio: {type: DataTypes.STRING,},
    role: {type: DataTypes.ENUM('STUDENT', 'TEACHER'), allowNull: false,},
    groupId: {type: DataTypes.INTEGER, allowNull: true}
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
    date: {
        type: DataTypes.DATEONLY, allowNull: false,
        get() {
            const rawValue = this.getDataValue('date');
            return rawValue ? format(new Date(rawValue), 'dd/MM/yyyy') : null;
        },
        set(value) {
            const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
            this.setDataValue('date', format(parsedDate, 'yyyy-MM-dd'));
        }
    }, // Дата проведения
    startTime: {
        type: DataTypes.TIME, allowNull: false,
        get() {
            const rawValue = this.getDataValue('startTime');
            return rawValue ? format(new Date(`1970-01-01 ${rawValue}`), 'HH:mm') : null;
        },
        set(value) {
            // Принимаем строку в формате HH:mm и преобразуем в формат TIME
            const [hours, minutes] = value.split(':');
            const timeString = `${hours}:${minutes}:00`;
            this.setDataValue('startTime', timeString);
        }
    }, // Время начала
    endTime: {
        type: DataTypes.TIME, allowNull: false,
        get() {
            const rawValue = this.getDataValue('endTime');
            return rawValue ? format(new Date(`1970-01-01 ${rawValue}`), 'HH:mm') : null;
        },
        set(value) {
            // Принимаем строку в формате HH:mm и преобразуем в формат TIME
            const [hours, minutes] = value.split(':');
            const timeString = `${hours}:${minutes}:00`;
            this.setDataValue('endTime', timeString);
        }
    }, // Время окончания
    teacherId: {type: DataTypes.INTEGER, allowNull: false}, // ID преподавателя
    attendanceCode: {type: DataTypes.STRING, allowNull: true}, // Уникальный код для отметки посещаемости
    attendanceActive: {type: DataTypes.BOOLEAN, defaultValue: false} // Флаг активности отметки посещаемости
});

// Промежуточная таблица для связи многие-ко-многим между занятиями и группами
const LessonGroup = sequelize.define('lesson_group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

// Модель для отслеживания посещаемости
const Attendance = sequelize.define('attendance', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    present: {type: DataTypes.BOOLEAN, defaultValue: true}, // Присутствовал ли студент
    markedAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}, // Время отметки
});

// Связи между моделями
Group.hasMany(User);
User.belongsTo(Group, {as: 'group'});

// Связь многие-ко-многим между занятиями и группами
Lesson.belongsToMany(Group, {through: LessonGroup});
Group.belongsToMany(Lesson, {through: LessonGroup});

// Связь между занятием и преподавателем
User.hasMany(Lesson, {foreignKey: 'teacherId'});
Lesson.belongsTo(User, {foreignKey: 'teacherId', as: 'teacher'});

// Связи для посещаемости
Lesson.hasMany(Attendance);
Attendance.belongsTo(Lesson);

User.hasMany(Attendance);
Attendance.belongsTo(User);

module.exports = {
    User,
    Group,
    Lesson,
    LessonGroup,
    Attendance
}