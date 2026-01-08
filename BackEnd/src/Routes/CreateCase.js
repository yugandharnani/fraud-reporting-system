const express = require("express");
const router = express.Router();
// const Case = require("../Models/CaseModel.js");
const User = require("../models/UserModel.js");
const Case =require("../models/CaseModel.js");
const Counter = require("../models/CounterModel.js");
const checkAuth = require('../MiddleWare/check-auth.js');
const { default: mongoose } = require("mongoose");
// router.get('/cases', async (req, res) => {
//   try {
//     const cases = await Case.find().sort({ created: -1 });
//     res.json(cases);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


router.post('/createcase', checkAuth, async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const { title, status } = req.body;
    const createdBy = req.userData.userId;
    const created = new Date().toISOString().split("T")[0];

    const user = await User.findById(createdBy);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await session.startTransaction();

    const caseId = await generateCaseId(); // already atomic & unique

    const newCase = new Case({ caseId, title, status, created, createdBy });
    await newCase.save({ session });

    user.cases.push(newCase._id);
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Case created successfully", case: newCase });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
  res.status(400).json({ error: err.message });
  }
});


async function generateCaseId() {
  const year = new Date().getFullYear();

  // Using a separate counters collection
  const counter = await Counter.findOneAndUpdate(
    { _id: `caseId-${year}` },
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  );

  return `${year}-${counter.seq}`;
}




router.get('/cases', checkAuth, async (req, res) => {
  try {
    const cases = await Case.find().sort({ created: -1 }).populate('createdBy', 'username email');
    res.json(cases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/mycases',checkAuth,async(req,res)=>{
  try {
      const userid = req.userData.userId;
      const user = await User.findById(userid).populate('cases');
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      let page = req.query.page ? parseInt(req.query.page) : 1;
      let limit = req.query.limit ? parseInt(req.query.limit) : 10;
      let startIndex = (page - 1) * limit;
      let endIndex = page * limit;
      let totalCases = user.cases.length;
      let paginatedCases = user.cases.slice(startIndex, endIndex);

      res.status(200).json({totalCases, cases: paginatedCases });

  } catch (error) {
    
  }
})


router.get('/cases/:caseId',async(req,res)=>{
  const {caseId}=req.params;
  try {
    const caseItem = await Case.findOne({caseId}).populate('createdBy','username email');
    if(!caseItem){  
      return res.status(404).json({error:"Case not found"});
    }
    res.status(200).json({case:caseItem});
  } catch (error) {
    res.status(500).json({error:"Server error"});
  }
})


router.post('/submit-case',async(req,res)=>{
  const {caseId,caseType,caseCategory,caseDescription}=req.body;
  const caseItem = await Case.findOne({caseId});
  if(!caseItem){
    return res.status(404).json({error:"Case not found"});
  }
  caseItem.caseType=caseType;
  caseItem.caseCategory=caseCategory; 
  caseItem.caseDescription=caseDescription;
  await caseItem.save();
  res.status(200).json({message:"Case details updated successfully", case:caseItem})
})



module.exports = router;


