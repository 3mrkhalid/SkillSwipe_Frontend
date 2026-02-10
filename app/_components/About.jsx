"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useTheme } from "../_components/ThemeContext";

function About() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const featuresRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [animatedFeatures, setAnimatedFeatures] = useState([false, false, false]);

  const { theme } = useTheme();
  const isDark = theme === "dark";


  // Animate features sequentially
  useEffect(() => {
    if (isInView) {
      const timers = animatedFeatures.map((_, index) => {
        return setTimeout(() => {
          setAnimatedFeatures(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 300); // Stagger by 300ms
      });

      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isInView]);

  // Fade-in animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: (index) => ({ 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        delay: index * 0.2,
        ease: [0.215, 0.610, 0.355, 1],
        scale: {
          type: "spring",
          damping: 10,
          stiffness: 100
        }
      }
    })
  };

  const iconVariants = {
    hidden: { rotate: -180, scale: 0 },
    visible: (delay) => ({ 
      rotate: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: delay * 0.3 + 0.2
      }
    })
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { 
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative py-20 overflow-hidden"
    >
      <div className="mt-20 px-4">
        {/* Title */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <h1
            className={`
              text-2xl md:text-4xl font-semibold text-center
              ${isDark ? "text-white" : "text-neutral-900"}
            `}
          >
            {t("About_Headline")}
          </h1>

          <motion.p
            variants={fadeIn}
            className={`
              mt-4 max-w-md mx-auto text-center text-sm md:text-base leading-relaxed
              ${isDark ? "text-gray-400" : "text-neutral-700"}
            `}
          >
            {t("About_SubTitle")}
          </motion.p>
        </motion.div>

        {/* Features Section */}
        <section className="py-16 mt-2 mb-10" ref={featuresRef}>
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col md:flex-row justify-center items-center gap-10">
              {/* Animated line between cards (only desktop) */}
              <motion.div 
                className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-cyan-400 z-0 origin-left"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={lineVariants}
              />

              {/* Single Feature */}
              <motion.div 
                custom={0}
                variants={cardVariants}
                initial="hidden"
                animate={animatedFeatures[0] ? "visible" : "hidden"}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative bg-white p-6 rounded-lg shadow-md text-center max-w-sm z-10 w-full sm:w-[90%] hover:shadow-xl transition-shadow duration-300 "
              >
                <div className="flex justify-center mb-2">
                  <div 
                    className="p-4 bg-orange-100 rounded-full"
                  >
                    <img
                      src="/assets/img/winner.png"
                      alt="Brand Recognition"
                      className="w-10 h-10"
                    />
                  </div>
                </div>
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="font-bold text-neutral-800 mb-3 text-lg"
                >
                  {t("About_Security")}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-neutral-600 text-sm leading-relaxed"
                >
                  {t("About_Security_sub")}
                </motion.p>
              </motion.div>

              {/* Second Feature */}
              <motion.div 
                custom={1}
                variants={cardVariants}
                initial="hidden"
                animate={animatedFeatures[1] ? "visible" : "hidden"}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative bg-white p-6 rounded-lg shadow-md text-center max-w-sm z-10 w-full sm:w-[90%] md:mt-10 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4 ">
                 <div 
                    className="p-4 bg-blue-100 rounded-full"
                  >
                    <img
                      src="/assets/img/performance.png"
                      alt="Detailed Records"
                      className="w-10 h-10 "
                    />
                  </div>
                </div>
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="font-bold text-neutral-800 mb-3 text-lg"
                >
                  {t("About_Performance")}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-neutral-600 text-sm leading-relaxed"
                >
                  {t("About_Performance_sub")}
                </motion.p>
              </motion.div>

              {/* Third Feature */}
              <motion.div 
                custom={2}
                variants={cardVariants}
                initial="hidden"
                animate={animatedFeatures[2] ? "visible" : "hidden"}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative bg-white p-6 rounded-lg shadow-md text-center max-w-sm z-10 w-full sm:w-[90%] md:mt-20 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-2">
                  <div 
                    className="p-4 bg-green-100 rounded-full"
                  >
                    <img
                      src="/assets/img/personalization.png"
                      alt="Fully Customizable"
                      className="w-12 h-12"
                    />
                  </div>
                </div>
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="font-bold text-neutral-800 mb-3 text-lg"
                >
                  {t("About_Ability")}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-neutral-600 text-sm leading-relaxed"
                >
                  {t("About_Ability_sub")}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </motion.section>
  );
}

export default About;