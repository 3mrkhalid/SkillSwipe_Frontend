"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import LangSwitcher from "@/app/_components/LangSwitcher";

import { useLang } from "@/app/_components/LanguageProvider";

import { useTheme } from "@/app/_components/ThemeContext";

import { Sun, Moon } from "lucide-react";

import { logout } from "@/app/api/auth";

import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";




function HeaderForDashboard() {

   const router = useRouter();
  const { t, lang } = useLang();
  const isArabic = lang === "ar";
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();

      router.replace("/login");

    } catch (err) {
      console.log("error:", err);
    }
  };

  const menu = [
    { id: 1, name: t("Home"), link: "/" },
    { id: 2, name: t("About_us"), link: "/about_us" },
    { id: 3, name: t("ContactUs") , link: "/contact" },
  ];


  return (
      <header className={`flex h-17 text-md  items-center justify-between bg-white  border-b border-gray-500  px-4 md:px-8  py-2 w-full mx-auto `}>

      {/* Logo + Menu */}
      <div className="flex items-center gap-8">
        
        {/* Menu */}
        <ul className="hidden md:flex gap-8 font-medium text-gray-700">
          {menu.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                className="hover:text-blue-500 hover:scale-105 transition-all"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <div className={`flex ${isArabic ? "gap-1" : "gap-3"}`}>
      <LangSwitcher />
      <button
        onClick={toggleTheme}
        className={`px-1 py-1  transition
          ${isArabic? "mr-2": "mr-0"}
        `}
      >
        {theme === "light" ? <Moon className="text-zinc-700 text-lg cursor-pointer"/> : <Sun className="text-orange-400 text-lg cursor-pointer"/>}
      </button>
      
        
         <Popover >
          <PopoverTrigger >
            <img
              src="/assets/img/user.png"
              alt="user_icon"
              className="w-10 h-10 rounded-full mr-5 cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent className="mt-2 w-35 mr-1 bg-white">
            <div className="flex flex-col text-gray-700 text-md gap-3">
              <Link
                href="/dashboard/profile"
                className="py-1 px-2 flex items-center hover:bg-neutral-100 hover:rounded-lg transition duration-200 ease-in"
              >
               
                <img
                  src="/assets/img/profile-icon.png"
                  alt="profile"
                  width={30}
                  height={30}
                  className="mr-2"
                />
                {t("Profile")}
              </Link>
              <Link
                href="#"
                className="py-1 px-2 flex items-center hover:bg-neutral-100 hover:rounded-lg transition duration-200 ease-in"
              >
                <img
                  src="/assets/img/setting-icon.png"
                  alt="setting"
                  width={30}
                  height={30}
                />
                {t("Dashboard_Settings")}
              </Link>
              <button
               onClick={handleLogout}
                className="py-1 px-2 flex items-center cursor-pointer hover:bg-neutral-100 hover:rounded-lg transition duration-200 ease-in"
              >
                <img
                  src="/assets/img/logout-icon.png"
                  alt="logout"
                  width={30}
                  height={30}
                  className="mr-1"
                />
                {t("logout")}
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
     
    </header>
  );
}

export default HeaderForDashboard;
