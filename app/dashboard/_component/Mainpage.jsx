"use client"
import React, { useState, useEffect } from 'react'
import { me } from '@/app/api/user'
import { useLang } from "@/app/_components/LanguageProvider"
import { useTheme } from "@/app/_components/ThemeContext"
import { 
  FiUser, 
  FiCalendar, 
  FiMail, 
  FiActivity, 
  FiSettings,
  FiBookmark,
  FiStar,
  FiBell
} from 'react-icons/fi'

function Mainpage() {
  const { t } = useLang();
  const [user, setUser] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await me();
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  // Sample data for sheets
  const recentActivities = [
    { id: 1, action: "Logged in", time: "2 min ago", icon: FiActivity },
    { id: 2, action: "Updated profile", time: "1 hour ago", icon: FiUser },
    { id: 3, action: "New message", time: "3 hours ago", icon: FiMail },
  ];

  const stats = [
    { label: "Projects", value: "12", change: "+2", icon: FiBookmark },
    { label: "Tasks", value: "48", change: "+8", icon: FiStar },
    { label: "Notifications", value: "3", change: "new", icon: FiBell },
  ];

  return (
    <div className="p-6 sm:p-4 xs:p-3">
      {/* Welcome Header with Glass Effect */}
      <div className={`mb-8 rounded-2xl p-6
        `}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className={`bg-clip-text text-transparent transition-colors duration-500
                ${theme === "dark" 
                  ? "bg-gradient-to-r from-purple-400 via-pink-500 to-red-400" 
                  : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                }`}
              >
                {t("Welcome")}
              </span>
              <span className={`ml-3 text-gray-800 dark:text-gray-200 ${theme === "dark"? "text-white": "text-zinc-900"}`}>
                {user.user?.username}
              </span>
            </h1>
            <p className={` md:text-lg text-md mt-2 ${theme === "dark"? "text-gray-300":"text-zinc-900"}`}>
              {t("Welcome_sub")}
            </p>
          </div>
          
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 transform hover:scale-105 transition-all duration-300 cursor-pointer
              ${theme === "dark" 
                ? "bg-gray-800 border border-gray-700 hover:border-purple-500 text-gray-300" 
                : "bg-white border border-gray-200 hover:border-indigo-500 shadow-md text-zinc-900"
              }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">{stat.label}</p>
                <p className={`text-3xl font-bold mt-2 ${theme === "dark"? "text-gray-300":"text-zinc-900"}`}>
                  {stat.value}
                </p>
                <p className={`text-sm mt-2 ${
                  stat.change.includes('+') ? 'text-green-500' : 'text-purple-500'
                }`}>
                  {stat.change}
                </p>
              </div>
              <stat.icon className={`w-6 h-6 opacity-70 
                ${theme === "dark" ? "text-gray-100" : "text-indigo-500"}`} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Info Sheet */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`rounded-xl p-6 transition-all duration-300
            ${theme === "dark" 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-gray-200 shadow-md"
            }`}
          >
            <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme === "dark"? "text-gray-300":"text-zinc-900"}`}>
              <FiUser className="w-5 h-5" />
              Profile Information
            </h2>
            
            <div className="space-y-4">
              <div className={`flex items-center gap-3 p-3 rounded-lg  ${theme === "dark"? "hover:bg-gray-700 ":"hover:bg-gray-50"}  transition-color`}>
                <div>
                  <div className='flex gap-1'>
                  <FiMail className={`w-5 h-5 ${theme === "dark"? "text-gray-300":"text-gray-500"}`} />
                    <p className={`text-sm ${theme === "dark"? "text-gray-300":"text-gray-500"}`}>Email</p>
                  </div>
                  <p className={`${theme === "dark"? "text-white":"text-zinc-900"}`}>{user.user?.email}</p>
                </div>
              </div>
              
              <div className={`flex items-center gap-3 p-3 rounded-lg  ${theme === "dark"? "hover:bg-gray-700 ":"hover:bg-gray-50"} transition-colors`}>
                <div>
                <p className={`flex gap-1 ${theme === "dark"? "text-gray-300":"text-zinc-900"}`}>
                <FiCalendar className={`w-5 h-5 ${theme === "dark"? "text-gray-300":"text-gray-500"}`} />
                  Member Since
                </p>

                  <p className={`${theme === "dark"? "text-white":"text-zinc-900"}`}>{user.user?.createdAt 
                    ? new Date(user.user.createdAt).toLocaleDateString() 
                    : "Not available"}</p>
                </div>
              </div>
              
              <button className={`w-full mt-4 py-2 px-4 rounded-lg transition-colors
                ${theme === "dark" 
                  ? "bg-purple-600 hover:bg-purple-700 text-white" 
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Activity and Sheets */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity Sheet */}
          <div className={`rounded-xl p-6 transition-all duration-300
            ${theme === "dark" 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-gray-200 shadow-md"
            }`}
          >
            <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${theme === "dark"? "text-gray-200":"text-gray-800"}`}>
              <FiActivity className="w-5 h-5" />
              Recent Activity
            </h2>
            
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${theme === "dark"? "hover:bg-gray-700 ":"hover:bg-gray-50"}  transition-colors`}
                >
                  <div className="flex items-center gap-3">
                    <activity.icon className={`w-5 h-5 
                      ${theme === "dark" ? "text-purple-400" : "text-indigo-500"}`} 
                    />
                    <span className={`${theme === "dark"? "text-gray-200":"text-gray-800"}`}>{activity.action}</span>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Sheet */}
          <div className={`rounded-xl p-6 transition-all duration-300
            ${theme === "dark" 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-white border border-gray-200 shadow-md"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <FiSettings className="w-5 h-5" />
              Quick Actions
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              {['Solve Sheets', 'Add Sheet', 'Invite Team', 'Settings'].map((action, index) => (
                <button
                  key={index}
                  className={`p-3 rounded-lg text-center transition-all hover:scale-105 cursor-pointer
                    ${theme === "dark" 
                      ? "bg-gray-700 hover:bg-purple-600 text-gray-200" 
                      : "bg-gray-100 hover:bg-indigo-500 hover:text-white text-gray-800"
                    }`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet - Additional Info */}
      <div className={`mt-6 rounded-xl p-6 transition-all duration-300
        ${theme === "dark" 
          ? "bg-gray-800/50 border border-gray-700" 
          : "bg-white/80 border border-gray-200 shadow-md backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full animate-pulse 
              ${theme === "dark" ? "bg-purple-500" : "bg-indigo-500"}`} 
            />
            <span className={`${theme === "dark"? "text-gray-200":"text-gray-800"}`}>System Status: Online</span>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              Stable
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              v2.0.1
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mainpage