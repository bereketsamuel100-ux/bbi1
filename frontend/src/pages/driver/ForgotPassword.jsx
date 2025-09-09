import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDriverAuthStore from "../../store/driver/authStore";

const DriverForgotPassword = () => {
  const forgotPassword = useDriverAuthStore((state) => state.forgotPassword);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const result = await forgotPassword(email, phone);

    setLoading(false);

    if (result.status === "success") {
      setMessage("OTP sent to your phone.");
      setTimeout(() => {
        navigate("/driver/reset-password", { state: { phone } });
      }, 1000);
    } else {
      setError(result.message || "Failed to send OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md text-center">
        <div className="text-4xl text-red-600 mb-4">🔑</div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Forgot Password
        </h2>
        <p className="text-gray-500 mb-6">
          Enter your email and phone to receive an OTP.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              placeholder="+2519XXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          {message && (
            <p className="text-green-600 text-sm text-center mt-2">{message}</p>
          )}
          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default DriverForgotPassword;
