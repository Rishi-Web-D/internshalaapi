const mongoose = require("mongoose");
const internshipModel = new mongoose.Schema(
  {
    students:[ { type: mongoose.Schema.Types.ObjectId, ref: "student" }],
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
    profile: String,
    companyname:String,
    skill: String,
    internshiptype: { type: String, enum: ["In Office", "Remote","Work From Home"] },
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
      status: {
        type: String,
        enum: ["Fixed", "Negotiable", "Performance based", "Unpaid"],
      },
      amount: Number,
    },
    perkes: String,
    assesments: String,
  },
  { timestamps: true }
);

const Internship = mongoose.model("internship", internshipModel);

module.exports = Internship;
