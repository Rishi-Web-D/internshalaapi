const { userInfo } = require("os");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Employee = require("../models/employeeModel");
const Student = require("../models/studentModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const imagekit = require("../utils/imagekit").initImageKit();
const path = require("path");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: " Secure Homepage for employee!" });
});
exports.currentEmployee = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id).exec();
  res.json({ employee });
});
exports.employeesignup = catchAsyncErrors(async (req, res, next) => {
  const employee = await new Employee(req.body).save();
  // res.status(201).json(employee);
  sendtoken(employee, 201, res);
});
exports.employeesignin = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!employee)
    return next(
      new ErrorHandler("Employee not found with this Email Address", 404)
    );
  const isMatch = employee.comparepassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("Wroung Credientials", 500));

  sendtoken(employee, 200, res);
});
exports.employeesignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Sucessfully signeout!" });
});
exports.employeesendmail = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findOne({ email: req.body.email }).exec();
  if (!employee)
    return next(
      new ErrorHandler("User not found with this email Address", 404)
    );
  const url = `${req.protocol}://${req.get("host")}/employee/forget-link/${
    employee._id
  }`;
  sendmail(req, res, next, url);
  employee.resetPasswordToken = "1";
  await employee.save();
  res.json({ employee, url });
});
// employeeforgetlink
exports.employeeforgetlink = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id).exec();
  if (!employee)
    return next(
      new ErrorHandler("User not found with this email Address", 404)
    );
  if (employee.resetPasswordToken == "1") {
    employee.resetPasswordToken = "0";
    employee.password = req.body.password;
    await employee.save();
  } else {
    return next(
      new ErrorHandler("Invalid reset password link Please try again", 500)
    );
  }
  res.status(200).json({
    message: "Password has been Sucessfully Changed",
  });
});
// employeeresetpassword
exports.employeeresetpassword = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id).exec();
  employee.password = req.body.password;
  await employee.save();
  sendtoken(employee, 201, res);
});

// employeeupdate
exports.employeeupdate = catchAsyncErrors(async (req, res, next) => {
  await Employee.findByIdAndUpdate(req.params.id, req.body).exec();
  res
    .status(200)
    .json({ Sucess: true, message: "Employee updated Sucessfully!" });
  // sendtoken(employee, 201, res);
});

// employeeavatar
exports.employeeorganizationlogo = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id).exec();
  const file = req.files.organizationlogo;
  const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;
  if (employee.organizationlogo.fileId !== "") {
    await imagekit.deleteFile(employee.organizationlogo.fileId);
  }

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });
  employee.organizationlogo = { fileId, url };

  await employee.save();
  res
    .status(200)
    .json({ Sucess: true, message: "Organizationlogo uploaded Sucessfully!" });
  // res.json({ file: req.files.organizationlogo });
});

//-------------------------------------------Internship----------------------------------------------//
exports.createinternship = catchAsyncErrors(async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.id).exec();
    // console.log(employee);
    const internship = new Internship(req.body);
    // console.log(internship);
    internship.employee = employee._id;
    await employee.internships.push(internship._id);
    await internship.save();
    await employee.save();
    res.status(201).json({ Success: true, internship });
  } catch (error) {}
});

exports.readinternship = catchAsyncErrors(async (req, res, next) => {
  const { internships } = await Employee.findById(req.id)
    .populate("internships")
    .exec();
  res.status(200).json({ Success: true, internships });
});

exports.readsingleinternship = catchAsyncErrors(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id).exec();
  res.status(200).json({ Success: true, internship });
});

//-------------------------------------------job----------------------------------------------//
exports.createjob = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id).exec();
  const job = await new Job(req.body);
  job.employee = employee._id;
  employee.jobs.push(job._id);
  await job.save();
  await employee.save();
  res.status(201).json({ Success: true, job });
});

exports.readjob = catchAsyncErrors(async (req, res, next) => {
  const { jobs } = await Employee.findById(req.id).populate("jobs").exec();
  res.status(200).json({ Success: true, jobs });
});

exports.readsinglejob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id).exec();
  res.status(200).json({ Success: true, job });
});
exports.readsingleStudent = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id).exec();
  res.status(200).json({ Success: true, student });
});
