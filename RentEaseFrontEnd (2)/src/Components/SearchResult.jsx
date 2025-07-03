

// import React from "react";
// import { useLocation } from "react-router-dom";
// import PropertyList from "./PropertyList"; // ✅ Import reusable PropertyList

// const SearchResults = () => {
//   const location = useLocation();
//   let { properties } = location.state || {}; 

//   // ✅ Ensure `properties` is always an array (even for single results)
//   properties = Array.isArray(properties) ? properties : [properties];

//   return <PropertyList properties={properties} />;
// };

// export default SearchResults;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropertyList from "./PropertyList"; // ✅ Import reusable PropertyList

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  let { properties } = location.state || {};
  
  // ✅ Ensure `properties` is always an array (even for single results)
  properties = Array.isArray(properties) ? properties : [properties];

  return (
    <div>
      <button 
        onClick={() => navigate("/tenant")} 
        style={{
          padding: "8px 12px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px"
        }}
      >
        Go Back
      </button>
      <PropertyList properties={properties} />
    </div>
  );
};

export default SearchResults;
