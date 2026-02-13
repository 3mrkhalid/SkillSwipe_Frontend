"use client";
import React from "react";
import { useLang } from "./LanguageProvider";

import { FaMicrophone, FaTrophy } from "react-icons/fa";
import {AiOutlineRobot} from "react-icons/ai"
import { useTheme } from "./ThemeContext";
import { RiTeamLine, RiFolderLine, RiErrorWarningLine, } from "react-icons/ri";


function Features() {
  const { t, lang } = useLang();
  const isArabic = lang === "ar";
  const { theme } = useTheme();
  const isDark = theme === "dark";


  const features = [
    {
      icon: <RiTeamLine className="w-8 h-8" />,
      title: t("Features_Collaboration"),
      description: t("Features_Collaboration_description") || "Track your link performance with detailed insights and real-time analytics.",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      delay: "0"
    },
    {
      icon: <RiFolderLine className="w-8 h-8" />,
      title: t("Features_Host") || "Lightning Fast",
      description: t("Features_Host_description") || "Instant URL shortening with sub-second response times and 99.9% uptime.",
      gradient: "from-orange-500 to-pink-500",
      bgColor: "bg-orange-50",
      borderColor: "border-purple-100",
      delay: "100"
    },
    {
      icon: <RiErrorWarningLine className="w-8 h-8" />,
      title: t("Features_Learn_title") || "Fully Customizable",
      description: t("Features_Learn_description") || "Create branded links with custom domains, aliases, and QR codes.",
      gradient: "from-red-500 to-red-400",
      bgColor: "bg-red-50",
      borderColor: "border-orange-100",
      delay: "200"
    },
    {
      icon: <AiOutlineRobot className="w-8 h-8" />,
      title: t("Features_Suggestions"),
      description: t("Features_Suggestions_description"),
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
      delay: "300"
    },
    {
      icon: <FaMicrophone className="w-8 h-8" />,
      title: t("Community_Voice"),
      description: t("Features_Community_Voice"),
      gradient: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-100",
      delay: "400"
    },
    {
      icon: <FaTrophy className="w-8 h-8" />,
      title: t("Weekly_Coding_Challenges"),
      description: t("Weekly_Coding_Challenges_description"),
      gradient: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
      delay: "500"
    }
  ];

  return (
    <section
      className={`relative py-20 overflow-hidden transition-colors
   
    `}
    >


      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isArabic ? "rtl" : "ltr"}`}>
    
          
          <h2 className="text-4xl md:text-5xl font-bold  mb-6">
            <span className={`block ${isDark ? "text-[#e5e5e5]" : "text-gray-900"}`}>
              {t("Features_heading") || "Everything you need"}
            </span>
           
          </h2>
          
                    <p
            className={`text-lg md:text-xl leading-relaxed
              ${isDark ? "text-gray-400" : "text-gray-600"}
            `}
          >

            {t("Features_subheading") || "Powerful features designed to help you create, manage, and track your links effectively."}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 border-2 ${feature.borderColor} 
                hover:border-transparent transition-all duration-500 hover:scale-[1.02] 
                hover:shadow-2xl hover:shadow-blue-500/10`}
              style={{ animationDelay: `${feature.delay}ms` }}
              data-aos="fade-up"
            >
              {/* Gradient Border Effect on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
              
              {/* Icon with Gradient Background */}
              <div className={`relative mb-6 inline-flex p-4 rounded-2xl ${feature.bgColor}`}>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient}`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                
                {/* Floating Badge for Premium Features */}
                
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
               
              </div>

              {/* Hover Effect Dots */}
              <div
                className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse
                  ${isDark ? "bg-blue-500/10" : "bg-blue-100/20"}
                `}
              />

              <div
                className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse
                  ${isDark ? "bg-purple-500/10" : "bg-purple-100/20"}
                `}
              />

            </div>
          ))}
        </div>

        

        
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        [data-aos] {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }
        
        [data-aos].aos-animate {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {/* Animation Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const observerOptions = {
              threshold: 0.1,
              rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('aos-animate');
                }
              });
            }, observerOptions);
            
            document.querySelectorAll('[data-aos]').forEach(el => {
              observer.observe(el);
            });
          });
        `
      }} />
    </section>
  );
}

export default Features;