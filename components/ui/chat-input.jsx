// components/ui/chat-input.jsx
"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, SendHorizontal, Smile } from "lucide-react";

export function ChatInput({
  onSend,
  onTyping,
  disabled = false,
  placeholder = "Type a message...",
}) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
    if (onTyping) onTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    // Typing indicator
    if (onTyping) {
      onTyping(!!e.target.value.trim());
    }
  };

  return (
    <div className="border-t bg-background p-3">
      <div className="relative flex items-end gap-2 max-w-4xl mx-auto">
        {/* Left buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 shrink-0"
          disabled={disabled}
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        {/* Main input area */}
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              "min-h-[44px] max-h-[140px] resize-none py-3 pr-12",
              "rounded-full border-input bg-background",
              "focus-visible:ring-primary",
            )}
          />

          {/* Send / emoji button inside input */}
          {value.trim() ? (
            <Button
              size="icon"
              className="absolute right-2 bottom-2 h-8 w-8 rounded-full"
              onClick={handleSend}
              disabled={disabled}
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 bottom-2 h-8 w-8"
              disabled={disabled}
            >
              <Smile className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-1">
        Press Enter to send • Shift + Enter for new line
      </p>
    </div>
  );
}
