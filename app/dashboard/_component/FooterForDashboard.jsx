import React from "react";
import { useLang } from "@/app/_components/LanguageProvider";

const FooterForDashboard = () => {
  const { t } = useLang();
  return (
    <footer className="bg-zinc-900  h-20 p-5  items-center w-full">
      <div className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <div className="flex justify-center sm:justify-start items-center">
           
            <h1 className="ml-2 text-2xl text-white font-bold">
              Skill <span className="text-blue-300">Swipe</span>
            </h1>
          </div>

          <p className="mt-3 sm:mt-0 text-lg text-gray-300">
            {t("Footer_copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterForDashboard;