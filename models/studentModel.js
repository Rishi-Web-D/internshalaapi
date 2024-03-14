const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const studentModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      minLenght: [4, "First name Should be atleast 4 character long"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      minLenght: [4, "First name Should be atleast 4 character long"],
    },
    contact: {
      type: String,
      required: [true, " Contact is required"],
      maxLength: [10, "Please Enter a valid contact number"],
      minLenght: [10, "Contact Should be atleast 10 character long"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      minLenght: [3, "City Should be atleast 3 character long"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "others"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      select: false,
      maxLength: [15, "Password should not exeed more than 15 character"],
      minLenght: [6, "Password should have atleast 6 character"],
      // match:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/
    },
    resetPasswordToken: {
      type: String,
      default: "0",
    },
    avatar: {
      type: Object,
      default: {
        fileId: "",
        url: "https://images.unsplash.com/photo-1705651460933-394db444bcbd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D",
      },
    },
    resume: {
      education: [],
      jobs: [],
      internships: [],
      responsibilities: [],
      courses: [],
      projects: [],
      skills: [],
      accomplishments: [],
    },
    internships: [{ type: mongoose.Schema.Types.ObjectId, ref: "internship" }],
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
  },
  { timestamps: true }
);

studentModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});
studentModel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
studentModel.methods.getjwttoken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Student = mongoose.model("student", studentModel);

module.exports = Student;
