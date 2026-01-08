import React, { useContext, useEffect, useState } from 'react'
import './caseoverview.css'
import { UserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import api from '../pages/api';
const CaseOverview = () => {
    const {caseId,setCaseId}=useContext(UserContext)

    const [caseDescription, setCaseDescription] = useState(""); // state to hold description
    const [caseType, setCaseType] = useState(""); // state to hold selected type
    const [caseCategory, setCaseCategory] = useState(""); // state to hold selected category
    const [caseDetails, setCaseDetails] = useState({});

    const caseIdfromURL=useParams()
    
    useEffect(()=>{
      setCaseId(caseIdfromURL.caseId)
      getCaseDetailsByCaseId()
    },[caseIdfromURL.caseId])

    console.log("casetype",caseType);
    console.log("caseDescription",caseDescription);
    console.log("caseCategory",caseCategory);
   const submitHandler = async () => {
  const newCaseDetails = {
    caseId,
    caseDescription,
    caseType,
    caseCategory
  };

  setCaseDetails(newCaseDetails); 
  console.log("caseDetails to send", newCaseDetails);

  try {
    const response = await api.post(
      `http://localhost:5000/case/submit-case`,
      newCaseDetails,
      { withCredentials: true }
    );

    console.log("response", response.data);
  } catch (error) {
    console.error("Error submitting case", error);
  }
};


    
    

    const getCaseDetailsByCaseId= async()=>{
      try {
        const response = await api.get(`http://localhost:5000/case/cases/${caseIdfromURL.caseId}`, {
          withCredentials: true})
    
  
        console.log("fetched case by id:", response);
        setCaseDetails(response.data.case);
        setCaseType(response.data.case.caseType);
        setCaseDescription(response.data.case.caseDescription);
        setCaseCategory(response.data.case.caseCategory);
      } catch (error) {
        console.error('Error fetching case details:', error);
      }
    }

    
  return (
    <div style={{padding:"10px", position:'relative'}}>
      <h1>Case:{caseId}</h1>
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
          rows="4" value={caseDescription}
          onChange={(e)=>setCaseDescription(e.target.value)}
          placeholder="Enter case description..."
        ></textarea>
      </div>
        <div>
        <p className="font-medium mb-1">Case Category:</p>
       <select value={caseCategory}  onChange={(e)=>setCaseCategory(e.target.value)}>
        <option value="Category1">Category 1</option>
        <option value="Category2">Category 2</option>
        <option value="Category3">Category 3</option>
       </select>
      </div>
        </div>
        <div className="submit-wrapper">
        <button onClick={submitHandler} className="submit-btn">Submit Case</button>
      </div>
    </div>
  )
}

export default CaseOverview