"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/app/_component/LanguageProvider";

const Breadcrumb = () => {
  const { lang, t } = useLang(); 
  const isArabic = lang === "ar";

  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  // Format URL part to readable text
  const formatLabel = (text) => {
    
    const translations = {
      dashboard: t("Dashboard_Home"),
      manage_link: t("Manage_Links"),
      withdraw: t("Withdraw"),
      profile: t("Profile_Settings"),
      "support-chat": t("Support_Chat"),
      settings: t("Settings"),
    };
    return translations[text] || text.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div
      className={`bg-slate-800 text-white p-4 rounded-sm mt-5 mx-3`}
      dir={isArabic ? "rtl" : "ltr"} 
    >
      <nav>
        <ol className={`flex ${isArabic ? "flex-row space-x-reverse space-x-2" : "space-x-2"}`}>
          {pathnames.map((value, index) => {
            const href = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;

            return (
              <li key={href} className="flex items-center">
                {index > 0 && <span className="text-gray-300">{isArabic ? "/" : "/"}</span>}

                {isLast ? (
                  <span className="text-gray-300 ml-1">{formatLabel(value)}</span>
                ) : (
                  <Link href={href} className="text-white hover:underline ml-1">
                    {formatLabel(value)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
