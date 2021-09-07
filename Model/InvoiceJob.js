const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
  tipo: String,
  fecha: Date,
  usuario: String
}, { timestamps: true });
var Job = mongoose.model("Job", JobSchema);
module.exports = Job;
