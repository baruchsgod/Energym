const mongoose = require('mongoose');
const ReportSchema = new mongoose.Schema({
  descripcion:String,
  nombre:String,
  query:String
});
var Report = mongoose.model("Report", ReportSchema);
module.exports = Report;
