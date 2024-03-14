const mongoose = require("mongoose");
const jobModel = new mongoose.Schema(
  {
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
    companyname: String,
    tittle: String,
    skill: String,
    jobtype: { type: String, enum: ["In Office", "Remote"] },
    openings: Number,
    description: String,
    preferences: String,
    salary: Number,
    perkes: String,
    assesments: String,
  },
  { timestamps: true }
);

const Job = mongoose.model("job", jobModel);

module.exports = Job;
