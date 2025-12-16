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
import { crudApi } from "../api/axiosConfig";
import toast from "react-hot-toast";
import "../styles/Dashboard.css";

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
          crudApi.get("/area/getArea"),
          crudApi.get("/furnished/getFurnished"),
          crudApi.get("/propertytype/getPropertyType"),
        ]);

        setAreas(areaRes.data || []);
        setFurnishTypes(furnishRes.data || []);
        setPropertyTypes(propertyRes.data || []);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        toast.error("Failed to load property options. Please try again later.");
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
      const response = await crudApi.post(
        "/property/add",
        propertyData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Property added successfully:", response.data);
      const propertyId = response.data.propertyid;

      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => formData.append("photos", image));

        await crudApi.post(
          `/property/${propertyId}/upload-photos`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Images uploaded successfully!");
      }

      toast.success("Property added successfully!");

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
      toast.error(
        error.response?.data?.message ||
        "Failed to add property. Please check your input."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h2 className="page-title">List Your Property</h2>
        <p className="page-subtitle">Fill in the details to reach thousands of potential tenants.</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-input"
                value={propertyData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Lease Duration (Months)</label>
              <input
                type="text"
                name="leaseduration"
                className="form-input"
                value={propertyData.leaseduration}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Rent (₹)</label>
              <input
                type="number"
                name="rent"
                className="form-input"
                value={propertyData.rent}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Size (sq ft)</label>
              <input
                type="number"
                name="sqfeet"
                className="form-input"
                value={propertyData.sqfeet}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Security Deposit (₹)</label>
              <input
                type="number"
                name="securitydeposit"
                className="form-input"
                value={propertyData.securitydeposit}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Additional Charges (₹)</label>
              <input
                type="number"
                name="additionalcharges"
                className="form-input"
                value={propertyData.additionalcharges}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Area</label>
              <select name="areaid" className="form-select" value={propertyData.areaid} onChange={handleChange} required>
                <option value="">Select Area</option>
                {areas.map((area) => (
                  <option key={area.areaid} value={area.areaid}>{area.areaname}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Furnishing</label>
              <select name="furnishid" className="form-select" value={propertyData.furnishid} onChange={handleChange} required>
                <option value="">Select Type</option>
                {furnishTypes.map((furnish) => (
                  <option key={furnish.furnishid} value={furnish.furnishid}>{furnish.furnishtype}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Property Type</label>
              <select name="propertytypeid" className="form-select" value={propertyData.propertytypeid} onChange={handleChange} required>
                <option value="">Select Type</option>
                {propertyTypes.map((propertyType) => (
                  <option key={propertyType.propertytypeid} value={propertyType.propertytypeid}>{propertyType.propertytypename}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="form-label">Amenities & Features</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" name="available" className="checkbox-input" checked={propertyData.available} onChange={handleChange} />
                Available
              </label>
              <label className="checkbox-label">
                <input type="checkbox" name="gasconnection" className="checkbox-input" checked={propertyData.gasconnection} onChange={handleChange} />
                Gas Connection
              </label>
              <label className="checkbox-label">
                <input type="checkbox" name="parking" className="checkbox-input" checked={propertyData.parking} onChange={handleChange} />
                Parking
              </label>
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="form-label">Property Images</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <p className="small text-muted mt-2">Selected: {images.length} images</p>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-3" disabled={loading}>
            {loading ? "Submitting..." : "List Property"}
          </button>
        </form>
      </div>

      <button className="btn btn-link mt-4 d-block mx-auto" onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
};

export default AddProperty;
