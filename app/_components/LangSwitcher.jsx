"use client";

import { Menu } from "@headlessui/react";
import { useLang } from "./LanguageProvider";
import { useEffect, useState } from "react";

export default function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const languages = [
    { code: "en", label: "English", icon: "/assets/img/us.png" },
    { code: "ar", label: "العربية", icon: "/assets/img/egypt.png" },
  ];

  return (
    <Menu as="div" className="relative inline-block text-lef text-black">
      <Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition text-sm font-medium">
        <img
          src={lang === "en" ? "/assets/img/us.png" : "/assets/img/egypt.png"}
          alt="flag"
          className="w-5 h-5 rounded-sm"
        />
        <span className="uppercase">{lang}</span>
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 min-w-[8rem] rounded-lg border border-gray-200 bg-white shadow-lg z-50">
        {languages.map((l) => (
          <Menu.Item key={l.code}>
            {({ active }) => (
              <button
                onClick={() => setLang(l.code)}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded transition-colors w-full ${
                  active ? "bg-gray-100" : ""
                } ${lang === l.code ? "font-semibold bg-gray-100" : ""}`}
              >
                <img src={l.icon} alt={l.label} className="w-5 h-5 rounded-sm" />
                {l.label}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
