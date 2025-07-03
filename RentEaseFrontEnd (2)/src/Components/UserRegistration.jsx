// import React, { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios"; // For API requests
// import { useForm } from "react-hook-form";
// import "../styles/UserRegistration.css"

// const UserRegistration = () => {
//   const [roles, setRoles] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [registrationSuccess, setRegistrationSuccess] = useState(false); // State to track success
//   const [loading, setLoading] = useState(false); // State for loading
//   const navigate = useNavigate(); // Hook for navigation

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     trigger, // Used for manual validation on change
//   } = useForm({ mode: "onChange" }); // Set the validation mode to 'onChange'

//   useEffect(() => {
//     // Fetch roles
//     const fetchRoles = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8112/api/roles/getRoles"
//         );
//         setRoles(response.data);
//       } catch (error) {
//         console.error("Error fetching roles:", error);
//       }
//     };

//     // Fetch areas
//     const fetchAreas = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8112/api/area/getArea"
//         );
//         setAreas(response.data);
//       } catch (error) {
//         console.error("Error fetching areas:", error);
//       }
//     };

//     fetchRoles();
//     fetchAreas();
//   }, []);

//   const onSubmit = async (data) => {
//     setLoading(true); // Set loading to true when starting the registration
//     try {
//       // Post the data to the backend API
//       console.log(data);
//       const response = await axios.post(
//         "http://localhost:8112/api/user/register",
//         data
//       );

//       if (response.status === 200) {
//         alert("User registered successfully!");
//         setSubmittedData(payload); // Store the submitted data to display
//         setFormData({
//           firstName: "",
//           lastName: "",
//           email: "",
//           password: "",
//           aadharNo: "",
//           address: "",
//           contact: "",
//           upiId: "",
//         });
//         setSelectedRole("");
//         setSelectedArea("");
//       }

//       // Redirect to the login page after successful registration
//       Swal.fire({
//         title: "Success",
//         text: "Registration successful! You can now log in.",
//         icon: "success",
//         confirmButtonText: "OK"
//       });

