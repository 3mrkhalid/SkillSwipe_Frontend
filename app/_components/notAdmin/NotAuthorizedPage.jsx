"use client";

import React from "react";
import { useRouter } from "next/navigation";
import HeaderForDashboard from "../../dashboard/_component/HeaderForDashboard";
import FooterForDashboard from "../../dashboard/_component/FooterForDashboard";
import { useLang } from "@/app/_components/LanguageProvider";
import { useTheme } from "@/app/_components/ThemeContext";

function NotAuthorizedPage() {
  const router = useRouter();
  const { t } = useLang();
    const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-[#0f172a]" : "bg-gray-50"}`}>
      <HeaderForDashboard />

      <div className="flex flex-col items-center justify-center flex-1 py-10">
        <img
          src="/assets/img/red-card.png"
          alt="Access Denied"
         className="w-[500px] h-auto mb-2"
        />

        <h1 className={`text-3xl text-center mt-10 font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            {t("NotAuthorized_title")}
        </h1>

        <p className={` mt-2 text-center ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
            {t("NotAuthorized_subtitle")}
        </p>

        <button
          onClick={() => router.back()}
          className="bg-blue-500 hover:bg-blue-600 text-white w-[300px] py-2 rounded-md mt-6 transition cursor-pointer"
        >
            {t("Go_Back") }
        </button>
      </div>

      <footer className="bg-slate-900 text-center text-white w-full">
        <FooterForDashboard />
      </footer>
    </div>
  );
}

export default NotAuthorizedPage;