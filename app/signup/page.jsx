"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Eye, EyeOff, Import } from "lucide-react";
import { useLang } from "../_components/LanguageProvider";
import { useTheme } from "../_components/ThemeContext";
import {register} from "../api/auth"


function Signup() {
  const router = useRouter();
  const { t, lang } = useLang();
  const isArabic = lang === "ar";
  const { theme } = useTheme();
const isDark = theme === "dark";


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !confirmPassword) {
      return setError(t("fill_all_fields"));
    }

    if (password !== confirmPassword) {
      return setError(t("password_not_match") || "Passwords do not match");
    }

    const payload = {
      username,
      email,
      password
    }

    try {
      setLoading(true);

      const data = await register(payload);

      router.push("/dashboard");
    } catch (err) {
      setError(t("signup_failed") || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
     <div
        className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500
        ${
          isDark
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"
            : "bg-gradient-to-br from-slate-50 to-blue-50"
        }`}
      >

      <div
        className={`w-full max-w-md backdrop-blur rounded-3xl p-8 shadow-2xl transition-all bg-white
       
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >

        {/* Logo */}
       <div className={`flex items-center justify-center mb-10  ${isArabic ? "flex-row-reverse " : ""}`}>

          
          
          <h2 className="text-3xl font-bold text-gray-900 ">
            {t("register")}
          </h2>
          
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="relative group:">
          <Input
            placeholder={t("username")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-5 pl-10 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 ${isArabic ? 'pr-10 pl-12' : 'pl-10 pr-12'}`}
          />
          <div className={`absolute inset-y-0 ${isArabic ? 'right-3' : 'left-3'} flex items-center pointer-events-none`}>
            <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
                />
              </svg>
            </div>
            </div> 


            {/* Email */}
            <div className="relative group">
              <Input
                type="email"
                placeholder={t("email_address")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-5 pl-10 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300  ${isArabic ? 'pr-10 pl-12' : 'pl-10 pr-12'}`}
              />
              <div className={`absolute inset-y-0 ${isArabic ? 'right-3' : 'left-3'} flex items-center pointer-events-none`}>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <div className="relative group">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-5 pl-10 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 ${isArabic ? 'pr-10 pl-12' : 'pl-10 pr-12'}`}
            />
            <div className={`absolute inset-y-0 ${isArabic ? 'right-3' : 'left-3'} flex items-center pointer-events-none`}>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          </div>
             <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 ${isArabic ? 'left-3' : 'right-3'} flex items-center text-gray-400 hover:text-gray-600 transition-colors`}
                >
                {showPassword ? <Eye className="w-5 h-5 cursor-pointer" /> : <EyeOff className="w-5 h-5 cursor-pointer" />}
              </button>
          </div>

          {/* Confirm Password */}
          <div className="relative group:">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={t("repeat_password")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full p-5 pl-10 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 ${isArabic ? 'pr-10 pl-12' : 'pl-10 pr-12'}`}
          />

          <div className={`absolute inset-y-0 ${isArabic ? 'right-3' : 'left-3'} flex items-center pointer-events-none`}>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          </div>
          

          {/* Remember */}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={rememberMe}
              onCheckedChange={setRememberMe}
              className="cursor-pointer border"
            />
            <span className="text-sm text-gray-700 font-medium cursor-pointer select-none">{t("remember_me")}</span>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-md cursor-pointer hover:scale-102"
          >
            {t("sign_up")}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center text-gray-500">{t("or")}</div>

       {/* Social Login Buttons */}
               <div className="grid gap-3">
                 <Button
                   variant="outline"
                   className="w-full py-3 rounded-xl border bg-white text-zinc-900 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 font-medium cursor-pointer hover:scale-102"
                 >
                   <FcGoogle className="w-5 h-5" />
                   <span>{t("sign_up_google") }</span>
                 </Button>
                 <Button
                   variant="outline"
                   className="w-full py-3 rounded-xl border bg-white text-zinc-900 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 font-medium cursor-pointer hover:scale-102"
                 >
                   <FaFacebook className="w-5 h-5 text-blue-600" />
                   <span>{t("sign_up_facebook") || "Continue with Facebook"}</span>
                 </Button>
               </div>

        {/* Login link */}
        <p className="text-center mt-6 text-gray-600">
          {t("already_have_account")}{" "}
          <Link href="/login" className="text-blue-600 font-semibold">
            {t("sign_in")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
