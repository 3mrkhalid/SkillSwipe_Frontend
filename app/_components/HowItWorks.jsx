"use client";
import React, { useEffect, useState, useRef } from "react";
import { useLang } from "./LanguageProvider";
import { FiFileText, FiVideo, FiHelpCircle, FiCpu,  } from "react-icons/fi";
import { BoltIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTheme } from "../_components/ThemeContext";

import { 
  HiOutlineAcademicCap,
  HiOutlineUsers,
  HiOutlineLightBulb,
  HiOutlineArrowTrendingUp,
  HiOutlineChatBubbleLeftRight,
  HiOutlineStar
} from "react-icons/hi2";




function HowItWorks() {
  const { t } = useLang();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";


 const steps = [
  {
    number: "1",
    title: t("step1_title"),
    description: t("step1_description"),
    iconColor: "text-blue-500",
    icons: [
      <HiOutlineAcademicCap className="text-3xl text-blue-500" />,
      <HiOutlineLightBulb className="text-3xl text-cyan-500" />,
    ],
  },
  {
    number: "2",
    title: t("step2_title"),
    description: t("step2_description"),
    iconColor: "text-purple-500",
    icons: [
      <HiOutlineUsers className="text-3xl text-purple-500" />,
      <HiOutlineChatBubbleLeftRight className="text-3xl text-indigo-500" />,
    ],
  },
  {
    number: "3",
    title: t("step3_title"),
    description: t("step3_description"),
    iconColor: "text-emerald-500",
    icons: [
      <HiOutlineArrowTrendingUp className="text-3xl text-emerald-500" />,
      <HiOutlineStar className="text-3xl text-yellow-400" />,
    ],
  },
];


  // Auto-rotate steps
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible, steps.length]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 md:px-8 "
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
         <h2
          className={`
            text-3xl md:text-4xl lg:text-5xl font-bold mb-4
            ${isDark ? "text-white" : "text-gray-900"}
          `}
        >

            {t("how_it_works_title")}
          </h2>
           <p
            className={`
              text-lg max-w-2xl mx-auto
              ${isDark ? "text-gray-400" : "text-gray-600"}
            `}
          >

            {t("how_it_works_subtitle") || "Transform any content into engaging learning experiences in minutes"}
          </p>
        </div>

        {/* Steps Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div 
            className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-emerald-200 rounded-full z-0 transition-all duration-1000"
            style={{ opacity: isVisible ? 1 : 0 }}
          />
          
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative z-10 w-full max-w-sm"
              onMouseEnter={() => setActiveStep(index)}
            >
              {/* Step Card */}
              <div 
                className={`
                  relative p-6 rounded-2xl shadow-lg border-2 transition-all duration-500
                  bg-white
                  border-none
                  ${activeStep === index 
                    ? 'scale-105 shadow-xl -translate-y-2' 
                    : 'scale-100 hover:scale-[1.02] hover:-translate-y-1'
                  }
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Step Number */}
                <div 
                  className={`
                    absolute -top-5 left-5 -translate-x-1/2 w-12 h-12 rounded-full
                    flex items-center justify-center text-white font-bold text-lg
                    transition-all duration-500
                    ${activeStep === index 
                      ? 'bg-blue-600' 
                      : 'bg-gray-700'
                    }
                  `}
                >
                  {step.number}
                </div>

                {/* Icons */}
                <div className="flex justify-center space-x-3 mb-6">
                  {step.icons.map((icon, idx) => (
                    <div 
                      key={idx}
                      className={`
                        w-14 h-14 rounded-full shadow-md flex items-center justify-center text-2xl
                        transition-all duration-500
                        ${activeStep === index ? 'scale-110' : ''}
                      `}
                      style={{
                        transform: activeStep === index 
                          ? `rotate(${idx % 2 === 0 ? -5 : 5}deg) scale(1.1)` 
                          : 'none'
                      }}
                    >
                      {icon}
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="mt-6 flex justify-center">
                  <div className="h-1 w-12 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        step.iconColor === 'text-blue-600' ? 'bg-blue-600' :
                        step.iconColor === 'text-purple-600' ? 'bg-purple-600' :
                        'bg-emerald-600'
                      }`}
                      style={{
                        width: activeStep === index ? '100%' : '0%'
                      }}
                    />
                  </div>
                </div>
              </div>

              
             
            </div>
          ))}
        </div>

      

        {/* CTA Button */}
        <div 
          className={`text-center mt-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
        <Link href="/login">
          <button 
            className={`
              group px-8 py-4 rounded-xl font-semibold text-lg 
              bg-gradient-to-r from-blue-600 to-purple-600 text-white
              shadow-lg hover:shadow-xl transform hover:-translate-y-1
              transition-all duration-300 flex items-center gap-3 mx-auto
              cursor-pointer
            `}
          >
            {t("GetStarted")}
           
          </button>
          </Link>
          
           <p
              className={`
                mt-5  ${isDark ? "text-gray-400" : "text-gray-600"}
              `}
            >

            {t("free_trial_text") }
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;