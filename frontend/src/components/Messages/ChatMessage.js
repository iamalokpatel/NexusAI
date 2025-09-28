import React from "react";
import MessageRenderer from "./MessageRenderer";

const getRoleLabel = (role) => {
  switch (role) {
    case "user":
      return "You";
    case "cohere":
      return "Cohere";
    case "database":
      return "Memory";
    case "error":
      return "Error";
    default:
      return "AI";
  }
};

const ChatMessage = ({ role, content }) => (
  <div
    className={`p-3 rounded whitespace-pre-wrap ${
      role === "user" ? "text-right" : "text-left"
    }`}
  >
    <strong>{getRoleLabel(role)}:</strong>
    <div>
      <MessageRenderer content={content} />
    </div>
  </div>
);

export default ChatMessage;
