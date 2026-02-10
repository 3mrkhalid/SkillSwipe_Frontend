"use client";
import React from "react";
import { Facebook, Instagram, Twitter, Github, Dribbble } from "lucide-react";
import { useLang } from "./LanguageProvider";
import { useTheme } from "./ThemeContext";
import Link from "next/link";

function Footer() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <footer className={`${isDark? "bg-[#f8fafc] ": "bg-[#0b0b0f]"}`}>
      <div className="mx-auto max-w-screen-xl px-4  pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-24">
        <div className="text-center">
          <h2 className={`text-3xl font-extrabold sm:text-5xl  ${isDark? "text-black":"text-white"}`}>
            {t("Footer_Heading")}
          </h2>

          <p className={`mx-auto mt-4 max-w-md  ${isDark? "text-gray-700":"text-white"}`}>
            {t("Footer_Description")}
          </p>

          
        </div>

       

        

        <div className={`mt-16 border-t  pt-8 sm:flex sm:items-center sm:justify-between lg:mt-24  ${isDark? "border-gray-300":"border-gray-100"}`}>
          
          <span className={`flex flex-wrap justify-center gap-4 text-lg lg:justify-end ${isDark? "text-gray-600":"text-gray-400 "}`}>
            {t("Footer_copyright")}
          </span>

          <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
            <li>
              <a href="#" className={` hover:opacity-75 ${isDark? "text-neutral-800": "text-neutral-400"}`}>
                <Facebook size={24} />
              </a>
            </li>
            <li>
              <a href="#" className={` hover:opacity-75 ${isDark? "text-neutral-800": "text-neutral-400"}`}>
                <Instagram size={24} />
              </a>
            </li>
            <li>
              <a href="#" className={` hover:opacity-75 ${isDark? "text-neutral-800": "text-neutral-400"}`}>
                <Twitter size={24} />
              </a>
            </li>
            <li>
              <a href="#" className={` hover:opacity-75 ${isDark? "text-neutral-800": "text-neutral-400"}`}>
                <Github size={24} />
              </a>
            </li>
            
          </ul>
        </div>
        <div className="bottom-0 left-0 w-full flex justify-center  mt-5">
        <Link href="/about_us" className="md:hidden sm:flex flex gap-2">
          <h1 className={` ${isDark? "text-neutral-900":"text-neutral-50"} p-5 text-lg`}>{t("About_us")}</h1>
        </Link>
        <Link href="/contact_us" className="md:hidden sm:flex flex gap-2">
          <h1 className={`${isDark? "text-neutral-900":"text-neutral-50"} p-5 text-lg rounded-md`}>{t("ContactUs")}</h1>
        </Link>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
