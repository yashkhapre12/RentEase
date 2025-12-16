import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { login } from "../slice"; // Redux action
import { useDispatch } from "react-redux";

function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:8112/auth/login", // ✅ Correct backend URL
        requestBody
      );

      const user = response.data;

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // ✅ Success alert
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${user.firstName}!`,
      });

      // ✅ Save user ID in session storage
      sessionStorage.setItem("userId", user.userId);

      // ✅ Update Redux state
      dispatch(login({ username: user.firstName }));

      // ✅ Redirect based on role
      const roleId = user.roleId?.roleId;
      if (roleId === 1) {
        navigate("/admin");
      } else if (roleId === 2) {
        navigate("/tenant");
      } else if (roleId === 3) {
        navigate("/landlord");
      } else {
        navigate("/home");
      }

    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data?.message ||
          "Invalid credentials or server not reachable.",
      });
    }
  };


  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              placeholder="Enter your email"
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
              className="form-input"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Sign In
          </button>

          {/* Link to Registration page */}
          <div className="auth-footer">
            Don’t have an account? <Link to="/register">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
