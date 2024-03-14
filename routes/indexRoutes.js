const express = require("express");
const router = express.Router();
const {
  homepage,
  currentUser,
  studentsignup,
  studentsignin,
  studentsignout,
  studentsendmail,
  studentforgetlink,
  studentresetpassword,
  studentupdate,
  studentavatar,
  applyinternship,
  applyjob,
  readinternship,
  readsingleinternship,
  readjob,
  readsinglejob,
} = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");

// GET /
router.get("/", homepage);
// POST / student
router.post("/student", isAuthenticated, currentUser);

// POST /student/signup /
router.post("/student/signup", studentsignup);

// POST /student/signin /
router.post("/student/signin", studentsignin);

// GET /student/signout /
router.get("/student/signout", isAuthenticated, studentsignout);
// GET /student/send-mail
router.post("/student/send-mail", studentsendmail);
// GET /student/forget-link/:studentid
router.post("/student/forget-link/:id", studentforgetlink);
// Post /student/Reset-link/:studentid
router.post(
  "/student/reset-password/:id",
  isAuthenticated,
  studentresetpassword
);

// Post /student/Update/:studentid
router.post("/student/update/:id", isAuthenticated, studentupdate);

// Post /student/avatar/:studentid
router.post("/student/avatar/:id", isAuthenticated, studentavatar);
//-----------------------------------------------Internship--------------------------------------//
// Post /Student/Internship/Read
router.post("/internship/read", isAuthenticated, readinternship);

// Post /Student/Internship/Read-Single/:id
router.post("/internship/read/:id", isAuthenticated, readsingleinternship);

//-----------------Apply Internship-------//
// Post /student/apply/Internship/:internshipid
router.post("/student/apply/internship/:internshipid", isAuthenticated, applyinternship);
/////////-----------------Job-----------------////////
// Post /Student/Job/Read
router.post("/job/read", isAuthenticated, readjob);
// Post /employee/Job/Read-Single/:id
router.post("/job/read/:id", isAuthenticated, readsinglejob);


//-----------------Apply JOB-------//
// Post /student/apply/job/:jobid
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob);



module.exports = router;
