const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require("uuid");

exports.resume = catchAsyncErrors(async (req, res, next) => {
  const { resume } = await Student.findById(req.id).exec();
  res.json({ message: " Secure Resume page!", resume });
});
//-----------------------Education-------------------------//
exports.addeducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.education.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Education Added!" });
});
exports.editeducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const eduIndex = student.resume.education.findIndex(
    (i) => i.id === req.params.eduid
  );
  student.resume.education[eduIndex] = {
    ...student.resume.education[eduIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Education Updated!" });
});
exports.deleteeducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filterededucation = student.resume.education.filter(
    (i) => i.id !== req.params.eduid
  );
  student.resume.education = filterededucation;
  await student.save();
  res.json({ message: "Education Deleted!" });
});
//-------------------jobs-------------------------------//
exports.addjob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.jobs.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Job Added!" });
});
exports.editjob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const jobIndex = student.resume.jobs.findIndex(
    (i) => i.id === req.params.jobid
  );
  student.resume.jobs[jobIndex] = {
    ...student.resume.jobs[jobIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Job Updated!" });
});
exports.deletejob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredjob = student.resume.jobs.filter(
    (i) => i.id !== req.params.jobid
  );
  student.resume.jobs = filteredjob;
  await student.save();
  res.json({ message: "Job Deleted!" });
});

//------------------------Internship--------------//
exports.addintern = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.internships.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Internships Added!" });
});
exports.editintern = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internshipIndex = student.resume.internships.findIndex(
    (i) => i.id === req.params.internid
  );
  student.resume.internships[internshipIndex] = {
    ...student.resume.internships[internshipIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Internship Updated!" });
});
exports.deleteintern = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredinternship = student.resume.internships.filter(
    (i) => i.id !== req.params.internid
  );
  student.resume.internships = filteredinternship;
  await student.save();
  res.json({ message: "Internship Deleted!" });
});

//---------------------Responsibilities-------------------//

exports.addresp = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Responsibilities Added!" });
});
exports.editresp = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const respnsibilitieIndex = student.resume.responsibilities.findIndex(
    (i) => i.id === req.params.respid
  );
  student.resume.responsibilities[respnsibilitieIndex] = {
    ...student.resume.responsibilities[respnsibilitieIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Responsibilities Updated!" });
});
exports.deleteresp = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredresponsibilitie = student.resume.responsibilities.filter(
    (i) => i.id !== req.params.respid
  );
  student.resume.responsibilities = filteredresponsibilitie;
  await student.save();
  res.json({ message: "Responsibilities Deleted!" });
});

//--------------------------Courses-----------------------//

exports.addcourse = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.courses.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Course Added!" });
});
exports.editcourse = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const courseIndex = student.resume.courses.findIndex(
    (i) => i.id === req.params.courseid
  );
  student.resume.courses[courseIndex] = {
    ...student.resume.courses[courseIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Course Updated!" });
});
exports.deletecourse = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredcourse = student.resume.courses.filter(
    (i) => i.id !== req.params.courseid
  );
  student.resume.courses = filteredcourse;
  await student.save();
  res.json({ message: "Course Deleted!" });
});

//-------------------------Projects-----------------------//

exports.addproject = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.projects.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Project Added!" });
});
exports.editproject = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const projectIndex = student.resume.projects.findIndex(
    (i) => i.id === req.params.projectid
  );
  student.resume.projects[projectIndex] = {
    ...student.resume.projects[projectIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Project Updated!" });
});
exports.deleteproject = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredproject = student.resume.projects.filter(
    (i) => i.id !== req.params.projectid
  );
  student.resume.projects = filteredproject;
  await student.save();
  res.json({ message: "Project Deleted!" });
});

//-----------------------------Skill------------------------------//
exports.addskill = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.skills.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Skill Added!" });
});
exports.editskill = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const skillIndex = student.resume.skills.findIndex(
    (i) => i.id === req.params.skillid
  );
  student.resume.skills[skillIndex] = {
    ...student.resume.skills[skillIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Skill Updated!" });
});
exports.deleteskill = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredskill = student.resume.skills.filter(
    (i) => i.id !== req.params.skillid
  );
  student.resume.skills = filteredskill;
  await student.save();
  res.json({ message: "Skill Deleted!" });
});


//-----------------------------accomplishments---------------------//


exports.addaccomplishment = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Accomplishment Added!" });
  });
exports.editaccomplishment = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const accomplishmentIndex = student.resume.accomplishments.findIndex(
      (i) => i.id === req.params.accomplishmentid
    );
    student.resume.accomplishments[accomplishmentIndex] = {
      ...student.resume.accomplishments[accomplishmentIndex],
      ...req.body,
    };
    await student.save();
    res.json({ message: "Accomplishment Updated!" });
  });
  exports.deleteaccomplishment = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredaccomplishment = student.resume.accomplishments.filter(
      (i) => i.id !== req.params.accomplishmentid
    );
    student.resume.accomplishments = filteredaccomplishment;
    await student.save();
    res.json({ message: "Accomplishment Deleted!" });
  });