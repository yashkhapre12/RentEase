
// import React from "react";

// const PropertyList = ({ properties }) => {
//   if (!properties || properties.length === 0) {
//     return <p>No properties found.</p>;
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Properties</h2>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
//         {properties.map((prop) => (
//           <div
//             key={prop.propertyid}
//             style={{
//               border: "1px solid #ccc",
//               padding: "15px",
//               borderRadius: "10px",
//               boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
//               backgroundColor: "#fff",
//             }}
//           >
//             <h3>{prop.address || "No Address Available"}</h3>

//             {/* Property Image (First Image Only) */}
//             {Array.isArray(prop.photos) && prop.photos.length > 0 ? (
//               <img
//                 src={prop.photos[0]?.photo ? `data:image/jpeg;base64,${prop.photos[0].photo}` : "placeholder.jpg"}
//                 alt="Property"
//                 style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
//               />
//             ) : (
//               <p style={{ fontStyle: "italic", color: "#888" }}>No photos available</p>
//             )}

//             <p><strong>Rent:</strong> ₹{prop.rent || "N/A"}</p>
//             <p><strong>Lease Duration:</strong> {prop.leaseduration || "N/A"}</p>
//             <p><strong>Security Deposit:</strong> ₹{prop.securitydeposit || "N/A"}</p>
//             <p><strong>Size:</strong> {prop.sqfeet ? `${prop.sqfeet} sq. ft.` : "N/A"}</p>
//             <p><strong>Furnishing:</strong> {prop.furnishid?.furnishtype || "Not Specified"}</p>
//             <p><strong>Type:</strong> {prop.propertytypeid?.propertytypename || "Unknown"}</p>
//             <p><strong>Gas Connection:</strong> {prop.gasconnection ? "Yes" : "No"}</p>
//             <p><strong>Parking:</strong> {prop.parking ? "Available" : "Not Available"}</p>
//             <p><strong>Area:</strong> {prop.areaid?.areaname || "Unknown"}</p>

//             {/* Owner Details */}
//             <h4>Owner Details</h4>
//             <p><strong>Name:</strong> {prop.userid?.firstName} {prop.userid?.lastName}</p>
//             <p><strong>Contact:</strong> {prop.userid?.contact}</p>
//             <p><strong>Email:</strong> {prop.userid?.email}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PropertyList;



// import React from "react";

// const PropertyList = ({ properties }) => {
//   if (!properties || properties.length === 0) {
//     return <p>No properties found.</p>;
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Properties</h2>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
//         {properties.map((prop) => (
//           <div
//             key={prop.propertyid}
//             style={{
//               border: "1px solid #ccc",
//               padding: "15px",
//               borderRadius: "10px",
//               boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
//               backgroundColor: "#fff",
//             }}
//           >
//             <h3>{prop.address || "No Address Available"}</h3>

//             {/* Property Image (First Image Only) */}
//             {Array.isArray(prop.photos) && prop.photos.length > 0 ? (
//               <img
//                 src={prop.photos[0]?.photo ? `data:image/jpeg;base64,${prop.photos[0].photo}` : "placeholder.jpg"}
//                 alt="Property"
//                 style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
//               />
//             ) : (
//               <p style={{ fontStyle: "italic", color: "#888" }}>No photos available</p>
//             )}

//             <p><strong>Rent:</strong> ₹{prop.rent || "N/A"}</p>
//             <p><strong>Lease Duration:</strong> {prop.leaseduration || "N/A"}</p>
//             <p><strong>Security Deposit:</strong> ₹{prop.securitydeposit || "N/A"}</p>
//             <p><strong>Size:</strong> {prop.sqfeet ? `${prop.sqfeet} sq. ft.` : "N/A"}</p>
//             <p><strong>Furnishing:</strong> {prop.furnishid?.furnishtype || "Not Specified"}</p>
//             <p><strong>Type:</strong> {prop.propertytypeid?.propertytypename || "Unknown"}</p>
//             <p><strong>Gas Connection:</strong> {prop.gasconnection ? "Yes" : "No"}</p>
//             <p><strong>Parking:</strong> {prop.parking ? "Available" : "Not Available"}</p>
//             <p><strong>Area:</strong> {prop.areaid?.areaname || "Unknown"}</p>

