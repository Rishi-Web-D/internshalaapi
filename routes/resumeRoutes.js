const express = require("express");
const router = express.Router();
const {
  resume,
  addeducation,
  editeducation,
  deleteeducation,
  addjob,
  editjob,
  deletejob,
  addintern,
  editintern,
  deleteintern,
  addresp,
  editresp,
  deleteresp,
  addcourse,
  editcourse,
  deletecourse,
  addproject,
  editproject,
  deleteproject,
  addskill,
  editskill,
  deleteskill,
  addaccomplishment,
  editaccomplishment,
  deleteaccomplishment,
} = require("../controllers/resumeControllers");
const { isAuthenticated } = require("../middlewares/auth");

// GET /
router.get("/", isAuthenticated, resume);
//Education
//POST// Add Education
router.post("/add-edu", isAuthenticated, addeducation);
//POST/Edit Education
router.post("/edit-edu/:eduid", isAuthenticated, editeducation);
//POST/
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation);

//----------------------------jobs---------------------------//
//POST// Add Job
router.post("/add-job", isAuthenticated, addjob);
//POST/Edit Job
router.post("/edit-job/:jobid", isAuthenticated, editjob);
//POST/Delete-  Job
router.post("/delete-job/:jobid", isAuthenticated, deletejob);

//--------------------------------------Internship ------------------------//

//POST// Add Internship
router.post("/add-intern", isAuthenticated, addintern);
//POST/Edit Internship
router.post("/edit-intern/:internid", isAuthenticated, editintern);
//POST/Delete-  Internship
router.post("/delete-intern/:internid", isAuthenticated, deleteintern);

//-----------------------Respnsibilities-----------------------//

//POST// Add Respnsibilities
router.post("/add-resp", isAuthenticated, addresp);
//POST/Edit Respnsibilities
router.post("/edit-resp/:respid", isAuthenticated, editresp);
//POST/Delete-  Respnsibilities
router.post("/delete-resp/:respid", isAuthenticated, deleteresp);

//------------------------Courses--------------------------------//

//POST// Add Courses
router.post("/add-course", isAuthenticated, addcourse);
//POST/Edit Courses
router.post("/edit-course/:courseid", isAuthenticated, editcourse);
//POST/Delete-  Courses
router.post("/delete-course/:courseid", isAuthenticated, deletecourse);


//------------------------Project----------------------//

//POST// Add Project
router.post("/add-project", isAuthenticated, addproject);
//POST/Edit Project
router.post("/edit-project/:projectid", isAuthenticated, editproject);
//POST/Delete-  Project
router.post("/delete-project/:projectid", isAuthenticated, deleteproject);

//--------------------------Skills---------------------//

//POST// Add Project
router.post("/add-skill", isAuthenticated, addskill);
//POST/Edit skill
router.post("/edit-skill/:skillid", isAuthenticated, editskill);
//POST/Delete-  skill
router.post("/delete-skill/:skillid", isAuthenticated, deleteskill);

//--------------------------------Accomplishment-----------//

//POST// Add 
router.post("/add-accomplishment", isAuthenticated, addaccomplishment);
//POST/Edit accomplishment
router.post("/edit-accomplishment/:accomplishmentid", isAuthenticated, editaccomplishment);
//POST/Delete-  accomplishment
router.post("/delete-accomplishment/:accomplishmentid", isAuthenticated, deleteaccomplishment);





module.exports = router;
