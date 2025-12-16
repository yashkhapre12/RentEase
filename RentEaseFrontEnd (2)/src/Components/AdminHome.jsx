import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { crudApi, transactionApi } from "../api/axiosConfig";
import toast from "react-hot-toast";
import "../styles/Dashboard.css"; // Import unified styles
import InterestedUsers from "./InterestedUsers"; // Import the component

const AdminHome = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [interestedUsers, setInterestedUsers] = useState({});
  const [interestLoading, setInterestLoading] = useState({});
  const [availabilityLoading, setAvailabilityLoading] = useState({});

  // Fetch all properties from API
  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        setLoading(true);
        const response = await crudApi.get(
          "/property/all"
        );
        setProperties(response.data);
      } catch (error) {
        console.error(
          error.response?.data || error.message
        );
        toast.error("Failed to fetch properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProperties();
  }, []);

  // Function to fetch interested users
  const fetchInterestedUsers = async (propertyId) => {
    setInterestLoading((prev) => ({ ...prev, [propertyId]: true }));
    try {
      const response = await transactionApi.get(
        `/users-by-property/${propertyId}`
      );
      setInterestedUsers((prev) => ({ ...prev, [propertyId]: response.data }));
    } catch (error) {
      console.error("Error fetching interested users:", error);
      setInterestedUsers((prev) => ({ ...prev, [propertyId]: [] }));
    } finally {
      setInterestLoading((prev) => ({ ...prev, [propertyId]: false }));
    }
  };

  // Function to toggle property availability
  const toggleAvailability = async (propertyId) => {
    setAvailabilityLoading((prev) => ({ ...prev, [propertyId]: true }));
    try {
      const response = await crudApi.put(
        `/property/${propertyId}/toggle-availability`
      );

      if (response.status === 200) {
        // Update state with new availability status
        setProperties((prevProperties) =>
          prevProperties.map((property) =>
            property.propertyid === propertyId
              ? { ...property, available: !property.available }
              : property
          )
        );
      }
    } catch (error) {
      console.error("Error toggling availability:", error);
      toast.error("Failed to update availability.");
    } finally {
      setAvailabilityLoading((prev) => ({ ...prev, [propertyId]: false }));
    }
  };


  return (
    <div className="dashboard-container">
      <div className="page-header">
        <h2 className="page-title">Admin Dashboard</h2>
        <button className="btn btn-outline-secondary mt-3" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : properties.length === 0 ? (
        <p className="text-center">No properties found.</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <div key={property.propertyid} className="property-card">
              <div className="property-image-wrapper">
                {property.photos?.length > 0 ? (
                  <img
                    src={`data:image/jpeg;base64,${property.photos[0].photo}`}
                    alt="Property"
                    className="property-image"
                  />
                ) : (
                  <div className="property-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>
                )}
              </div>

              <div className="property-content">
                <h3 className="property-address">{property.address}</h3>
                <div className="property-price">₹{property.rent} <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>/ month</span></div>

                <div className="property-specs">
                  <div className="spec-item">Area: {property.areaid.areaname}</div>
                  <div className="spec-item">Deposit: ₹{property.securitydeposit}</div>
                  <div className="spec-item">Size: {property.sqfeet} sqft</div>
                  <div className="spec-item">Available: <span className={`badge ${property.available ? 'badge-success' : 'badge-warning'}`}>{property.available ? "Yes" : "No"}</span></div>
                </div>

                {/* Actions */}
                <div className="d-flex flex-column gap-2 mt-3">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => fetchInterestedUsers(property.propertyid)}
                    disabled={interestLoading[property.propertyid]}
                  >
                    {interestLoading[property.propertyid] ? "Loading..." : "Check Interest"}
                  </button>

                  {/* Change Availability Button */}
                  <button
                    className={`btn btn-sm ${property.available ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => toggleAvailability(property.propertyid)}
                    disabled={availabilityLoading[property.propertyid]}
                  >
                    {availabilityLoading[property.propertyid] ? "Updating..." : (property.available ? "Mark as Unavailable" : "Mark as Available")}
                  </button>
                </div>

                {interestedUsers[property.propertyid] && (
                  <div className="mt-3">
                    <InterestedUsers users={interestedUsers[property.propertyid]} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminHome;
