// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/AddProperty.css";

// const AddProperty = () => {
//   const [propertyData, setPropertyData] = useState({
//     leaseduration: "",
//     available: false,
//     rent: "",
//     sqfeet: "",
//     securitydeposit: "",
//     additionalcharges: "",
//     address: "",
//     gasconnection: false,
//     parking: false,
//     userid: "", // Will be set later
//     areaid: "",
//     furnishid: "",
//     propertytypeid: "",
//   });

//   const [areas, setAreas] = useState([]);
//   const [furnishTypes, setFurnishTypes] = useState([]);
//   const [propertyTypes, setPropertyTypes] = useState([]);
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch dropdown data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [areaRes, furnishRes, propertyRes] = await Promise.all([
//           axios.get("http://localhost:8113/api/area/getArea"),
//           axios.get("http://localhost:8113/api/furnished/getFurnished"),
//           axios.get("http://localhost:8113/api/propertytype/getPropertyType"),
//         ]);

//         setAreas(areaRes.data || []);
//         setFurnishTypes(furnishRes.data || []);
//         setPropertyTypes(propertyRes.data || []);
//       } catch (error) {
//         console.error("Error fetching dropdown data:", error);
//         alert("Failed to load property options. Please try again later.");
//       }
//     };
//     fetchData();

//     // Retrieve and set userId from sessionStorage
//     const storedUserId = sessionStorage.getItem("userId");
//     if (storedUserId) {
//       setPropertyData((prevData) => ({
//         ...prevData,
//         userid: storedUserId,
//       }));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setPropertyData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     setImages(Array.from(e.target.files));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:8113/api/property/add",
//         propertyData,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       console.log("Property added successfully:", response.data);
//       const propertyId = response.data.propertyid;

//       if (images.length > 0) {
//         const formData = new FormData();
//         images.forEach((image) => formData.append("photos", image));

//         await axios.post(
//           `http://localhost:8113/api/property/${propertyId}/upload-photos`,
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//         console.log("Images uploaded successfully!");
//       }

//       alert("Property added successfully!");

//       setPropertyData({
//         leaseduration: "",
//         available: false,
//         rent: "",
//         sqfeet: "",
//         securitydeposit: "",
//         additionalcharges: "",
//         address: "",
//         gasconnection: false,
//         parking: false,
//         userid: sessionStorage.getItem("userId"), // Keep userId intact
//         areaid: "",
//         furnishid: "",
//         propertytypeid: "",
//       });
//       setImages([]);
//     } catch (error) {
//       console.error("Error adding property:", error);
//       alert(error.response?.data?.message || "Failed to add property. Please check your input.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="add-property-container">
//       <h2 className="title">Add a New Property</h2>
//       <form onSubmit={handleSubmit} className="form">
//         <input type="text" name="leaseduration" placeholder="Lease Duration (Months)" className="input-field" value={propertyData.leaseduration} onChange={handleChange} required />
//         <input type="text" name="address" placeholder="Property Address" className="input-field" value={propertyData.address} onChange={handleChange} required />
//         <input type="number" name="rent" placeholder="Rent (₹)" className="input-field" value={propertyData.rent} onChange={handleChange} required />
//         <input type="number" name="sqfeet" placeholder="Square Feet" className="input-field" value={propertyData.sqfeet} onChange={handleChange} required />
//         <input type="number" name="securitydeposit" placeholder="Security Deposit (₹)" className="input-field" value={propertyData.securitydeposit} onChange={handleChange} required />
//         <input type="number" name="additionalcharges" placeholder="Additional Charges (₹)" className="input-field" value={propertyData.additionalcharges} onChange={handleChange} />

//         <select name="areaid" className="input-field" value={propertyData.areaid} onChange={handleChange} required>
//           <option value="">Select Area</option>
//           {areas.map((area) => (
//             <option key={area.areaid} value={area.areaid}>{area.areaname}</option>
//           ))}
//         </select>

//         <select name="furnishid" className="input-field" value={propertyData.furnishid} onChange={handleChange} required>
//           <option value="">Select Furnish Type</option>
//           {furnishTypes.map((furnish) => (
//             <option key={furnish.furnishid} value={furnish.furnishid}>{furnish.furnishtype}</option>
//           ))}
//         </select>

//         <select name="propertytypeid" className="input-field" value={propertyData.propertytypeid} onChange={handleChange} required>
//           <option value="">Select Property Type</option>
//           {propertyTypes.map((propertyType) => (
//             <option key={propertyType.propertytypeid} value={propertyType.propertytypeid}>{propertyType.propertytypename}</option>
//           ))}
//         </select>

//         <div className="checkbox-group">
//           <label><input type="checkbox" name="available" checked={propertyData.available} onChange={handleChange} /> Available</label>
//           <label><input type="checkbox" name="gasconnection" checked={propertyData.gasconnection} onChange={handleChange} /> Gas Connection</label>
//           <label><input type="checkbox" name="parking" checked={propertyData.parking} onChange={handleChange} /> Parking</label>
//         </div>

//         <input type="file" accept="image/*" multiple className="file-input" onChange={handleImageChange} />

//         <button type="submit" className="submit-button" disabled={loading}>{loading ? "Submitting..." : "Add Property"}</button>
//       </form>
//     </div>
//   );
// };

// export default AddProperty;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddProperty.css";

const AddProperty = () => {
  const navigate = useNavigate();

  const [propertyData, setPropertyData] = useState({
    leaseduration: "",
    available: false,
    rent: "",
    sqfeet: "",
    securitydeposit: "",
    additionalcharges: "",
    address: "",
    gasconnection: false,
    parking: false,
    userid: "", // Will be set later
    areaid: "",
    furnishid: "",
    propertytypeid: "",
  });

  const [areas, setAreas] = useState([]);
  const [furnishTypes, setFurnishTypes] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch dropdown data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [areaRes, furnishRes, propertyRes] = await Promise.all([
          axios.get("http://localhost:8110/crud/getArea"),
          axios.get("http://localhost:8110/crud/getFurnished"),
          axios.get("http://localhost:8110/crud/getPropertyType"),
        ]);

        setAreas(areaRes.data || []);
        setFurnishTypes(furnishRes.data || []);
        setPropertyTypes(propertyRes.data || []);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        alert("Failed to load property options. Please try again later.");
      }
    };
    fetchData();

    // Retrieve and set userId from sessionStorage
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setPropertyData((prevData) => ({
        ...prevData,
        userid: storedUserId,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8110/crud/add",
        propertyData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Property added successfully:", response.data);
      const propertyId = response.data.propertyid;

      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => formData.append("photos", image));

        await axios.post(
          `http://localhost:8110/crud/${propertyId}/upload-photos`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Images uploaded successfully!");
      }

      alert("Property added successfully!");

      setPropertyData({
        leaseduration: "",
        available: false,
        rent: "",
        sqfeet: "",
        securitydeposit: "",
        additionalcharges: "",
        address: "",
        gasconnection: false,
        parking: false,
        userid: sessionStorage.getItem("userId"), // Keep userId intact
        areaid: "",
        furnishid: "",
        propertytypeid: "",
      });
      setImages([]);

      // Navigate to /landlord after successful submission
      navigate("/landlord");
    } catch (error) {
      console.error("Error adding property:", error);
      alert(
        error.response?.data?.message ||
          "Failed to add property. Please check your input."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property-container">
      <h2 className="title">Add a New Property</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="leaseduration"
          placeholder="Lease Duration (Months)"
          className="input-field"
          value={propertyData.leaseduration}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Property Address"
          className="input-field"
          value={propertyData.address}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rent"
          placeholder="Rent (₹)"
          className="input-field"
          value={propertyData.rent}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="sqfeet"
          placeholder="Square Feet"
          className="input-field"
          value={propertyData.sqfeet}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="securitydeposit"
          placeholder="Security Deposit (₹)"
          className="input-field"
          value={propertyData.securitydeposit}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="additionalcharges"
          placeholder="Additional Charges (₹)"
          className="input-field"
          value={propertyData.additionalcharges}
          onChange={handleChange}
        />

        <select
          name="areaid"
          className="input-field"
          value={propertyData.areaid}
          onChange={handleChange}
          required
        >
          <option value="">Select Area</option>
          {areas.map((area) => (
            <option key={area.areaid} value={area.areaid}>
              {area.areaname}
            </option>
          ))}
        </select>

        <select
          name="furnishid"
          className="input-field"
          value={propertyData.furnishid}
          onChange={handleChange}
          required
        >
          <option value="">Select Furnish Type</option>
          {furnishTypes.map((furnish) => (
            <option key={furnish.furnishid} value={furnish.furnishid}>
              {furnish.furnishtype}
            </option>
          ))}
        </select>

        <select
          name="propertytypeid"
          className="input-field"
          value={propertyData.propertytypeid}
          onChange={handleChange}
          required
        >
          <option value="">Select Property Type</option>
          {propertyTypes.map((propertyType) => (
            <option
              key={propertyType.propertytypeid}
              value={propertyType.propertytypeid}
            >
              {propertyType.propertytypename}
            </option>
          ))}
        </select>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="available"
              checked={propertyData.available}
              onChange={handleChange}
            />{" "}
            Available
          </label>
          <label>
            <input
              type="checkbox"
              name="gasconnection"
              checked={propertyData.gasconnection}
              onChange={handleChange}
            />{" "}
            Gas Connection
          </label>
          <label>
            <input
              type="checkbox"
              name="parking"
              checked={propertyData.parking}
              onChange={handleChange}
            />{" "}
            Parking
          </label>
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          className="file-input"
          onChange={handleImageChange}
        />

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
