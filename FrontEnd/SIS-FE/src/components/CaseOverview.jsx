import React, { useState } from 'react'

const CaseOverview = () => {
    const [caseDescription, setCaseDescription] = useState(""); // state to hold description
    const [caseType, setCaseType] = useState(""); // state to hold selected type
    const [caseCategory, setCaseCategory] = useState(""); // state to hold selected category

  return (
    <div style={{padding:"10px"}}>
        <div style={{display:"flex",flexDirection:"row",gap:"20px",margin:"0 auto"}}>
             <div  className="mb-3">
        <p className="font-medium mb-1">Case Type:</p>
        <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
        <label className="mr-4">
          <input
            type="radio"
            value="Fraud"
            checked={caseType === "Fraud"}
            onChange={(e) => setCaseType(e.target.value)}
          />
          Fraud
        </label>
        <label className="mr-4">
          <input
            type="radio"
            value="Suspicious"
            checked={caseType === "Suspicious"}
            onChange={(e) => setCaseType(e.target.value)}
          />
          Suspicious
        </label>
        <label>
          <input
            type="radio"
            value="Other"
            checked={caseType === "Other"}
            onChange={(e) => setCaseType(e.target.value)}
          />
          Other
        </label>
        </div>
      </div>
      <div>
        <p className="font-medium mb-1">Case Description:</p>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
          onChange={(e)=>setCaseDescription(e.target.value)}
          placeholder="Enter case description..."
        ></textarea>
      </div>
        <div>
        <p className="font-medium mb-1">Case Category:</p>
       <select onSelect={(e)=>setCaseCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="Category1">Category 1</option>
        <option value="Category2">Category 2</option>
        <option value="Category3">Category 3</option>
       </select>
      </div>
        </div>
    </div>
  )
}

export default CaseOverview