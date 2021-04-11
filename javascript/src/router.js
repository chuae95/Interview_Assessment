import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';
import sequelize from "./config/database"
import { USE_PROXY } from 'http-status-codes';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';

const Subject = require('../models/subject')
const Profile = require('../models/profile')
const Class = require('../models/class')
const ProfileClass = require('../models/profileClass')


const router = Express.Router();
sequelize.sync()
router.use('/', HealthcheckController);
router.get("/register", async (req,res) => {
  let subjects = await Subject.findAll({attributes: ['subjectCode', 'name']})
  let students = await Profile.findAll({attributes: ['name','email'], where: {"is_Student": true}})
  let teachers = await Profile.findAll({attributes: ['name','email'], where: {"is_Teacher": true}})
  let classes = await Class.findAll({attributes: ['classCode', 'name']})
  res.status(200).json({"teachers" : teachers, "students" : students, "subjects": subjects, "classes": classes})
})

router.post('/register', async (req, res) => {
  try {
  if (req.body.name && req.body.email) {
      let {name, email, is_Student, is_Teacher} = req.body
      let profile = await Profile.findOne({where : {"email": email}})
      if (profile) {
        let data = await Profile.update({name, email, is_Student, is_Teacher},{where : {"email": email}})
      } else {
      let data = await Profile.create({name, email, is_Student, is_Teacher})}
    } 
    else if (req.body.subjectCode && req.body.name) {
      let {subjectCode, name} = req.body
      let subject = await Subject.findOne({where : {"subjectCode" : subjectCode}})
      if (subject) {
        let data = await Subject.update({subjectCode, name}, {where : {"subjectCode" : subjectCode}})
      } else {
      let data = await Subject.create({subjectCode, name})}
    } else if (req.body.classCode && req.body.name) {
      let {classCode, name} = req.body
      let classSingle = await Class.findOne({where : {"classCode" : classCode}})
      if (classSingle) {
        Class.update({classCode,name}, {where : {"classCode" : classCode}})
      } else {
        let data = await Class.create({classCode,name})
      }
    } else {
      return res.status(400).json({"Message": "Fields were invalid on when post request was submitted"})
    }
} catch (e) {
  res.status(500).json({"Message": "This is not a valid entry into the database"})
}
    let subjects = await Subject.findAll({attributes: ['subjectCode', 'name']})
    let students = await Profile.findAll({attributes: ['name','email'], where: {"is_Student": true}})
    let teachers = await Profile.findAll({attributes: ['name','email'], where: {"is_Teacher": true}})
    let classes = await Class.findAll({attributes: ['classCode', 'name']})
    return res.status(200).json({"teachers" : teachers, "students" : students, "subjects": subjects, "classes": classes})
})


router.get('/reports/workload', async (req, res) => {
  let profileClass = await ProfileClass.findAndCountAll({attributes: ['teacherID', 'subjectID'], group:['teacherID', 'subjectID']})

  return res.status(200).json({"Message": "Route hit successfully", "data": profileClass})
})


export default router;
