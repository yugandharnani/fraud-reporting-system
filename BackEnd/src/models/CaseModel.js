const { m } = require('framer-motion');
const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  caseId: { type: String, unique: true },
  title: String,
  caseType: {type:String},
  caseCategory: {type:String},
  caseDescription: {type:String},
  status: { type: String, default: 'Open' },
  created: { type: String },
  
  createdBy:{type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
});

module.exports = mongoose.model("Case", caseSchema);
