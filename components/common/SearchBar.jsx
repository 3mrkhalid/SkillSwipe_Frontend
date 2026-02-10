"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

function SearchBar({
  value = "",
  onChange,
  onSearch,
  onClear,
  placeholder = "Search...",
  loading = false,
  className = "",
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch?.();
    }
  };

  return (
    <div className={`flex gap-3 ${className}`}>
      {/* Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

        <Input
          value={value}
          placeholder={placeholder}
          className="pl-10 pr-10"
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={() => onClear?.()}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Search button */}
      <Button
        onClick={onSearch}
        disabled={loading}
        className="flex items-center gap-2"
      >
        <Search size={16} />
        {loading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
}

export default SearchBar;
