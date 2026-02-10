"use client";
import React from "react";
import Sidebar from "./Sidebar";
import HeaderForDashboard from "./HeaderForDashboard";
import FooterForDashboard from "../_component/FooterForDashboard";


export default function DashboardLayout() {
   // at least only once per mount
  
  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-col flex-1 min-h-screen justify-between">
        {/* Header */}
        <HeaderForDashboard className="h-[50px] border-b border-gray-200" />

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-[67rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-4">
              
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-center text-white mt-auto w-full">
          <FooterForDashboard />
        </footer>
      </div>
    </div>
  );
}