//       navigate("/login",{ state: { message: "Registration successful! You can now log in." } });
//     } catch (error) {
//       console.error("Error registering user:", error);
//       Swal.fire("Error", "Failed to register user. Please try again.", "error");
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   useEffect(() => {
//     if (registrationSuccess) {
//       Swal.fire({
//         title: "Success",
//         text: "Registration successful! You can now log in.",
//         icon: "success",
//         confirmButtonText: "OK"
//       });

//       navigate("/login", { state: { message: "Registration successful! You can now log in." } }); // Redirect to login after successful registration
//     }
//   }, [registrationSuccess, navigate]); // Only run when registrationSuccess changes

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">User Registration</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* First Name */}
//         <div className="mb-3">
//           <label htmlFor="firstName" className="form-label">
//             First Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             name="firstName"
//             {...register("firstName", {
//               required: "First name is required",
//               onChange: () => trigger("firstName"), // Trigger validation on change
//             })}
//           />
//           {errors.firstName && (
//             <small className="text-danger">{errors.firstName.message}</small>
//           )}
//         </div>

//         {/* Last Name */}
//         <div className="mb-3">
//           <label htmlFor="lastName" className="form-label">
//             Last Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             name="lastName"
//             {...register("lastName", {
//               required: "Last name is required",
//               onChange: () => trigger("lastName"), // Trigger validation on change
//             })}
//           />
//           {errors.lastName && (
//             <small className="text-danger">{errors.lastName.message}</small>
//           )}
//         </div>

//         {/* Email */}
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             name="email"
//             {...register("email", {
//               required: "Email is required",
//               onChange: () => trigger("email"), // Trigger validation on change
//             })}
//           />
//           {errors.email && (
//             <small className="text-danger">{errors.email.message}</small>
//           )}
//         </div>

//         {/* Password */}
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             name="password"
//             {...register("password", {
//               required: "Password is required",
//               minLength: {
//                 value: 6,
//                 message: "Password must be at least 6 characters",
//               },
//               onChange: () => trigger("password"), // Trigger validation on change
//             })}
//           />
//           {errors.password && (
//             <small className="text-danger">{errors.password.message}</small>
//           )}
//         </div>

//         {/* Aadhar No */}
//         <div className="mb-3">
//           <label htmlFor="aadharNo" className="form-label">
//             Aadhar No
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             name="aadharNo"
//             {...register("aadharNo", {
//               required: "Aadhar number is required",
//               pattern: {
//                 value: /^\d{12}$/,
//                 message: "Aadhar number must be 12 digits",
//               },
//               onChange: () => trigger("aadharNo"), // Trigger validation on change
//             })}
//           />
//           {errors.aadharNo && (
//             <small className="text-danger">{errors.aadharNo.message}</small>
//           )}
//         </div>

//         {/* Address */}
//         <div className="mb-3">
//           <label htmlFor="address" className="form-label">
//             Address
//           </label>
//           <textarea
//             className="form-control"
//             name="address"
//             {...register("address", {
//               required: "Address is required",
//               onChange: () => trigger("address"), // Trigger validation on change
//             })}
//           />
//           {errors.address && (
//             <small className="text-danger">{errors.address.message}</small>
//           )}
//         </div>

//         {/* Contact */}
//         <div className="mb-3">
//           <label htmlFor="contact" className="form-label">
//             Contact
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             name="contact"
//             {...register("contact", {
//               required: "Contact number is required",
//               pattern: {
//                 value: /^\d{10}$/,
//                 message: "Contact number must be 10 digits",
//               },
//               onChange: () => trigger("contact"), // Trigger validation on change
//             })}
//           />
//           {errors.contact && (
//             <small className="text-danger">{errors.contact.message}</small>
//           )}
//         </div>

//         {/* UPI ID */}
//         <div className="mb-3">
//           <label htmlFor="upiid" className="form-label">
//             UPI ID
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             name="upiId"
//             {...register("upiId", {
//               required: "UPI ID is required",
//               onChange: () => trigger("upiId"), // Trigger validation on change
//             })}
//           />
//           {errors.upiid && (
//             <small className="text-danger">{errors.upiid.message}</small>
//           )}
//         </div>

//         {/* Role Dropdown */}
//         <div className="mb-3">
//           <label htmlFor="role" className="form-label">
//             Role
//           </label>
//           <select
//             className="form-select"
//             name="roleId"
//             {...register("roleId", {
//               required: "Role is required",
//               onChange: () => trigger("roleId"), // Trigger validation on change
//             })}
//           >
//             <option value="">Select Role</option>
//             {roles.length > 0 ? (
//               roles.map((role) => (
//                 <option
//                   key={role.roleId}
//                   value={role.roleId}
//                   disabled={role.roleName === "admin"} // Disable the option if roleName is "admin"
//                 >
//                   {role.roleName}
//                 </option>
//               ))
//             ) : (
//               <option disabled>No roles available</option>
//             )}
//           </select>
//           {errors.roleId && (
//             <small className="text-danger">{errors.roleId.message}</small>
//           )}
//         </div>

//         {/* Area Dropdown */}
//         <div className="mb-3">
//           <label htmlFor="area" className="form-label">
//             Area
//           </label>
//           <select
//             className="form-select"
//             name="areaId"
//             {...register("areaId", {
//               required: "Area is required",
//               onChange: () => trigger("areaId"), // Trigger validation on change
//             })}
//           >
//             <option value="">Select Area</option>
//             {areas.length > 0 ? (
//               areas.map((area) => (
//                 <option key={area.areaid} value={area.areaid}>
//                   {area.areaname}
//                 </option>
//               ))
//             ) : (
//               <option disabled>No areas available</option>
//             )}
//           </select>
//           {errors.areaId && (
//             <small className="text-danger">{errors.areaId.message}</small>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//           {loading ? "Registering..." : "Register"}
//         </button>

//         {/* Link to Login */}
//         <p className="mt-3 text-center">
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default UserRegistration;
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // For API requests
import { useForm } from "react-hook-form";
import "../styles/UserRegistration.css";

const UserRegistration = () => {
  const [roles, setRoles] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate(); // Hook for navigation

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    // Fetch roles
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:8110/auth/getRoles");
        const filteredRoles = response.data.filter(
          (role) => role.roleName.toLowerCase() !== "admin"
        );
        setRoles(filteredRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    // Fetch areas
    const fetchAreas = async () => {
      try {
        const response = await axios.get("http://localhost:8110/auth/getArea");
        setAreas(response.data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchRoles();
    fetchAreas();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8110/auth/register",
        data
      );

      if (response.status === 201) {
        await Swal.fire({
          title: "Success",
          text: "Registration successful! You can now log in.",
          icon: "success",
          confirmButtonText: "OK",
        });

        navigate("/login", {
          state: { message: "Registration successful! You can now log in." },
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      Swal.fire("Error", "Failed to register user. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <small className="text-danger">{errors.firstName.message}</small>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <small className="text-danger">{errors.lastName.message}</small>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <small className="text-danger">{errors.email.message}</small>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <small className="text-danger">{errors.password.message}</small>
          )}
        </div>

        {/* Aadhar No */}
        <div className="mb-3">
          <label className="form-label">Aadhar No</label>
          <input
            type="text"
            className="form-control"
            {...register("aadharNo", {
              required: "Aadhar number is required",
              pattern: {
                value: /^\d{12}$/,
                message: "Aadhar number must be 12 digits",
              },
            })}
          />
          {errors.aadharNo && (
            <small className="text-danger">{errors.aadharNo.message}</small>
          )}
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <small className="text-danger">{errors.address.message}</small>
          )}
        </div>

        {/* Contact */}
        <div className="mb-3">
          <label className="form-label">Contact</label>
          <input
            type="text"
            className="form-control"
            {...register("contact", {
              required: "Contact number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Contact number must be 10 digits",
              },
            })}
          />
          {errors.contact && (
            <small className="text-danger">{errors.contact.message}</small>
          )}
        </div>

        {/* UPI ID */}
        <div className="mb-3">
          <label className="form-label">UPI ID</label>
          <input
            type="text"
            className="form-control"
            {...register("upiId", { required: "UPI ID is required" })}
          />
          {errors.upiId && (
            <small className="text-danger">{errors.upiId.message}</small>
          )}
        </div>

        {/* Role Dropdown */}
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            {...register("roleId", { required: "Role is required" })}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.roleId} value={role.roleId}>
                {role.roleName}
              </option>
            ))}
          </select>
          {errors.roleId && (
            <small className="text-danger">{errors.roleId.message}</small>
          )}
        </div>

        {/* Area Dropdown */}
        <div className="mb-3">
          <label className="form-label">Area</label>
          <select
            className="form-select"
            {...register("areaId", { required: "Area is required" })}
          >
            <option value="">Select Area</option>
            {areas.map((area) => (
              <option key={area.areaid} value={area.areaid}>
                {area.areaname}
              </option>
            ))}
          </select>
          {errors.areaId && (
            <small className="text-danger">{errors.areaId.message}</small>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Link to Login */}
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default UserRegistration;
