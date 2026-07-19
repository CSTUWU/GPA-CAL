import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-[440px] bg-white border border-slate-200/80 rounded-2xl p-10 text-center shadow-lg flex flex-col items-center justify-center min-h-[460px]">
        <div className="w-14 h-14 bg-[#eeebff] text-primary rounded-full flex items-center justify-center mb-6">
          <Calculator size={28} strokeWidth={2.5} />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-900 mb-3">Welcome Back!</h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8">
          Logged in successfully as <strong className="text-slate-800">{formData.email}</strong>.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-primary text-white font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-primary-hover transition-colors duration-200 cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[440px] flex flex-col items-center">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex items-center gap-2 font-heading font-extrabold text-xl text-primary mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#eeebff] text-primary flex items-center justify-center">
            <Calculator size={18} strokeWidth={2.5} />
          </div>
          <span>UniMate</span>
        </div>
        <p className="text-xs text-slate-400 font-medium">Precision in Academic Excellence</p>
      </div>

      {/* Login Card */}
      <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-8 md:p-10 shadow-lg">
        <h1 className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight mb-2">
          Welcome Back
        </h1>
        <p className="text-slate-400 text-sm mb-8">
          Access your academic tracking and institutional data.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Institutional Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Institutional Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. s.jobs@university.edu"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              required
            />
          </div>

          {/* Password with Forgot Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-slate-500">Password</label>
              <a href="#forgot" className="text-xs font-semibold text-primary hover:underline">
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              required
            />
          </div>

          {/* Remember Device Checkbox */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
            />
            <label htmlFor="rememberMe" className="text-xs text-slate-500 select-none cursor-pointer">
              Remember this device for 30 days
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg text-rose-600 text-xs font-semibold text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold text-sm py-3 px-4 rounded-lg hover:bg-primary-hover flex items-center justify-center gap-2 shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-200 cursor-pointer mt-4"
          >
            <span>Log In</span>
            <ArrowRight size={15} strokeWidth={2.5} />
          </button>
        </form>
      </div>

      {/* Redirection Link */}
      <div className="text-center mt-6">
        <span className="text-xs text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Create Account
          </Link>
        </span>
      </div>

      {/* Policies */}
      <div className="flex justify-center gap-4 text-[10px] font-semibold text-slate-400/80 mt-6">
        <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
        <span>•</span>
        <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
      </div>

      {/* Copyright */}
      <p className="text-[10px] text-slate-400 mt-4 tracking-wider uppercase font-semibold text-center">
        &copy; 2024 UniMate Precision Systems
      </p>
    </div>
  );
}
