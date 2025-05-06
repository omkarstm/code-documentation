import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // assuming React Router is used
import useAuthStore from "../../store/authStore";
import Logo from "../../components/ui/Logo";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    number: "",
  });

  const navigate = useNavigate();
  const { signup, loading, error } = useAuthStore();

  const InputClass =
    "w-full px-4 py-2 border border-gray-100 rounded-md bg-gray-50";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate("/login"); // or auto-login and redirect to dashboard
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <section className="bg-white w-screen h-screen flex items-center justify-center">
      <div className="custome-container flex items-center justify-center">
        <div className="bg-white shadow-lg p-6 w-full max-w-md text-center rounded-lg flex flex-col items-center gap-4">
          <Logo />
          <p className="text-sm font-light text-gray-600">
            Join us and start your journey toward exclusive tools and features.
          </p>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="text-start">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                name="fullName"
                type="text"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={handleChange}
                className={InputClass}
              />
            </div>

            <div className="text-start">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={InputClass}
              />
            </div>

            <div className="text-start">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                name="number"
                type="text"
                placeholder="Enter your phone number"
                value={formData.number}
                onChange={handleChange}
                className={InputClass}
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
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>

          <div className="flex items-center justify-center gap-2 ">
            <div className="border-b border-gray-200 w-20"></div>
            or
            <div className="border-b border-gray-200 w-20"></div>
          </div>
          <div className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
