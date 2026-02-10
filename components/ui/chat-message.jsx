// components/ui/chat-message.jsx
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ChatMessage({ message, showAvatar = true, isGrouped = false }) {
  const isOwn = message.isOwn ?? message.direction === "user-to-admin";
  const time = format(new Date(message.createdAt), "HH:mm");

  return (
    <div
      className={cn(
        "flex gap-3 max-w-[80%]",
        isOwn ? "ml-auto justify-end" : "mr-auto",
        isGrouped ? "mt-0.5" : "mt-4",
      )}
    >
      {/* Avatar - incoming message */}
      {!isOwn && showAvatar && (
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage
            src={message.sender?.avatar}
            alt={message.sender?.name}
          />
          <AvatarFallback>
            {message.sender?.name?.[0]?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col gap-1">
        {/* Sender name - only when not grouped and not own message */}
        {!isOwn && !isGrouped && (
          <span className="text-xs text-muted-foreground pl-2">
            {message.sender?.name}
          </span>
        )}

        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm break-words shadow-sm",
            isOwn
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-muted rounded-bl-none",
          )}
        >
          {message.content}
        </div>

        {/* Time + status indicators */}
        <div
          className={cn(
            "text-xs text-muted-foreground flex items-center gap-1.5 px-2",
            isOwn ? "justify-end" : "justify-start",
          )}
        >
          <span>{time}</span>

          {isOwn && message.status && (
            <span className="text-[10px]">
              {message.status === "read"
                ? "✓✓"
                : message.status === "delivered"
                  ? "✓✓"
                  : "✓"}
            </span>
          )}
        </div>
      </div>

      {/* Avatar - own message */}
      {isOwn && showAvatar && (
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage
            src={message.sender?.avatar}
            alt={message.sender?.name}
          />
          <AvatarFallback>
            {message.sender?.name?.[0]?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
