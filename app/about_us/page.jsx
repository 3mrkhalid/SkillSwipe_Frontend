'use client';

import React from 'react';
import Header from '../_components/Header';
import Footer from '../_components/Footer';
import { useLang } from '../_components/LanguageProvider';
import { useTheme } from '../_components/ThemeContext';

export default function AboutPage() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const teamMembers = [
  {
    id: 1,
    name: 'Amr Khalid',
    role: t("AmrKhalid"),
    description: t("AmrKhalid_des"),
    skills: ['Next.js', 'Node.js', 'API Integration', 'Cloud Architecture', 'System Design'],
    image: '/assets/img/amr.png', // ← هنا الصورة
  },
  {
    id: 2,
    name: 'Mostafa Ali',
    role: t("Mostafa_Ali"),
    description: t("Mostafa_Ali_des"),
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'UI/UX Design'],
    image: '/assets/img/SDMX44.jpg',
  },
  {
    id: 3,
    name: 'Ziad Yasser',
    role: t("Ziad_Yasser"),
    description: t("Ziad_Yasser_des"),
    skills: ['Node.js', 'Express', 'Databases', 'API Development', 'System Architecture'],
    image: '/assets/img/z3atar.jpg',
  },
];


  return (
    <div className={`${isDark ? "bg-[#0f172a] " : "bg-gray-50 "}`}>
      <Header className={`h-18 text-black`}/>
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#0f172a] text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Team Section */}
      <section id="team" className="py-70 px-4">
        <img src="/assets/img/logo-kernel.png" className='mx-auto w-30 h-30'/>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? "from-cyan-400 to-purple-400" : "from-blue-600 to-indigo-600"}`}>
              Kernel
            </span> Syndicators
          </h2>

          <p className={`text-center mb-14 max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {t("About_us_sub")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className={`relative rounded-2xl p-6 transition-all duration-300 overflow-hidden
                  ${isDark ? "bg-[#1f2937] shadow-lg hover:shadow-2xl" : "bg-white shadow-md hover:shadow-xl"}
                `}
              >
                {/* Decorative glow for dark mode */}
                {isDark && (
                  <>
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                  </>
                )}

                {/* Avatar */}
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-100 ">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                <p className={`text-center font-medium mb-4 ${isDark ? "text-cyan-300" : "text-blue-600"}`}>{member.role}</p>

                <p className={`text-sm text-center mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{member.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-2">
                  {member.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-xs rounded-full border font-medium
                        ${isDark ? "bg-[#111827] text-white/80 border-white/10" : "bg-blue-50 text-blue-700 border-blue-100"}
                      `}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </section>
      </div>

      <Footer />
    </div>
  );
}
