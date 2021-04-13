import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';
import sequelize from "./config/database"
import { REQUEST_HEADER_FIELDS_TOO_LARGE, USE_PROXY } from 'http-status-codes';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';

const Subject = require('../models/subject')
const Profile = require('../models/profile')
const Class = require('../models/class')
const ProfileClass = require('../models/profileClass')
const StudentClass = require("../models/studentClass")

const router = Express.Router();
sequelize.sync()

router.use('/', HealthcheckController);

//Created GET route to test retrieval of API for part 1
router.get("/register", async (req,res) => {
  let subjects = await Subject.findAll({attributes: ['subjectCode', 'name']})
  let students = await Profile.findAll({attributes: ['name','email'], where: {"is_Student": true}})
  let teachers = await Profile.findAll({attributes: ['name','email'], where: {"is_Teacher": true}})
  let classes = await Class.findAll({attributes: ['classCode', 'name']})
  res.status(200).json({"teachers" : teachers, "students" : students, "subjects": subjects, "classes": classes})
})

//Assuming that data is posted to this route via a form with TeacherID field, SubjectID field, ClassID field and an array of Students IDs.
//The only edits that can be done here would be updating the students which are taking each class.
router.post("/register", async (req, res) => {

  if (req.body.classID == "undefined" || req.body.teacherID == "undefined" || req.body.subjecID == "undefined" || req.body.students == "undefined") {
    return res.status(400).json({"Message" : "There are missing fields in your entry, kindly revise the changes."})
  }

  let classSubject = await ProfileClass.findOne({where : {"classID" : req.body.classID, "teacherID" : req.body.teacherID, "subjectID" : req.body.subjectID}})

  if (classSubject) {
    let isNewClass = await StudentClass.findAll({where : {"classSubjectID" : classSubject.dataValues.id}})
    if (isNewClass.length != 0) {
      let oldClass = await StudentClass.destroy({where : {"classSubjectID" : classSubject.dataValues.id}})
    }
      for (const student of req.body.students) {
        let final = await Profile.findOne({where : {"id" : student}})
        let info = await StudentClass.create({ "classSubjectID" : classSubject.dataValues.id, "studentID" : final.id })
        info.save()
    }
  } else {
    let newClass = await ProfileClass.create({"teacherID" : req.body.teacherID,"classID" : req.body.classID,"subjectID" : req.body.subjectID})
    for (const student of req.body.students) {
      let final = await Profile.findOne({where : {"id" : student}})
      let info = await StudentClass.create({ "classSubjectID" : newClass.id, "studentID" : final.id })
      info.save()
    }
  }
  res.status(204).json({"Message": "Data has been added successsfully."})

})

//This route retrieves information from the table and displays all users as per the format provided in the assessment pdf.
router.get('/reports/workload', async (req, res) => {
  let teacher = await ProfileClass.findAndCountAll({attributes: ['teacherID', 'subjectID'], group:['teacherID', 'subjectID']})

  let data = {}

  for (const x of teacher.count) {
    let teacher = await Profile.findOne({attributes : ['name'],where : {"id" : x.teacherID}})
    let subject =  await Subject.findOne({attributes: ['subjectCode', 'name'], where : {"id" : x.subjectID}})
    subject.dataValues['numberOfClasses'] = x.count
    if (data[teacher.dataValues.name] !== undefined) {
      data[teacher.dataValues.name].push(subject.dataValues)
    } else {
      data[teacher.dataValues.name] = []
      data[teacher.dataValues.name].push(subject.dataValues)
    }

  }

  return res.status(200).json({data})
})

