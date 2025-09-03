import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useDriverAuthStore from "../../store/driver/authStore";

const DriverResetPassword = () => {
  const resetPassword = useDriverAuthStore((state) => state.resetPassword);
  const { state } = useLocation();
  const phone = state?.phone;
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  if (!phone) {
    navigate("/driver/forgot-password");
  }

  const handleOTPInput = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const otpCode = otp.join("");
    const result = await resetPassword(phone, otpCode, newPassword);

    setLoading(false);

    if (result.status === "success") {
      setMessage("Password reset successfully!");
      setTimeout(() => {
        navigate("/driver/login");
      }, 2000);
    } else {
      setError(result.message || "Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-xl text-center">
        <div className="text-4xl text-green-600 mb-4">🔐</div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Reset Password
        </h2>
        <p className="text-gray-500 mb-6">
          Enter the 6-digit code sent to <strong>{phone}</strong> and create a
          new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                ref={(el) => (inputsRef.current[idx] = el)}
                value={digit}
                onChange={(e) => handleOTPInput(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition"
              />
            ))}
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default DriverResetPassword;
