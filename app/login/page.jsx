"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useLang } from "../_components/LanguageProvider";
import { useTheme } from "../_components/ThemeContext";
import { login } from "../api/auth";



function Login() {
  const router = useRouter();
  const { t, lang } = useLang();
  const isArabic = lang === "ar";

  const {theme} = useTheme();
  const isDark = theme === "dark";

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("fill_all_fields") || "Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      
     const data = await login({ email, password });

     if (data.isAdmin === true) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || t("login_failed") || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500
    ${isDark 
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900" 
      : "bg-gradient-to-br from-slate-50 to-blue-50"
    }`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob
        ${isDark ? 'bg-purple-700/30' : 'bg-purple-300/20'}
      `}></div>
      <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000
        ${isDark ? 'bg-blue-700/30' : 'bg-blue-300/20'}
      `}></div>
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000
        ${isDark ? 'bg-cyan-600/30' : 'bg-cyan-300/20'}
      `}></div>
      </div>

      <div className={`relative z-10 p-8 rounded-3xl w-full max-w-md bg-white  shadow-2xl border border-white/20 transform transition-all duration-500 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        {/* Logo Section */}
        <div className={`flex items-center justify-center  mb-10  ${isArabic ? "flex-row-reverse " : ""}`}>
         

          
          <h2 className="text-3xl font-bold text-gray-900 ">
            {t("sign_in") || "Sign In"}
          </h2>
          
        </div>

        {/* Header */}
       

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl animate-shake">
            <p className="text-red-600 text-sm font-medium text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              {t("email_address") || "Email Address"}
            </label>
            <div className="relative group">
              <Input
                type="email"
                placeholder={t("email_placeholder") || "you@example.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-5 pl-10 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 ${isArabic ? "text-right pr-10 pl-3" : "text-left pl-10"}`}
                
              />
              <div className={`absolute inset-y-0 ${isArabic ? 'right-3' : 'left-3'} flex items-center pointer-events-none`}>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              {t("password")}
            </label>
            <div className="relative group">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={t("password_placeholder") || "Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-5 ${isArabic ? 'pr-10 pl-12' : 'pl-10 pr-12'} rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                
              />
              <div className={`absolute inset-y-0 ${isArabic ? 'right-3' : 'left-3'} flex items-center pointer-events-none`}>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 ${isArabic ? 'left-3' : 'right-3'} flex items-center text-gray-400 hover:text-gray-600 transition-colors`}
              >
                {showPassword ? <Eye className="w-5 h-5 cursor-pointer" /> : <EyeOff className="w-5 h-5 cursor-pointer" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className={`flex items-center justify-between ${isArabic ? "flex-row-reverse" : ""}`}>
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border"
              />
              <label htmlFor="remember" className="text-sm text-gray-700 font-medium cursor-pointer select-none">
                {t("remember_me") || "Remember me"}
              </label>
            </div>
            <Link href="/forget-password" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
              {t("forget_password") || "Forgot password?"}
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-md cursor-pointer hover:scale-102"
            >
            {t("sign_in")}
            </Button>
        </form>

        {/* Divider */}
        <div className="my-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">{t("or") || "Or continue with"}</span>
            </div>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid gap-3">
          <Button
            variant="outline"
            className="w-full py-3 rounded-xl border bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 font-medium cursor-pointer hover:scale-102"
          >
            <FcGoogle className="w-5 h-5" />
            <span>{t("sign_in_google") || "Continue with Google"}</span>
          </Button>
          <Button
            variant="outline"
            className="w-full py-3 rounded-xl border bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 font-medium cursor-pointer hover:scale-102"
          >
            <FaFacebook className="w-5 h-5 text-blue-600" />
            <span>{t("sign_in_facebook") || "Continue with Facebook"}</span>
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className={`mt-8 text-center ${isArabic ? "flex-row-reverse" : ""}`}>
          <p className="text-gray-600">
            {t("no_account") }{" "}
            <Link
              href="/signup"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300"
            >
              {t("sign_up")}
            </Link>
          </p>
        </div>

        {/* Bottom decorative element */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-50"></div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Login;