import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
        const response = await axios.get(
          "http://localhost:8110/crud/all/property"
        );
        setProperties(response.data);
      } catch (error) {
        console.error(
          "Error fetching properties:",
          error.response?.data || error.message
        );
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
      const response = await axios.get(
        `https://localhost:8110/TenantProperty/users-by-property/${propertyId}`
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
      const response = await axios.put(
        `http://localhost:8110/crud/${propertyId}/toggle-availability`
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
    } finally {
      setAvailabilityLoading((prev) => ({ ...prev, [propertyId]: false }));
    }
  };

  return (
    <div className="show-property-container">
      <h2 className="show-property-title">Admin Dashboard</h2>

      <button className="go-back-button" onClick={() => navigate(-1)}>
        ← Go Back
      </button>

      {loading ? (
        <p>🔍 Loading properties...</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <div key={property.propertyid} className="property-card">
              {property.photos?.length > 0 ? (
                <img
                  src={`data:image/jpeg;base64,${property.photos[0].photo}`}
                  alt="Property"
                  className="property-image"
                />
              ) : (
                <p className="text-gray-500">No images available</p>
              )}

              <div className="property-details">
                <h3>{property.address}</h3>
                <p>
                  <strong>Area:</strong> {property.areaid.areaname} (Pincode:{" "}
                  {property.areaid.pincode})
                </p>
                <p>
                  <strong>Rent:</strong> ₹{property.rent} / month
                </p>
                <p>
                  <strong>Security Deposit:</strong> ₹{property.securitydeposit}
                </p>
                <p>
                  <strong>Size:</strong> {property.sqfeet} sq. ft.
                </p>
                <p>
                  <strong>Lease Duration:</strong> {property.leaseduration}
                </p>
                <p>
                  <strong>Additional Charges:</strong> ₹
                  {property.additionalcharges}
                </p>
                <p>
                  <strong>Available:</strong>{" "}
                  {property.available ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Gas Connection:</strong>{" "}
                  {property.gasconnection ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Parking:</strong>{" "}
                  {property.parking ? "Available" : "Not Available"}
                </p>
                <p>
                  <strong>Listed On:</strong>{" "}
                  {new Date(property.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="landlord-details">
                <h4>Landlord Details</h4>
                <p>
                  <strong>Name:</strong> {property.userid.firstName}{" "}
                  {property.userid.lastName}
                </p>
                <p>
                  <strong>Contact:</strong> {property.userid.contact}
                </p>
                <p>
                  <strong>Email:</strong> {property.userid.email}
                </p>
                <p>
                  <strong>Aadhar No:</strong> {property.userid.aadharNo}
                </p>
                <p>
                  <strong>UPI ID:</strong> {property.userid.upiId}
                </p>
              </div>

              {/* Check Interested Users Button */}
              <button
                className="check-interest-button"
                onClick={() => fetchInterestedUsers(property.propertyid)}
                disabled={interestLoading[property.propertyid]}
              >
                {interestLoading[property.propertyid]
                  ? "Loading..."
                  : "Check if Anyone Interested"}
              </button>

              {interestedUsers[property.propertyid] && (
                <InterestedUsers users={interestedUsers[property.propertyid]} />
              )}

              {/* Change Availability Button */}
              <button
                className="change-availability-button"
                onClick={() => toggleAvailability(property.propertyid)}
                disabled={availabilityLoading[property.propertyid]}
              >
                {availabilityLoading[property.propertyid]
                  ? "Updating..."
                  : "Change Availability"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminHome;
