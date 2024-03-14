const express = require("express");
const router = express.Router();
const {
  homepage,
  currentEmployee,
  employeesignup,
  employeesignin,
  employeesignout,
  employeesendmail,
  employeeforgetlink,
  employeeresetpassword,
  employeeupdate, 
  employeeorganizationlogo,
  createinternship,
  readinternship,
  readsingleinternship,
  createjob,
  readjob,
  readsinglejob,
  readsingleStudent,
} = require("../controllers/employeeController");
const { isAuthenticated } = require("../middlewares/auth");

// GET /
router.get("/", homepage);

// POST / employee;
router.post("/current", isAuthenticated, currentEmployee);

// POST /employee/signup /
router.post("/signup", employeesignup);

// POST /employee/signin /
router.post("/signin", employeesignin);

// GET /employee/signout /
router.get("/signout", isAuthenticated, employeesignout);

// GET /employee/send-mail
router.post("/send-mail", employeesendmail);

// GET /employee/forget-link/:employeeid
router.get("/forget-link/:id", employeeforgetlink);
// Post /employee/Reset-link/:employeeid
router.post("/reset-password/:id", isAuthenticated, employeeresetpassword);

// Post /employee/Update/:employeeid
router.post("/update/:id", isAuthenticated, employeeupdate);

// Post /employee/avatar/:employeeid
router.post("/organizationlogo/:id", isAuthenticated, employeeorganizationlogo);

//-----------------------------------------------Internship--------------------------------------//
// Post /employee/Internship/create
router.post("/internship/create", isAuthenticated, createinternship);

// Post /employee/Internship/Read
router.post("/internship/read", isAuthenticated, readinternship);

// Post /employee/Internship/Read-Single/:id
router.post("/internship/read/:id", isAuthenticated, readsingleinternship);


//--------------------------------------------------job--------------------------------------------//
// Post /employee/job/create
router.post("/job/create", isAuthenticated, createjob);

// Post /employee/job/Read
router.post("/job/read", isAuthenticated, readjob);

// Post /employee/job/Read-Single/:id
router.post("/job/read/:id", isAuthenticated, readsinglejob);


// Post /employee/Student/Read-Single/:id
router.post("/student/read/:id", isAuthenticated, readsingleStudent);


module.exports = router;
// /employee/forget-link/65cbccc7a82d0ce4be55a95d
