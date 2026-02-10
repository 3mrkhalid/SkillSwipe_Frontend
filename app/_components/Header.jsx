"use client"
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LangSwitcher from "./LangSwitcher";

import { useLang } from "./LanguageProvider";

import { useTheme } from "../_components/ThemeContext";

import { Sun, Moon } from "lucide-react";




function Header() {

  const { t, lang } = useLang();
  const isArabic = lang === "ar";
  const { theme, toggleTheme } = useTheme();



  const menu = [
    { id: 1, name: t("Home"), link: "/" },
    { id: 2, name: t("About_us"), link: "/about_us" },
    { id: 3, name: t("ContactUs") , link: "/contact" },
  ];


  return (
      <header className={`flex h-20 text-lg  items-center justify-between bg-white  backdrop-blur-md shadow-md rounded-b-lg px-4 md:px-8  py-2 w-[90%] mx-auto `}>

      {/* Logo + Menu */}
      <div className="flex items-center gap-8">
        <Link href="/">
         

          {/* Desktop logo */}
          <img
            src="/assets/img/logo.png"
            alt="Logo"
            className=" w-[70px]"
          />
      </Link>


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
      
        
        <Link href="/login">
          <Button className="mr-2 font-semibold cursor-pointer text-white">{t("GetStarted")}</Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
