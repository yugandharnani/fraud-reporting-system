const { m } = require('framer-motion');
const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  caseId: { type: String, unique: true },
  title: String,
  status: { type: String, default: 'Open' },
  created: { type: String },
  createdBy:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
});

module.exports = mongoose.model("Case", caseSchema);
