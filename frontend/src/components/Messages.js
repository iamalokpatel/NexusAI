import React, { useState, useRef, useEffect } from "react";
import api from "../utils/api";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const messagesEndRef = useRef(null);

  // 🔍 Render message with code highlighting
  const renderMessageContent = (content) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/gm;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      const beforeCode = content.slice(lastIndex, match.index);
      const language = match[1] || "javascript";
      const code = match[2];

      if (beforeCode.trim()) {
        parts.push(
          <p key={`text-${lastIndex}`} className="mb-2 leading-relaxed">
            {beforeCode.trim()}
          </p>
        );
      }

      parts.push(
        <div
          key={`code-${match.index}`}
          className="my-2 rounded overflow-auto border border-gray-700"
        >
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            wrapLongLines={true}
            customStyle={{
              margin: 0,
              backgroundColor: "#1e1e1e",
              fontSize: "0.85rem",
              borderRadius: "0.5rem",
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    const remainingText = content.slice(lastIndex).trim();
    if (remainingText) {
      parts.push(
        <p key={`text-end`} className="mt-2 leading-relaxed">
          {remainingText}
        </p>
      );
    }

    return parts.length > 0 ? parts : <p>{content}</p>;
  };

  const handleChatSelect = async (chatId) => {
    setSelectedChatId(chatId);
    setMessages([]);
    if (!chatId) return;

    try {
      const res = await api.get(`/messages/${chatId}`);
      const chatMessages = [];

      res.data.forEach((msg) => {
        if (msg.question) {
          chatMessages.push({ role: "user", content: msg.question });
        }
        if (msg.answer) {
          chatMessages.push({
            role: msg.role || "cohere",
            content: msg.answer,
          });
        }
      });

      setMessages(chatMessages);
    } catch (err) {
      console.error("Failed to fetch messages for chat", err);
    }
  };

  const handleSend = async () => {
    const question = input.trim();
    if (!question || loading || !selectedChatId) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/messages", {
        question,
        chatId: selectedChatId,
      });

      const { message, from } = res.data;
      const role =
        message?.role || (from === "database" ? "database" : "cohere");
      const fullAnswer = message?.answer || "";

      setMessages((prev) => [...prev, { role, content: "" }]);

      for (let i = 0; i < fullAnswer.length; i++) {
        const textSoFar = fullAnswer.slice(0, i + 1);

        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1] = {
            role,
            content: textSoFar,
          };
          return updatedMessages;
        });

        await new Promise((res) => setTimeout(res, 5));
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "error", content: "Failed to get response. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  return (
    <div className="w-full flex" role="main" aria-label="Message with Cohere">
      <Sidebar
        onSelectChat={handleChatSelect}
        selectedChatId={selectedChatId}
      />
      <div className="w-full flex flex-col pb-4 bg-[#212121]">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div
          className="space-y-2 h-96 overflow-y-scroll p-2 bg-[#212121] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 flex-grow text-sm text-white border-t border-black"
          aria-live="polite"
        >
          {messages.length === 0 && !loading && (
            <div className="text-center text-gray-500">
              {selectedChatId
                ? "No messages yet. Start the conversation!"
                : "Select a chat to start messaging."}
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded whitespace-pre-wrap ${
                msg.role === "user"
                  ? " text-white text-right"
                  : msg.role === "cohere"
                  ? " text-white text-left"
                  : msg.role === "database"
                  ? "bg-yellow-600 text-black text-left"
                  : "bg-red-600 text-white text-left"
              }`}
            >
              <strong>{getRoleLabel(msg.role)}:</strong>
              <div>{renderMessageContent(msg.content)}</div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 flex px-2">
          <input
            className="flex-1 border rounded p-2 bg-gray-100 text-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              selectedChatId
                ? "Ask something..."
                : "Select or create a chat first"
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) handleSend();
            }}
            disabled={loading || !selectedChatId}
            aria-label="Type your question here"
          />
          <button
            onClick={handleSend}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={loading || !selectedChatId}
            aria-label="Send question"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
