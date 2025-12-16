// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "../styles/LandlordDashboard.css";

// const LandlordDashboard = () => {
//   const location = useLocation();
//   const landlordName = location.state?.username || "Landlord"; // Extracted username from email
//   const [showRegister, setShowRegister] = useState(false);
//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   return (
//     <div className="p-6 max-w-lg mx-auto" style={{ position: 'relative' }}>
//       <h1 className="text-2xl font-bold">Welcome to the RentEase, {landlordName}!</h1>
//       <button
//         style={{
//           position: 'absolute',
//           top: '10px',
//           right: '200px',
//           padding: '8px 16px',
//           backgroundColor: '#f4f4f4',
//           color: 'black',
//           borderRadius: '8px',
//         }}
//         onClick={() => navigate('/addproperty')} // Navigate to /addproperty on click
//       >
//         Add Property +
//       </button>
//       <button
//         style={{
//           position: 'absolute',
//           top: '10px',
//           right: '10px',
//           padding: '8px 16px',
//           backgroundColor: '#f4f4f4',
//           color: 'black',
//           borderRadius: '8px',
//         }}
//         onClick={() => navigate('/showproperty')} 
//       >
//        Show my property +
//       </button>
//     </div>
//   );
// };

// export default LandlordDashboard;


// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "../styles/LandlordDashboard.css";

// const LandlordDashboard = () => {
//   const location = useLocation();
//   const landlordName = location.state?.username || "Landlord"; 
//   const navigate = useNavigate();
//   let id = sessionStorage.getItem("userId");

//   const [loading, setLoading] = useState(false); // Loading state

//   // Function to fetch property data on button click
//   const handleShowProperties = async () => {
//     setLoading(true); // Show loading state
//     try {
//       const response = await axios.get(`http://localhost:8113/api/property/getProperty/${id}`);
//       navigate("/showproperty", { state: { properties: response.data } }); // Navigate with data
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     } finally {
//       setLoading(false); // Hide loading state
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto" style={{ position: "relative" }}>
//       <h1 className="text-2xl font-bold">Welcome to RentEase, {landlordName}!</h1>

//       <button
//         style={{
//           position: "absolute",
//           top: "10px",
//           right: "200px",
//           padding: "8px 16px",
//           backgroundColor: "#f4f4f4",
//           color: "black",
//           borderRadius: "8px",
//         }}
//         onClick={() => navigate("/addproperty")}
//       >
//         Add Property +
//       </button>

//       <button
//         style={{
//           position: "absolute",
//           top: "10px",
//           right: "10px",
//           padding: "8px 16px",
//           backgroundColor: "#f4f4f4",
//           color: "black",
//           borderRadius: "8px",
//         }}
//         onClick={handleShowProperties}
//         disabled={loading} // Disable button while loading
//       >
//         {loading ? "Loading..." : "Show my property +"}
//       </button>
//     </div>
//   );
// };

// export default LandlordDashboard;


import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { crudApi } from "../api/axiosConfig";
import toast from "react-hot-toast";
import "../styles/Dashboard.css";

const LandlordDashboard = () => {
  const location = useLocation();
  const landlordName = location.state?.username || "Landlord";
  const navigate = useNavigate();
  let id = sessionStorage.getItem("userId");

  const [loading, setLoading] = useState(false);

  const handleShowProperties = async () => {
    setLoading(true);
    try {
      const response = await crudApi.get(`/property/getProperty/${id}`);
      navigate("/showproperty", { state: { properties: response.data } });
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to fetch properties.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h1 className="page-title">Welcome, {landlordName}!</h1>
        <p className="page-subtitle">Manage your properties and tenants</p>
      </div>

      <div className="filters-wrapper" style={{ justifyContent: 'center', gap: '15px', flexDirection: 'column', maxWidth: '400px', margin: '0 auto' }}>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/addproperty")}
        >
          Add Property +
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/chats")}
        >
          My Chats
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={handleShowProperties}
          disabled={loading}
          style={{ padding: '0.75rem 1.5rem', minWidth: '150px' }}
        >
          {loading ? <div className="spinner" style={{ width: '20px', height: '20px', margin: 0, borderWidth: '2px' }}></div> : "Show my property"}
        </button>
      </div>
    </div>
  );
};

export default LandlordDashboard;
