"use client";
import React from "react";
import { useLang } from "./LanguageProvider";
import { useTheme } from "../_components/ThemeContext";


function Hero({ className = "" }) {
  const { t, lang } = useLang();
  const isArabic = lang === "ar";
  const {theme} = useTheme();

  // For cleaner RTL/LTR switching
  const direction = isArabic ? "rtl" : "ltr";
  const textAlign = isArabic ? "text-right" : "text-left";
  const itemsAlign = isArabic ? "items-end" : "items-start";
  const justifyAlign = isArabic ? "justify-end" : "justify-start";

  return (
    <section
      dir={direction}
      className={`
        relative overflow-hidden py-12 sm:py-20 lg:py-28
        flex items-center justify-around min-h-screen
        transition-colors duration-300
       
      `}
    >

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-2 lg:items-center">
          {/* TEXT COLUMN */}
          <div
            className={`flex justify-center items-center flex-col `}
          >
            {/* Heading */}
            <h1
              className={`
                font-bold tracking-tight
                 text-4xl sm:text-5xl md:text-3xl  xl:text-7xl 
              `}
            >
             <span
                className={`bg-clip-text text-transparent transition-colors duration-500
                ${
                  theme === "dark" 
                    ? "bg-gradient-to-r from-purple-400 via-pink-500 to-red-400" 
                    : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                }

                  
                `}
              >
                {t("hero")}
              </span>

              </h1>

            {/* Description */}
           <p
              className={`
                mt-6 text-sm md:text-lg lg:text-xl leading-relaxed
                max-w-[3200px] sm:max-w-[450px] lg:max-w-[580px]
                transition-colors
                ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
              `}
            >
              {t("description_Hero")}
            </p>

            {/* Mobile Image – centered */}
          </div>
            <div className="mt-10 lg:hidden flex justify-center w-full">
              <img
                src="/assets/img/hero.png"
                className="rounded-2xl w-full max-w-[380px] shadow-2xl object-cover"
                alt="ShortLink Mobile Preview"
                loading="lazy"
              />
            </div>

          {/* IMAGE COLUMN – desktop only */}
          <div
            className={`hidden lg:flex lg:items-center lg:justify-center relative ${
              isArabic ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div className="relative">
              {/* Decorative blobs */}
              <div className={`absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl rotate-12 animate-blob ${
                theme === "dark"
                  ? "bg-white/70"
                  : "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
              }`}></div>
              <div className={`absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-3xl -rotate-12 animate-blob animation-delay-4000 ${
                theme === "dark"
                  ? "bg-white/70"
                  : "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
              }`}></div>

              {/* Image frame */}
              <div
                    className={`
                      relative rounded-3xl overflow-hidden shadow-2xl
                      border-[12px]
                      ${
                        theme === "dark"
                          ? "border-white/10 bg-gradient-to-br from-[#111827] via-[#1f2933] to-[#0f172a]"
                          : "border-white/90 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
                      }
                      p-6 sm:p-8 md:p-10
                    `}
                  >

                <img
                  src="/assets/img/hero.png"
                  className={`
                    rounded-2xl w-full max-w-[420px] lg:max-w-[460px] xl:max-w-[520px]
                    object-cover shadow-lg
                    transform hover:scale-[1.03] transition-transform duration-500
                  `}
                  alt="ShortLink Dashboard Preview"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -40px) scale(1.15); }
          66% { transform: translate(-30px, 50px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }

        .animate-blob {
          animation: blob 12s infinite ease-in-out;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}

export default Hero;