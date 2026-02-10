import React from "react";

export function Badge({ className = "", children, ...props }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold " +
        "bg-gray-100 text-gray-700 " +
        className
      }
      {...props}
    >
      {children}
    </span>
  );
}