// Used the following commands to create data in the table with build available.
try {
  // Addition of student users to the Profile table
  let profile1 = Profile.build({"name" : "Jan", "email" : "Jan@email.com", "is_Student" : true, "is_Teacher" : false})
  profile1.save()
  let profile2 = Profile.build({"name" : "Feb", "email" : "Feb@email.com", "is_Student" : true, "is_Teacher" : false})
  profile2.save()
  let profile3 = Profile.build({"name" : "Mar", "email" : "Mar@email.com", "is_Student" : true, "is_Teacher" : false})
  profile3.save()
  let profile4 = Profile.build({"name" : "Apr", "email" : "Apr@email.com", "is_Student" : true, "is_Teacher" : false})
  profile4.save()
  // Addition of teacher users to the Profile table
  let profile5 = Profile.build({"name" : "Alpha", "email" : "Alpha@email.com", "is_Student" : false, "is_Teacher" : true})
  profile5.save()
  let profile6 = Profile.build({"name" : "Beta", "email" : "Beta@email.com", "is_Student" : false, "is_Teacher" : true})
  profile6.save()
  let profile7 = Profile.build({"name" : "Gamma", "email" : "Gamma@email.com", "is_Student" : false, "is_Teacher" : true})
  profile7.save()
  let profile8 = Profile.build({"name" : "Delta", "email" : "Delta@email.com", "is_Student" : false, "is_Teacher" : true})
  profile8.save()
  // Addition of subjects to the Subjects table
  let subject1 = Subject.build({"subjectCode" : "Eng" , "name" : "English"})
  subject1.save()
  let subject2 = Subject.build({"subjectCode" : "Chn" , "name" : "Chinese"})
  subject2.save()
  // Addition of classes to the Classes table
  let class1 = Class.build({"classCode" : "1-E", "name" : "1 Empathy"})
  class1.save()
  let class2 = Class.build({"classCode" : "1-F", "name" : "1 Faith"})
  class2.save()
  let class3 = Class.build({"classCode" : "1-G", "name" : "1 Grace"})
  class3.save()
  let class4 = Class.build({"classCode" : "1-H", "name" : "1 EHope"})
  class4.save()
  // Building the Profile Classes table so that the api/reports/workload can be generated
  let profileClass1 = ProfileClass.build({"teacherID" : "1","classID" : "1","subjectID" : "1"})
  profileClass1.save()
  let profileClass2 = ProfileClass.build({"teacherID" : "1","classID" : "1","subjectID" : "2"})
  profileClass2.save()
  let profileClass3 = ProfileClass.build({"teacherID" : "2","classID" : "1","subjectID" : "2"})
  profileClass3.save()
  let profileClass4 = ProfileClass.build({"teacherID" : "2","classID" : "2","subjectID" : "2"})
  profileClass4.save()
  let profileClass5 = ProfileClass.build({"teacherID" : "2","classID" : "1","subjectID" : "1"})
  profileClass5.save()
  let profileClass6 = ProfileClass.build({"teacherID" : "3","classID" : "3","subjectID" : "1"})
  profileClass6.save()
  let profileClass7 = ProfileClass.build({"teacherID" : "3","classID" : "4","subjectID" : "1"})
  profileClass7.save()


} catch (e) {
  console.log(e)
}

export default router;

//Initially I thought that the first part of the assessment was asking for a common API which showed all teachers, students, classes and subjects. However, on revision of model, I realised that it was an instance of a classroom and reworked the logic.
// router.post('/register', async (req, res) => {
//   try {
//   if (req.body.name && req.body.email) {

//       let {name, email, is_Student, is_Teacher} = req.body
//       let profile = await Profile.findOne({where : {"email": email}})
//       if (profile) {
//         let data = await Profile.update({name, email, is_Student, is_Teacher},{where : {"email": email}})
//       } else {
//       let data = await Profile.create({name, email, is_Student, is_Teacher})
//       }
//     } else if (req.body.subjectCode && req.body.name) {
//         let {subjectCode, name} = req.body
//         let subject = await Subject.findOne({where : {"subjectCode" : subjectCode}})
//         if (subject) {
//           let data = await Subject.update({subjectCode, name}, {where : {"subjectCode" : subjectCode}})
//         } else {
//         let data = await Subject.create({subjectCode, name})
//         }
//     } else if (req.body.classCode && req.body.name) {
//         let {classCode, name} = req.body
//         let classSingle = await Class.findOne({where : {"classCode" : classCode}})
//         if (classSingle) {
//           Class.update({classCode,name}, {where : {"classCode" : classCode}})
//         } else {
//           let data = await Class.create({classCode,name})
//         }
//       } else {
//         return res.status(400).json({"Message": "Fields were invalid on when post request was submitted"})
//         }
//   } catch (e) {
//       res.status(500).json({"Message": "This is not a valid entry into the database"})
//     }
//       let subjects = await Subject.findAll({attributes: ['subjectCode', 'name']})
//       let students = await Profile.findAll({attributes: ['name','email'], where: {"is_Student": true}})
//       let teachers = await Profile.findAll({attributes: ['name','email'], where: {"is_Teacher": true}})
//       let classes = await Class.findAll({attributes: ['classCode', 'name']})
//       return res.status(200).json({"teachers" : teachers, "students" : students, "subjects": subjects, "classes": classes})
//   })
