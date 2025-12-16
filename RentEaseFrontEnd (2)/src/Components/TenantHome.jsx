// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import PropertyList from "./PropertyList"; // ✅ Import PropertyList component
// import "../styles/TenantHome.css";

// const TenantHome = () => {
//   const [propertyType, setPropertyType] = useState("");
//   const [area, setArea] = useState("");
//   const [furnishType, setFurnishType] = useState("");
//   const [propertyTypes, setPropertyTypes] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [furnishTypes, setFurnishTypes] = useState([]);
//   const [properties, setProperties] = useState([]); // ✅ Store multiple properties
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAllProperties = async () => {
//       try {
//         const response = await axios.get("http://localhost:8113/api/property/all");
//         setProperties(response.data);
//         console.log("Fetched all properties:", response.data);
//       } catch (error) {
//         console.error("Error fetching all properties:", error.response?.data || error.message);
//       }
//     };

//     fetchAllProperties();
//   }, []);

//   const handleSearch = async () => {
//     try {
//       const params = new URLSearchParams();
//       if (area) params.append("areaid", area);
//       if (propertyType) params.append("propertyTypeid", propertyType);
//       if (furnishType) params.append("furnishid", furnishType);

//       const apiUrl = `http://localhost:8113/api/property/search?${params.toString()}`;
//       const response = await axios.get(apiUrl);

//       navigate("/search-results", { state: { properties: response.data } });
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       alert("Failed to fetch search results. Check console for details.");
//     }
//   };

//   return (
//     <div className="big">
//       <div className="container1">
//         <h2 className="heading">Explore Rented Homes</h2>
//         <p className="subtext">RentEase makes renting easier and more manageable for tenants.</p>

//         <div className="search-wrapper">
//           <select value={area} onChange={(e) => setArea(e.target.value)}>
//             <option value="">Select Location</option>
//             {areas.map((area) => (
//               <option key={area.areaid} value={area.areaid}>
//                 {area.areaname}
//               </option>
//             ))}
//           </select>

//           <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
//             <option value="">Property Type</option>
//             {propertyTypes.map((type) => (
//               <option key={type.propertytypeid} value={type.propertytypeid}>
//                 {type.propertytypename}
//               </option>
//             ))}
//           </select>

//           <select value={furnishType} onChange={(e) => setFurnishType(e.target.value)}>
//             <option value="">Furnished</option>
//             {furnishTypes.map((type) => (
//               <option key={type.furnishid} value={type.furnishid}>
//                 {type.furnishtype}
//               </option>
//             ))}
//           </select>

//           <button onClick={handleSearch}>🔍</button>
//         </div>

//         {/* ✅ Reusing PropertyList to Display Multiple Properties */}
//         <PropertyList properties={properties} />
//       </div>
//     </div>
//   );
// };

// export default TenantHome;
//previus code 

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import PropertyList from "./PropertyList"; // ✅ Import PropertyList component
// import "../styles/TenantHome.css";

// const TenantHome = () => {
//   const [propertyType, setPropertyType] = useState("");
//   const [area, setArea] = useState("");
//   const [furnishType, setFurnishType] = useState("");
//   const [propertyTypes, setPropertyTypes] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [furnishTypes, setFurnishTypes] = useState([]);
//   const [properties, setProperties] = useState([]); // ✅ Store multiple properties
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPropertyTypes = async () => {
//       try {
//         const response = await axios.get("http://localhost:8113/api/propertytype/getPropertyType");
//         setPropertyTypes(response.data);
//       } catch (error) {
//         console.error("Error fetching property types:", error.response?.data || error.message);
//       }
//     };

//     const fetchAreas = async () => {
//       try {
//         const response = await axios.get("http://localhost:8113/api/area/getArea");
//         setAreas(response.data);
//       } catch (error) {
//         console.error("Error fetching areas:", error.response?.data || error.message);
//       }
//     };

//     const fetchFurnishTypes = async () => {
//       try {
//         const response = await axios.get("http://localhost:8113/api/furnished/getFurnished");
//         setFurnishTypes(response.data);
//       } catch (error) {
//         console.error("Error fetching furnish types:", error.response?.data || error.message);
//       }
//     };

//     const fetchAllProperties = async () => {
//       try {
//         const response = await axios.get("http://localhost:8113/api/property/all");
//         setProperties(response.data);
//         console.log("Fetched all properties:", response.data);
//       } catch (error) {
//         console.error("Error fetching all properties:", error.response?.data || error.message);
//       }
//     };

//     // ✅ Fetch all required data on component mount
//     fetchPropertyTypes();
//     fetchAreas();
//     fetchFurnishTypes();
//     fetchAllProperties();
//   }, []);

//   const handleSearch = async () => {
//     try {
//       const params = new URLSearchParams();
//       if (area) params.append("areaid", area);
//       if (propertyType) params.append("propertyTypeid", propertyType);
//       if (furnishType) params.append("furnishid", furnishType);

//       const apiUrl = `http://localhost:8113/api/property/search?${params.toString()}`;
//       const response = await axios.get(apiUrl);

//       console.log("Search API Response:", response.data);

//       // ✅ Redirect to search results page with search data
//       navigate("/search-results", { state: { properties: response.data } });
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       alert("Failed to fetch search results. Check console for details.");
//     }
//   };

//   return (
//     <div className="big">
//       <div className="container1">
//         <h2 className="heading">Explore Rented Homes</h2>
//         <p className="subtext">RentEase makes renting easier and more manageable for tenants.</p>

//         <div className="search-wrapper">
//           <select value={area} onChange={(e) => setArea(e.target.value)}>
//             <option value="">Select Location</option>
//             {areas.map((area) => (
//               <option key={area.areaid} value={area.areaid}>
//                 {area.areaname}
//               </option>
//             ))}
//           </select>

//           <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
//             <option value="">Property Type</option>
//             {propertyTypes.map((type) => (
//               <option key={type.propertytypeid} value={type.propertytypeid}>
//                 {type.propertytypename}
//               </option>
//             ))}
//           </select>

//           <select value={furnishType} onChange={(e) => setFurnishType(e.target.value)}>
//             <option value="">Furnished</option>
//             {furnishTypes.map((type) => (
//               <option key={type.furnishid} value={type.furnishid}>
//                 {type.furnishtype}
//               </option>
//             ))}
//           </select>

//           <button onClick={handleSearch}>🔍</button>
//         </div>

//         {/* ✅ Display all properties (before search) */}
//         <PropertyList properties={properties} />
//       </div>
//     </div>
//   );
// };

// export default TenantHome;
// working code 

import React, { useState, useEffect } from "react";
import { crudApi } from "../api/axiosConfig"; // ✅ Import crudApi
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PropertyList from "./PropertyList"; // ✅ Import PropertyList
import "../styles/Dashboard.css";
// import "../styles/TenantHome.css"; // Removed legacy css

const TenantHome = () => {
  const [propertyType, setPropertyType] = useState("");
  const [area, setArea] = useState("");
  const [furnishType, setFurnishType] = useState("");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [furnishTypes, setFurnishTypes] = useState([]);
  const [properties, setProperties] = useState([]); // ✅ Store multiple properties
  const [loading, setLoading] = useState(false); // ✅ Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await crudApi.get("/propertytype/getPropertyType");
        setPropertyTypes(response.data);
      } catch (error) {
        console.error("Error fetching property types:", error.response?.data || error.message);
      }
    };

    const fetchAreas = async () => {
      try {
        const response = await crudApi.get("/area/getArea");
        setAreas(response.data);
      } catch (error) {
        console.error("Error fetching areas:", error.response?.data || error.message);
      }
    };

    const fetchFurnishTypes = async () => {
      try {
        const response = await crudApi.get("/furnished/getFurnished");
        setFurnishTypes(response.data);
      } catch (error) {
        console.error("Error fetching furnish types:", error.response?.data || error.message);
      }
    };

    const fetchAllProperties = async () => {
      try {
        setLoading(true);
        const response = await crudApi.get("/property/all");
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching all properties:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    // ✅ Fetch all required data on component mount
    fetchPropertyTypes();
    fetchAreas();
    fetchFurnishTypes();
    fetchAllProperties();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (area) params.append("areaid", area);
      if (propertyType) params.append("propertyTypeid", propertyType);
      if (furnishType) params.append("furnishid", furnishType);

      const apiUrl = `/property/search?${params.toString()}`;
      const response = await crudApi.get(apiUrl);

      console.log("Search API Response:", response.data);

      // ✅ Redirect to search results page with search data
      navigate("/search-results", { state: { properties: response.data } });
    } catch (error) {
      console.error("Error fetching search results:", error);
      toast.error("Failed to fetch search results. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div style={{ position: 'absolute', top: '20px', right: '60px' }}>
        <button
          onClick={() => navigate("/chats")}
          className="btn btn-secondary"
        >
          My Chats
        </button>
      </div>

      <div className="page-header">
        <h2 className="page-title">Explore Rented Homes</h2>
        <p className="page-subtitle">RentEase makes renting easier and more manageable for tenants.</p>
      </div>

      {/* ✅ Search Filters */}
      <div className="filters-wrapper">
        <select value={area} onChange={(e) => setArea(e.target.value)} className="filter-select">
          <option value="">Select Location</option>
          {areas.map((area) => (
            <option key={area.areaid} value={area.areaid}>
              {area.areaname}
            </option>
          ))}
        </select>

        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="filter-select">
          <option value="">Property Type</option>
          {propertyTypes.map((type) => (
            <option key={type.propertytypeid} value={type.propertytypeid}>
              {type.propertytypename}
            </option>
          ))}
        </select>

        <select value={furnishType} onChange={(e) => setFurnishType(e.target.value)} className="filter-select">
          <option value="">Furnished</option>
          {furnishTypes.map((type) => (
            <option key={type.furnishid} value={type.furnishid}>
              {type.furnishtype}
            </option>
          ))}
        </select>

        <button onClick={handleSearch} className="search-btn">🔍</button>
      </div>

      {/* ✅ Show "Searching..." message while searching */}
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <PropertyList properties={properties} />
      )}
    </div>
  );
};

export default TenantHome;
