"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  RiDashboardLine,
  RiWalletLine,
  RiUser3Line,
  RiSettings3Line,
  RiLinksLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from "react-icons/ri";
import { FaMedal, FaUsers } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { MessageSquare } from "lucide-react";
import { useLang } from "@/app/_components/LanguageProvider";

const Sidebar = () => {
  const {t , lang } = useLang();
  const isArabic = lang === "ar";

  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    if (window.innerWidth < 768) setCollapsed(true);
  }, []);

  const toggleSubmenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuItems = [
    { name: t("Dashboard_Home"), icon: <RiDashboardLine />, href: "/dashboard" },
    { name: t("Dashboard_Manage_Links"), icon: <RiLinksLine />, href: "/dashboard/manage_link" },
    { name: t("Dashboard_Withdraw"), icon: <RiWalletLine />, href: "/dashboard/withdraw" },
    { name: t("Dashboard_Referrals"), icon: <FaUsers />, href: "#" },
    { name: t("Dashboard_Competition"), icon: <FaMedal />, href: "#" },
    { name: t("Dashboard_Profile"), icon: <RiUser3Line />, href: "/dashboard/profile" },
    { name: t("Dashboard_Support"), icon: <MessageSquare size={18} />, href: "/dashboard/support-chat", hardReload: true },
    { name: t("Dashboard_Settings"), icon: <RiSettings3Line />, href: "#" },
  ];

  return (
    <div
      className={`transition-all duration-300 shadow-sm min-h-screen
        ${collapsed ? "w-[80px]" : "w-[250px]"}
        ${isArabic ? "rtl" : "ltr"}`}
    >
      {/* Header */}
      <div className="flex items-center p-4  bg-zinc-900">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 text-white cursor-pointer"
        >
          <HiMenuAlt2 size={20} />
        </button>
        {!collapsed && (
          <Link href="/dashboard">
            <span className={`text-xl font-bold text-white ml-2 ${isArabic ? "ml-0 mr-2" : ""}`}>
              SkillSwipe
            </span>
          </Link>
        )}
      </div>

      {/* Menu */}
      <nav className="flex flex-col mt-4">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.submenu ? (
              <>
                <div
                  onClick={() => toggleSubmenu(item.name)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-blue-50 hover:text-blue-600
                    ${collapsed ? "justify-center" : ""}`}
                >
                  {item.icon}
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {openMenu === item.name ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                    </>
                  )}
                </div>

                {!collapsed && openMenu === item.name && (
                  <div className={`ml-8 space-y-1 ${isArabic ? "ml-0 mr-8" : ""}`}>
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block text-sm hover:text-blue-500"
                      >
                        • {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : item.hardReload ? (
              <a
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-blue-50
                  ${collapsed ? "justify-center" : ""}`}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </a>
            ) : (
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 hover:bg-blue-50
                  ${collapsed ? "justify-center" : ""}`}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
