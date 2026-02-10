"use client";

import "./globals.css";
import { Outfit, Cairo } from "next/font/google";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";

import { LanguageProvider, useLang } from "./_components/LanguageProvider";
import { ThemeProvider } from "./_components/ThemeContext";


const outfit = Outfit({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"], weight: "400" });

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
      <ThemeProvider>
        <LanguageProvider>
          <LangBody>{children}</LangBody>
        </LanguageProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}

function LangBody({ children }) {
  const { lang } = useLang(); // ✅ Now it's inside the provider
  const isArabic = lang === "ar";

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className={`${isArabic ? cairo.className : outfit.className} antialiased`} dir={isArabic ? "rtl" : "ltr"}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: "#363636", color: "#fff" },
          success: { duration: 3000, style: { background: "#10b981", color: "#fff" } },
          error: { duration: 4000, style: { background: "#ef4444", color: "#fff" } },
        }}
      />
    </div>
  );
}

