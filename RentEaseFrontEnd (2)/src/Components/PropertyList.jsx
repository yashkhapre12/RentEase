
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

const PropertyList = ({ properties }) => {
  // Retrieve user ID from session storage
  const userId = sessionStorage.getItem("userId");

  // Function to handle interest click
  const handleInterestClick = async (propertyId) => {
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:8110/TenantProperty/shortlist?userId=${userId}&propertyId=${propertyId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Interest shown successfully! ");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to shortlist property.");
      }
    } catch (error) {
      console.error("Error shortlisting property:", error);
      alert("Error connecting to the server.");
    }
  };

  if (!properties || properties.length === 0) {
    return <p>No properties found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Properties</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {properties.map((prop) => (
          <div
            key={prop.propertyid}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            <h3>{prop.address || "No Address Available"}</h3>

            {Array.isArray(prop.photos) && prop.photos.length > 0 ? (
              <img
                src={prop.photos[0]?.photo ? `data:image/jpeg;base64,${prop.photos[0].photo}` : "placeholder.jpg"}
                alt="Property"
                style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
              />
            ) : (
              <p style={{ fontStyle: "italic", color: "#888" }}>No photos available</p>
            )}

            <p><strong>Rent:</strong> ₹{prop.rent || "N/A"}</p>
            <p><strong>Lease Duration:</strong> {prop.leaseduration || "N/A"}</p>
            <p><strong>Security Deposit:</strong> ₹{prop.securitydeposit || "N/A"}</p>
            <p><strong>Size:</strong> {prop.sqfeet ? `${prop.sqfeet} sq. ft.` : "N/A"}</p>
            <p><strong>Furnishing:</strong> {prop.furnishid?.furnishtype || "Not Specified"}</p>
            <p><strong>Type:</strong> {prop.propertytypeid?.propertytypename || "Unknown"}</p>
            <p><strong>Gas Connection:</strong> {prop.gasconnection ? "Yes" : "No"}</p>
            <p><strong>Parking:</strong> {prop.parking ? "Available" : "Not Available"}</p>
            <p><strong>Area:</strong> {prop.areaid?.areaname || "Unknown"}</p>

            {/* Owner Details */}
            <h4>Owner Details</h4>
            <p><strong>Name:</strong> {prop.userid?.firstName} {prop.userid?.lastName}</p>
            <p><strong>Contact:</strong> {prop.userid?.contact}</p>
            <p><strong>Email:</strong> {prop.userid?.email}</p>

            {/* Interested Button */}
            <button
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
              onClick={() => handleInterestClick(prop.propertyid)}
            >
              Interested
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
