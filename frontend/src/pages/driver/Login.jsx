import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDriverAuthStore from "../../store/driver/authStore";

const DriverLogin = () => {
  const login = useDriverAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    if (result.status === "success") {
      navigate("/driver/dashboard");
    } else {
      setError(result.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white flex w-full max-w-5xl overflow-hidden">
        <div className="hidden md:block w-1/2">
          <img
            src="/pngtree-food-delivery-by-scooters-free-download-png-image_16940462.png"
            alt="Food delivery"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="w-full md:w-1/2 p-10">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Driver Login
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Login to your driver account
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E23E3E]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E23E3E]"
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 font-semibold">{error}</div>
            )}

            <div className="flex items-center justify-between text-sm">
              <a
                href="/driver/forgot-password"
                className="text-[#E23E3E] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E23E3E] text-white py-2 rounded-xl font-semibold hover:bg-red-400 transition"
            >
              Login
            </button>

            <p className="text-sm text-center mt-4 text-gray-600">
              Don’t have an account?
              <Link
                to="/driver/signup"
                className="text-[#E23E3E] hover:underline ml-1"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;
