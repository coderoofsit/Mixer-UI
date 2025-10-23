import React, { useState } from "react";
import Button from "../ui/Button";

const ChatInput = ({ onSendMessage, placeholder = "Type a message..." }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end space-x-2 p-4 bg-white border-t border-gray-200"
    >
      <div className="flex-1">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          rows={1}
          style={{ minHeight: "40px", maxHeight: "120px" }}
        />
      </div>
      <Button type="submit" disabled={!message.trim()} size="sm">
        Send
      </Button>
    </form>
  );
};

export default ChatInput;
