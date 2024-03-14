const { userInfo } = require("os");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const Internship = require("../models/internshipModel");

const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const imagekit = require("../utils/imagekit").initImageKit();
const path = require("path");
const { log } = require("console");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: " Secure Homepage!" });
});
exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  res.json({ student });
});
exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
  const student = await new Student(req.body).save();
  console.log(req.body);
  // res.status(201).json(student);
  sendtoken(student, 201, res);
});
exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!student)
    return next(
      new ErrorHandler("Student not found with this Email Address", 404)
    );
  const isMatch = student.comparepassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("Wroung Credientials", 500));

  sendtoken(student, 200, res);
});
exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Sucessfully signeout!" });
});
exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec();
  if (!student)
    return next(
      new ErrorHandler("User not found with this email Address", 404)
    );
  // const url = `${req.protocol}://${req.get("host")}/student/forget-link/${
  //   student._id
  const url = `http://localhost:5173/user/student/forget-link/${student._id}`;
  console.log(url);
  sendmail(req, res, next, url);
  student.resetPasswordToken = "1";
  await student.save();
  res.json({ student, url });
});
// studentforgetlink
exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id).exec();
  if (!student)
    return next(
      new ErrorHandler("User not found with this email Address", 404)
    );
  if (student.resetPasswordToken == "1") {
    student.resetPasswordToken = "0";

    student.password = req.body.password;
    await student.save();
  } else {
    return next(
      new ErrorHandler("Invalid reset password link Please try again", 500)
    );
  }
  res.status(200).json({
    message: "Password has been Sucessfully Changed",
  });
});
// studentresetpassword
exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id).exec();
  student.password = req.body.password;
  await student.save();
  sendtoken(student, 201, res);
});

// studentupdate
exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
  await Student.findByIdAndUpdate(req.params.id, req.body).exec();
  res
    .status(200)
    .json({ Sucess: true, message: "Student updated Sucessfully!" });
  // sendtoken(student, 201, res);
});

// studentavatar
exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id).exec();
  const file = req.files.avatar;
  const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;
  if (student.avatar.fileId !== "") {
    await imagekit.deleteFile(student.avatar.fileId);
  }

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });
  student.avatar = { fileId, url };

  await student.save();
  res
    .status(200)
    .json({ Sucess: true, message: "Profile uploaded Sucessfully!" });
  res.json({ file: req.files.avatar });
});

//-----------------------------------------------Internship--------------------------------------//

exports.readinternship = catchAsyncErrors(async (req, res, next) => {
  const internships = await Internship.find().exec();
  res.status(200).json({ Success: true, internships });
});
exports.readsingleinternship = catchAsyncErrors(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id).exec();
  res.status(200).json({ Success: true, internship });
});
//---------------------------apply internships-------------------------//
exports.applyinternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internship = await Internship.findById(req.params.internshipid).exec();
  student.internships.push(internship._id);
  internship.students.push(student._id);
  await student.save();
  await internship.save();
  res.json({ student, internship });
});
//-----------------------------Job----------------------------------//

exports.readjob = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find().exec();
  res.status(200).json({ Success: true, jobs });
});
exports.readsinglejob = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.findById(req.params.id).exec();
  res.status(200).json({ Success: true, jobs });
});
//---------------------------apply jobs-------------------------//
exports.applyjob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const job = await Job.findById(req.params.jobid).exec();
  student.jobs.push(job._id);
  job.students.push(student._id);
  await student.save();
  await job.save();
  res.json({ student, job });
});
