const Sequelize = require('sequelize')
import sequelize from "../src/config/database"
const Profile = require('../models/profile')

    let Subject = sequelize.define("Subject", {
      id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      subjectCode : {
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

  module.exports = Subject
  