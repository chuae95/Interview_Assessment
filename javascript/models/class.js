const Sequelize = require('sequelize')
import sequelize from "../src/config/database"
const Profile = require('../models/profile')

let Class = sequelize.define("Class", {
      id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      classCode : {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name : {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    }, {timestamps : false})



module.exports = Class
  
    