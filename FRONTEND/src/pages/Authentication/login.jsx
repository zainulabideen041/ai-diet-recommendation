import { useDispatch } from "react-redux";
import { loginUser, registerUser, verifyMail } from "../../redux/auth-slice";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import logo from "./assets/aimed.png";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [mode, setMode] = useState("login"); // "login", "signup", "verify"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [errors, setErrors] = useState({});

  // Verification code state
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [verifyError, setVerifyError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [emailToVerify, setEmailToVerify] = useState("");

  // Refs for verification code inputs
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Focus first verification input when in verify mode
  useEffect(() => {
    if (mode === "verify" && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [mode]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setAuthError(null);
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle verification code input changes
  const handleCodeInputChange = (index, value) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (verifyError) setVerifyError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle verification code key events
  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "Enter") {
      handleVerifyEmail();
    }
  };

  // Handle paste in verification code
  const handleCodePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").replace(/\D/g, "");

    if (pastedText.length === 6) {
      const newCode = pastedText.split("");
      setVerificationCode(newCode);
      inputRefs.current[5]?.focus();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (mode === "signup" && !formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (mode === "signup" && !formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (
      mode === "signup" &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      );

      if (res.payload?.success) {
        setAuthSuccess(res.payload.message);
        setAuthError(null);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setAuthSuccess(null);
        setAuthError(res.payload.message);
      }
    } catch (error) {
      setAuthError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "http://localhost:7004/auth/google",
        { id_token: credentialResponse.credential },
        { withCredentials: true } // 🔹 allow cookies
      );

      if (res.success) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await dispatch(
        registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      );

      if (res.payload?.success) {
        setAuthSuccess(res.payload.message);
        setAuthError(null);
        setEmailToVerify(formData.email);

        setTimeout(() => {
          setMode("verify");
        }, 1500);
      } else {
        setAuthSuccess(null);
        setAuthError(res.payload.message);
      }
    } catch (error) {
      setAuthError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    const codeString = verificationCode.join("");

    if (codeString.length !== 6) {
      setVerifyError("Please enter the complete 6-digit code");
      return;
    }

    setIsVerifying(true);
    setVerifyError("");

    try {
      const res = await dispatch(
        verifyMail({
          code: codeString,
          email: emailToVerify,
        })
      );

      if (res.payload?.success) {
        setAuthSuccess(res.payload.message);
        setTimeout(() => {
          setMode("login");
          resetForm();
        }, 2000);
      } else {
        setVerifyError(
          res.payload?.message || "Verification failed. Please try again."
        );
      }
    } catch (error) {
      setVerifyError("An error occurred. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      // You'll need to implement a resend code action in your redux
      // const res = await dispatch(resendVerificationCode({ email: emailToVerify }));
      // For now, just show a message
      setAuthSuccess("Verification code resent to your email!");
    } catch (error) {
      setVerifyError("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setVerificationCode(["", "", "", "", "", ""]);
    setErrors({});
    setAuthError(null);
    setAuthSuccess(null);
    setVerifyError("");
    setEmailToVerify("");
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    resetForm();
  };

  const renderVerificationContent = () => (
    <>
      {/* Header for verification */}
      <div className="text-center">
        <div className="lg:hidden mb-6">
          <img src={logo} alt="CureAI Logo" className="mx-auto h-16 w-auto" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Email Verification
        </h1>
        <p className="text-gray-600 mb-2">Enter the 6-digit code sent to</p>
        <p className="text-blue-600 font-semibold">{emailToVerify}</p>
      </div>

      {/* Verification Code Inputs */}
      <div className="space-y-6">
        <div className="flex justify-center space-x-3">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleCodeInputChange(index, e.target.value)}
              onKeyDown={(e) => handleCodeKeyDown(index, e)}
              onPaste={index === 0 ? handleCodePaste : undefined}
              className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white hover:bg-gray-100 ${
                verifyError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Verify Error Message */}
        {verifyError && (
          <div className="text-center">
            <p className="text-sm text-red-600 flex items-center justify-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {verifyError}
            </p>
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerifyEmail}
          disabled={isVerifying || verificationCode.join("").length !== 6}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isVerifying || verificationCode.join("").length !== 6
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] shadow-lg hover:shadow-xl"
          }`}
        >
          {isVerifying ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Verifying...
            </div>
          ) : (
            "Verify Email"
          )}
        </button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">or</span>
        </div>
      </div>

      {/* Resend Code and Back to Login */}
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-gray-600 mb-3">Didn't receive the code?</p>
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isResending}
            className={`font-semibold transition-colors duration-200 ${
              isResending
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:text-blue-800 hover:cursor-pointer"
            }`}
          >
            {isResending ? "Resending..." : "Resend Code"}
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => switchMode("login")}
            className="font-semibold text-gray-600 hover:text-gray-800 hover:cursor-pointer transition-colors duration-200"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </>
  );

  const renderAuthContent = () => (
    <>
      {/* Header for login/signup */}
      <div className="text-center">
        <div className="lg:hidden mb-6">
          <img src={logo} alt="CureAI Logo" className="mx-auto h-16 w-auto" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {mode === "signup" ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-gray-600">
          {mode === "signup"
            ? "Join us and start your healthcare journey"
            : "Sign in to continue to your account"}
        </p>
      </div>

      {/* Form */}
      <form
        className="space-y-6"
        onSubmit={mode === "signup" ? handleSignup : handleLogin}
      >
        {/* Name field - only for signup */}
        {mode === "signup" && (
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 border rounded-xl bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white hover:bg-gray-100 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200"
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.name}
              </p>
            )}
          </div>
        )}

        {/* Email field */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className={`w-full px-4 py-3 border rounded-xl bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white hover:bg-gray-100 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-600 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password field */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className={`w-full px-4 py-3 border rounded-xl bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white hover:bg-gray-100 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-200"
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-600 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password field - only for signup */}
        {mode === "signup" && (
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className={`w-full px-4 py-3 border rounded-xl bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white hover:bg-gray-100 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.confirmPassword}
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full hover:cursor-pointer py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] shadow-lg hover:shadow-xl"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {mode === "signup" ? "Creating Account..." : "Signing In..."}
            </div>
          ) : mode === "signup" ? (
            "Create Account"
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div>
        {/* GOOGLE LOGIN BTN  */}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>

      {/* Toggle between login/signup */}
      <div className="text-center">
        <p className="text-gray-600">
          {mode === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
          <button
            type="button"
            onClick={() => switchMode(mode === "signup" ? "login" : "signup")}
            className="ml-2 font-semibold text-blue-600 hover:text-blue-800 hover:cursor-pointer transition-colors duration-200"
          >
            {mode === "signup" ? "Sign In" : "Create Account"}
          </button>
        </p>
      </div>
    </>
  );

  return (
    <section className="min-h-screen flex font-inter">
      {/* Left side - Logo/Branding */}
      <div className="hidden bg-image lg:flex lg:w-1/2 xl:w-3/5 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-purple-400/20"></div>
        <div className="relative z-10 text-white text-center px-8">
          <div
            className="mb-8 transform hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="CureAI Logo"
              className="mx-auto h-24 w-auto drop-shadow-lg"
            />
          </div>
          <h2 className="text-4xl font-bold mb-4">
            {mode === "verify" ? "Verify Your Email" : "Welcome to cure"}
            <span className="text-green-600">AI</span>
          </h2>
          <p className="text-lg max-w-md mx-auto leading-relaxed">
            {mode === "verify"
              ? "We've sent a 6-digit verification code to your email address. Enter it below to complete your registration."
              : "Your intelligent healthcare companion for better health management and insights."}
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {mode === "verify"
            ? renderVerificationContent()
            : renderAuthContent()}

          {/* Success/Error Messages */}
          {(authError || authSuccess) && (
            <div
              className={`mt-4 text-sm px-4 py-3 rounded-lg flex items-center gap-2 ${
                authError
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : "bg-green-100 text-green-700 border border-green-300"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                {authError ? (
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
              {authError || authSuccess}
            </div>
          )}

          {/* Divider - only show for auth modes */}
          {mode !== "verify" && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              &copy; 2025 cure
              <span className="font-semibold text-blue-600">AI</span> - All
              Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