//             {/* Owner Details */}
//             <h4>Owner Details</h4>
//             <p><strong>Name:</strong> {prop.userid?.firstName} {prop.userid?.lastName}</p>
//             <p><strong>Contact:</strong> {prop.userid?.contact}</p>
//             <p><strong>Email:</strong> {prop.userid?.email}</p>

//             {/* Interested Button */}
//             <button
//               style={{
//                 marginTop: "10px",
//                 padding: "10px",
//                 backgroundColor: "#007bff",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 fontSize: "16px",
//               }}
//               onClick={() => alert(`You expressed interest in ${prop.address || 'this property'}`)}
//             >
//               Interested
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PropertyList;

import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Dashboard.css"; // Import unified styles

import { crudApi, transactionApi } from "../api/axiosConfig";

const PropertyList = ({ properties }) => {
  const navigate = useNavigate();
  // Retrieve user ID from session storage
  const userId = sessionStorage.getItem("userId");

  const handleContactLandlord = async (landlordId, propertyId) => {
    if (!userId) {
      toast.error("User not logged in.");
      return;
    }

    try {
      await crudApi.post("/chats", {
        tenantId: parseInt(userId),
        landlordId: landlordId,
        propertyId: propertyId,
      });
      navigate("/chats");
    } catch (error) {
      // If chat already exists or other error, check response
      const errorMsg = error.response?.data || "";
      if (typeof errorMsg === 'string' && errorMsg.includes("Chat already exists")) {
        navigate("/chats");
      } else {
        console.error("Error starting chat:", error);
        toast.error("Failed to start chat.");
      }
    }
  };

  const handleInterestClick = async (propertyId) => {
    if (!userId) {
      toast.error("User not logged in.");
      return;
    }

    try {
      await transactionApi.post(
        `/shortlist?userId=${userId}&propertyId=${propertyId}`
      );
      toast.success("Interest shown successfully! ");
    } catch (error) {
      console.error("Error shortlisting property:", error);
      toast.error(error.response?.data?.message || "Failed to shortlist property.");
    }
  };

  if (!properties || properties.length === 0) {
    return <p>No properties found.</p>;
  }

  return (
    <div className="property-grid-container">
      {/* <h2>Properties</h2> - Removed as parent usually handles title */}

      <div className="property-grid">
        {properties.map((prop) => (
          <div key={prop.propertyid} className="property-card">
            {/* Image */}
            <div className="property-image-wrapper">
              {Array.isArray(prop.photos) && prop.photos.length > 0 ? (
                <img
                  src={prop.photos[0]?.photo ? `data:image/jpeg;base64,${prop.photos[0].photo}` : "placeholder.jpg"}
                  alt="Property"
                  className="property-image"
                />
              ) : (
                <div className="property-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>No Image</div>
              )}
            </div>

            <div className="property-content">
              <h3 className="property-address">{prop.address || "No Address"}</h3>
              <div className="property-price">₹{prop.rent || "N/A"}</div>

              <div className="property-specs">
                <div className="spec-item">Size: {prop.sqfeet} sqft</div>
                <div className="spec-item">Type: {prop.propertytypeid?.propertytypename}</div>
                <div className="spec-item">Furnished: {prop.furnishid?.furnishtype}</div>
                <div className="spec-item">Area: {prop.areaid?.areaname}</div>
              </div>

              {/* Owner Details (Simplified) */}
              <div className="text-muted small mb-3">
                Owner: {prop.userid?.firstName} {prop.userid?.lastName}
              </div>

              <div className="card-actions">
                <button
                  className="action-btn btn-interest"
                  onClick={() => handleInterestClick(prop.propertyid)}
                >
                  Interested
                </button>
                <button
                  className="action-btn btn-contact"
                  onClick={() => handleContactLandlord(prop.userid.userId, prop.propertyid)}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
