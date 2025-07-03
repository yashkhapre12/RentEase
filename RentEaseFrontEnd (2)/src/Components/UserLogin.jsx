import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../slice"; // Import login action
import { useDispatch } from "react-redux";

function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare the login request body
    const requestBody = { email, password };

    try {
      // Send POST request to backend for login
      const response = await axios.post(
        "http://localhost:8110/auth/login",
        requestBody
      );

      // Show a success alert if login is successful
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: response.data.message, // The message from the backend (if any)
      });

      // Extract the userId and roleId from the response data 
      const { userId, roleId, firstName } = response.data;
      console.log('37 response.data',response.data)
      // Store the userId in sessionStorage
      sessionStorage.setItem("userId", userId);

      dispatch(login({username: firstName}));

      // Check roleId and navigate to the appropriate page
      if (roleId.roleId === 1) {
        navigate("/admin");
      } else if (roleId.roleId === 2) {
        navigate("/tenant");
      } else if (roleId.roleId === 3) {
        navigate("/landlord");
      } else {
        navigate("/home"); // Default navigation if no matching role
      }
    } catch (error) {
      console.error(error);
      // Show error message from backend or a default error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data.message || "Login failed. Please try again.",
      });
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleLogin}>
        <h2 className="text-center mb-4">Login to your account</h2>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          LOG IN
        </button>

        {/* Link to Registration page */}
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default UserLogin;
