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
import axios from "axios";
import "../styles/LandlordDashboard.css";

const LandlordDashboard = () => {
  const location = useLocation();
  const landlordName = location.state?.username || "Landlord"; 
  const navigate = useNavigate();
  let id = sessionStorage.getItem("userId");

  const [loading, setLoading] = useState(false);

  const handleShowProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8110/crud/getProperty/${id}`);
      navigate("/showproperty", { state: { properties: response.data } });
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landlord-dashboard">
      <h1>Welcome to RentEase, {landlordName}!</h1>

      <div className="button-container">
        <button onClick={() => navigate("/addproperty")}>
          Add Property +
        </button>

        <button onClick={handleShowProperties} disabled={loading}>
          {loading ? "Loading..." : "Show my property +"}
        </button>
      </div>
    </div>
  );
};

export default LandlordDashboard;
