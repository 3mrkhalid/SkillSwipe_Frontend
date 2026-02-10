"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination Component
 * Props:
 * - currentPage: الرقم الحالي للصفحة (from API)
 * - totalPages: إجمالي عدد الصفحات (from API)
 * - onPageChange: دالة لتغيير الصفحة
 * - siblingCount: عدد الصفحات اللي تظهر قبل وبعد الصفحة الحالية
 */
function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  siblingCount = 1,
}) {
  if (totalPages <= 1) return null; // لو في صفحة واحدة فقط → ما نعرضش pagination

  // إنشاء مصفوفة الصفحات مع ...
  const createPageArray = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - siblingCount);
    const endPage = Math.min(totalPages, currentPage + siblingCount);

    // الصفحة الأولى
    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push("...");

    // الصفحات حول الصفحة الحالية
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // الصفحة الأخيرة
    if (endPage < totalPages - 1) pages.push("...");
    if (endPage < totalPages) pages.push(totalPages);

    return pages;
  };

  const pages = createPageArray();

  const handleClick = (page) => {
    if (page === "..." || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
      {/* Previous Button */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
      </Button>

      {/* Page Numbers */}
      {pages.map((page, idx) => (
        <Button
          key={idx}
          size="sm"
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => handleClick(page)}
        >
          {page}
        </Button>
      ))}

      {/* Next Button */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}

export default Pagination;
