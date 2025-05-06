import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/ui/Logo";
import useAuthStore from "../../store/authStore";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const InputClass = "w-full px-4 py-2 border border-gray-100 rounded-md bg-gray-50";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/dashboard"); // Redirect to your dashboard or home page
    } catch (err) {
      // Error is handled by Zustand store and shown below
    }
  };

  return (
    <section className="bg-white w-screen h-screen flex items-center justify-center">
      <div className="custome-container flex items-center justify-center">
        <div className="bg-white shadow-lg p-6 w-full max-w-md text-center rounded-lg flex flex-col items-center gap-4">
          <Logo />
          <p className="text-sm font-light text-gray-600">
            Welcome back! Log in to access your dashboard and features.
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="text-start">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={InputClass}
                required
              />
            </div>

            <div className="text-start">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={InputClass}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2">
            <div className="border-b border-gray-200 w-20"></div>
            or
            <div className="border-b border-gray-200 w-20"></div>
          </div>

          <div className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
