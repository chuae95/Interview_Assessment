"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _HealthcheckController = _interopRequireDefault(require("./controllers/HealthcheckController"));

var _database = _interopRequireDefault(require("./config/database"));

var Subject = require('../models/subject');

var Profile = require('../models/profile');

var Class = require('../models/class');

var router = _express["default"].Router();

_database["default"].sync();

router.use('/', _HealthcheckController["default"]);
router.get("/register", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var subjects, students, teachers, classes;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Subject.findAll({
              attributes: ['subjectCode', 'name']
            });

          case 2:
            subjects = _context.sent;
            _context.next = 5;
            return Profile.findAll({
              attributes: ['name', 'email'],
              where: {
                "is_Student": true
              }
            });

          case 5:
            students = _context.sent;
            _context.next = 8;
            return Profile.findAll({
              attributes: ['name', 'email'],
              where: {
                "is_Teacher": true
              }
            });

          case 8:
            teachers = _context.sent;
            _context.next = 11;
            return Class.findAll({
              attributes: ['classCode', 'name']
            });

          case 11:
            classes = _context.sent;
            res.status(200).json({
              "teachers": teachers,
              "students": students,
              "subjects": subjects,
              "classes": classes
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/register', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, name, email, is_Student, is_Teacher, _req$body2, subjectCode, _name, _req$body3, classCode, _name2, subjects, students, teachers, classes;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (!(req.body.name && req.body.email)) {
              _context2.next = 7;
              break;
            }

            _req$body = req.body, name = _req$body.name, email = _req$body.email, is_Student = _req$body.is_Student, is_Teacher = _req$body.is_Teacher;
            _context2.next = 5;
            return Profile.create({
              name: name,
              email: email,
              is_Student: is_Student,
              is_Teacher: is_Teacher
            });

          case 5:
            _context2.next = 20;
            break;

          case 7:
            if (!(req.body.subjectCode && req.body.name)) {
              _context2.next = 13;
              break;
            }

            _req$body2 = req.body, subjectCode = _req$body2.subjectCode, _name = _req$body2.name;
            _context2.next = 11;
            return Subject.create({
              subjectCode: subjectCode,
              name: _name
            });

          case 11:
            _context2.next = 20;
            break;

          case 13:
            if (!(req.body.classCode && req.body.name)) {
              _context2.next = 19;
              break;
            }

            _req$body3 = req.body, classCode = _req$body3.classCode, _name2 = _req$body3.name;
            _context2.next = 17;
            return Class.create({
              classCode: classCode,
              name: _name2
            });

          case 17:
            _context2.next = 20;
            break;

          case 19:
            return _context2.abrupt("return", res.status(400).json({
              "Message": "This is not a valid entry into the database"
            }));

          case 20:
            _context2.next = 22;
            return Subject.findAll({
              attributes: ['subjectCode', 'name']
            });

          case 22:
            subjects = _context2.sent;
            _context2.next = 25;
            return Profile.findAll({
              attributes: ['name', 'email'],
              where: {
                "is_Student": true
              }
            });

          case 25:
            students = _context2.sent;
            _context2.next = 28;
            return Profile.findAll({
              attributes: ['name', 'email'],
              where: {
                "is_Teacher": true
              }
            });

          case 28:
            teachers = _context2.sent;
            _context2.next = 31;
            return Class.findAll({
              attributes: ['classCode', 'name']
            });

          case 31:
            classes = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              "teachers": teachers,
              "students": students,
              "subjects": subjects,
              "classes": classes
            }));

          case 35:
            _context2.prev = 35;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              "Message": "This is not a valid entry into the database"
            });

          case 38:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 35]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;