const Sequelize = require('sequelize')
import sequelize from "../src/config/database"
const Profile = require('./profile')
const Subject = require('./subject')
const Class = require('./class')

const ProfileClass = sequelize.define("profile_class", {
    teacherID: {
        type: Sequelize.INTEGER,
        references: {
            model: Profile,
            key: "id"
        }
    },
    classID: {
        type: Sequelize.INTEGER,
        references: {
            model: Class,
            key: "id"
        }
    },
    subjectID: {
        type: Sequelize.INTEGER,
        references: {
            model: Subject,
            key: "id"
        }
    }
},  {timestamps : false})

module.exports = ProfileClass