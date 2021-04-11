const Sequelize = require('sequelize')
import sequelize from "../src/config/database"
const Subject = require('../models/subject')
const Class = require('../models/class')


    let Profile = sequelize.define("profile", {
      id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email : {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      is_Student : {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      is_Teacher : {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }


    },{timestamps : false})



module.exports = Profile