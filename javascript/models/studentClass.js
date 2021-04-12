const Sequelize = require('sequelize')
import sequelize from "../src/config/database"
const ProfileClass = require('./profileClass')
const Profile = require('./profile')

const StudentClass = sequelize.define("student_class", {
    classSubjectID: {
        type: Sequelize.INTEGER,
        references: {
            model: ProfileClass,
            key: 'id'
        }
    },
    studentID: {
        type: Sequelize.INTEGER,
        references: {
            model: Profile,
            key: 'id'
        }
    }
}, {timestamps : false})

module.exports = StudentClass
