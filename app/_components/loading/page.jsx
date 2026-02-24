"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/app/_components/ThemeContext";
import { useLang } from "@/app/_components/LanguageProvider";

export default function Loading() {
  const { t } = useLang();
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay helps avoid flash + matches admin page feel
    const timer = setTimeout(() => {
      setMounted(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
   <div>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? "bg-[#0f172a]" : "bg-gray-50"}`}>
        <div className="flex items-center justify-center min-h-screen">
        <img src="/assets/img/dancing-bunny.gif" alt="Loading" className="w-50 h-40" />
      </div>
    </div>
  </div>
  );}