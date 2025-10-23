import React from "react";

const MessageBubble = ({ message, isOwn = false, timestamp, senderName }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwn
            ? "bg-primary-600 text-white rounded-br-sm"
            : "bg-gray-200 text-gray-900 rounded-bl-sm"
        }`}
      >
        {!isOwn && senderName && (
          <p className="text-xs font-medium text-gray-600 mb-1">{senderName}</p>
        )}
        <p className="text-sm">{message}</p>
        {timestamp && (
          <p
            className={`text-xs mt-1 ${
              isOwn ? "text-primary-100" : "text-gray-500"
            }`}
          >
            {formatTime(timestamp)}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
