"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { useLang } from "./_components/LanguageProvider";
import { useTheme } from "./_components/ThemeContext";

export default function NotFound() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  
  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300
        ${isDark ? "bg-[#0f172a]" : "bg-gray-50"}
      `}
    >
      <Header className="h-18" />

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center py-60 px-4 text-center">
        <img
          src={isDark ? "/assets/img/404-white.png" : "/assets/img/404.png"}
          alt="404"
          className="mb-8 max-w-[320px] md:max-w-[420px]"
        />

        <p
          className={`mb-6 text-lg sm:text-xl
            ${isDark ? "text-gray-300" : "text-gray-600"}
          `}
        >
          {t("NotFound")}
        </p>

        <Link
          href="/"
          className="
            px-6 py-3 rounded-xl font-semibold
            bg-gradient-to-r from-blue-600 to-purple-600
            text-white shadow-lg hover:shadow-xl
            hover:-translate-y-1 transition-all
          "
        >
          {t("return_home")}
        </Link>
      </main>

      <Footer />
    </div>
  );
}
