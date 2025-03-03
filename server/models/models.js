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

Group.hasMany(User)
User.belongsTo(Group)

module.exports = {
    User,
    Group
}