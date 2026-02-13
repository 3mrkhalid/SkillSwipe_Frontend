import React from "react";
import { useLang } from "@/app/_components/LanguageProvider";
import Image from "next/image";

const FooterForDashboard = () => {
  const { t } = useLang();

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      <div className="mx-auto max-w-screen-xl px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
           
            <span className="text-white font-bold text-lg">Skill Swipe</span>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            {t("Footer_copyright")}
          </p>

        </div>
      </div>
    </footer>
  );
};

export default FooterForDashboard;