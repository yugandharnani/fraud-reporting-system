import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set } from "mongoose";
const roles = ["User", "Investigator", "Admin"]; // Example roles
import api from "./api";
const FRSHome = () => {
  const navigator = useNavigate();
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [page,setPage]=useState(1);
  const limit =10;
  const [totalCases, setTotalCases] = useState(0);

  const [cases, setCases] = useState([]);


  const fetchCases = async (pageNumber=1) => {
    try {
      const response = await api.get(`http://localhost:5000/case/mycases?page=${pageNumber}&limit=${limit}`, {
        withCredentials: true,
      });
      console.log("fetched cases:", response.data);
      
      setCases(response.data.cases);
      setTotalCases(response.data.totalCases);
      // setCases(response.data);
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };
  useEffect(() => {
    fetchCases(page);
  }, []);
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    // Optionally, fetch cases for the selected role
  };

  const handleCreateCase = async () => {
    // Implement create case logic or open a modal
    const res = await api.post(
      "http://localhost:5000/case/createcase",
      { title: "suspend", status: "Triage" },
      {
        withCredentials: true,
      }
    );
    navigator("/createcase");
    //updates home page with newly created case
    fetchCases();

    alert("Create Case clicked!");
  };
  const totalPages = Math.ceil(totalCases / limit);

    const setPagination =(page) =>{
      setPage(page);
      fetchCases(page);
    } 
  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <button
          onClick={handleCreateCase}
          style={{
            padding: "8px 16px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Create New Case
        </button>
        <div>
          <label htmlFor="role-select" style={{ marginRight: 8 }}>
            Switch Role:
          </label>
          <select
            id="role-select"
            value={selectedRole}
            onChange={handleRoleChange}
            style={{ padding: "6px 12px", borderRadius: 4 }}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#f7f7f7" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Case ID
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Title</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Status
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c.id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {c.caseId}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {c.title}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {c.status}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {c.created}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
<div style={{ marginTop: 16 }}>
  
        <button onClick={() => setPagination(page - 1)} disabled={page === 1}>Prev</button>
        <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
        <button onClick={() => setPagination(page + 1)} disabled={page === totalPages}>Next</button>
      </div>    </div>
  );
};

export default FRSHome;
