import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user._id);
        window.dispatchEvent(new Event("authChange"));
        alert("Login Successful");
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in", error);
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
