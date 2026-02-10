"use client";

import { useEffect, useState } from "react";
import Header from "@/app/_components/Header";
import Hero from "@/app/_components/Hero";
import Features from "@/app/_components/Features";
import About from "@/app/_components/About";
import Footer from "@/app/_components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import HowItWorks from "./_components/HowItWorks";
import { useTheme } from "./_components/ThemeContext";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const {theme} = useTheme();

  useEffect(() => {
    setMounted(true);
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  if (!mounted) return null; // Don't render until client

  return (
    <div className={`${theme === "light" ? " " : "bg-[#0f172a]"}`}>
      <div data-aos="fade-down">
        <Header className="md:px-20 h-18" />
      </div>

      <div data-aos="fade-up" >
        <Hero className="md:px-20" />
      </div>

      <div data-aos="fade-up">
        <Features className="md:px-20" />
      </div>

      <div data-aos="fade-up">
        <About className="md:px-20" />
      </div>

      <div data-aos="fade-up">
        <HowItWorks className="md:px-20" />
      </div>

      <Footer />
    </div>
  );
}
