import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
/*import logo from "./Logo.png";*/
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("❌ Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      const token = data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user));
      const decoded = jwtDecode(token);
      console.log("✅ Logged in user:", decoded);

      navigate("/RDV");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-2xl rounded-3xl p-14 w-full max-w-2xl transition-all duration-300 text-gray-800 scale-105">
        {/* Logo */}
        <div className="flex justify-center mb-6">
         
        </div>

        {/* Header */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="text-lg font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              className="mt-2 w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <label className="text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="mt-2 w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none pr-12"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-4 top-12 text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-center text-base">{error}</p>
          )}

          <div className="text-base text-center text-gray-500">
            Forgot password?{" "}
            <Link
              to="/forgot-password"
              className="text-blue-600 font-semibold hover:underline"
            >
              Reset here
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading || password.trim() === ""}
            className={`w-full py-4 text-xl font-semibold text-white rounded-2xl transition-all duration-300 ${
              password.trim() === ""
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } ${loading ? "cursor-wait" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
