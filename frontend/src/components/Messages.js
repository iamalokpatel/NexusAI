import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import api from "../utils/api";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

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

  const renderMessageContent = (content) => {
    const parts = [];
    const lines = content.split("\n");
    let inCodeBlock = false;
    let codeLang = "javascript";
    let codeLines = [];
    let textBuffer = [];

    const flushTextBuffer = () => {
      if (textBuffer.length > 0) {
        parts.push(
          <p key={`text-${parts.length}`} className="mb-2 leading-relaxed">
            {textBuffer.join("\n")}
          </p>
        );
        textBuffer = [];
      }
    };

    lines.forEach((line, idx) => {
      const codeBlockStart = line.trim().match(/^```(\w*)?/);

      if (codeBlockStart) {
        flushTextBuffer();

        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLang = codeBlockStart[1] || "javascript";
          codeLines = [];
        } else {
          // Ending code block
          parts.push(
            <div
              key={`code-${parts.length}`}
              className="my-2 rounded overflow-auto border border-gray-700"
            >
              <SyntaxHighlighter
                language={codeLang}
                style={vscDarkPlus}
                wrapLongLines={true}
                customStyle={{
                  margin: 0,
                  backgroundColor: "#1e1e1e",
                  fontSize: "0.85rem",
                  borderRadius: "0.5rem",
                }}
              >
                {codeLines.join("\n")}
              </SyntaxHighlighter>
            </div>
          );
          inCodeBlock = false;
        }
      } else if (inCodeBlock) {
        codeLines.push(line);
      } else {
        textBuffer.push(line);
      }
    });

    flushTextBuffer();

    // If code block wasn't closed
    if (inCodeBlock && codeLines.length > 0) {
      parts.push(
        <div
          key={`code-unclosed-${parts.length}`}
          className="my-2 rounded overflow-auto border border-yellow-700"
        >
          <SyntaxHighlighter
            language={codeLang}
            style={vscDarkPlus}
            wrapLongLines={true}
            customStyle={{
              margin: 0,
              backgroundColor: "#1e1e1e",
              fontSize: "0.85rem",
              borderRadius: "0.5rem",
            }}
          >
            {codeLines.join("\n")}
          </SyntaxHighlighter>
        </div>
      );
    }

    return parts;
  };

  const handleChatSelect = async (chatId) => {
    setSelectedChatId(chatId);
    setMessages([]);
    if (!chatId) return;

    try {
      const res = await api.get(`/messages/${chatId}`);
      const chatMessages = [];

      res.data.forEach((msg) => {
        if (msg.question)
          chatMessages.push({ role: "user", content: msg.question });
        if (msg.answer)
          chatMessages.push({
            role: msg.role || "cohere",
            content: msg.answer,
          });
      });

      setMessages(chatMessages);
      setSidebarOpen(false);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const handleInputClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (!selectedChatId) {
      alert("Please select or create a chat first.");
    }
  };

  const handleSend = async () => {
    const question = input.trim();
    if (!question || loading || !selectedChatId) return;

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

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
        const partial = fullAnswer.slice(0, i + 1);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role, content: partial };
          return updated;
        });
        await new Promise((res) => setTimeout(res, 2));
      }
    } catch (error) {
      console.error("Send failed:", error);
      setMessages((prev) => [
        ...prev,
        { role: "error", content: "Failed to get response. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex" role="main">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          onSelectChat={handleChatSelect}
          selectedChatId={selectedChatId}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="w-64 h-full bg-[#1c1c1c] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              onSelectChat={handleChatSelect}
              selectedChatId={selectedChatId}
            />
          </div>
        </div>
      )}

      {/* Main Panel */}
      <div className="w-full flex flex-col pb-12 md:pb-6 bg-[#212121] h-screen md:h-auto">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden pb-4 pl-4 text-white text-xl self-start"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open Sidebar"
        >
          ☰
        </button>

        {/* Messages Section */}
        <div className="space-y-2 overflow-y-scroll p-2 bg-[#212121] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 flex-grow text-sm text-white border-t border-black h-screen md:h-96">
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
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <strong>{getRoleLabel(msg.role)}:</strong>
              <div>{renderMessageContent(msg.content)}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="mt-5 flex justify-center px-4">
          <div className="relative w-full max-w-2xl px-2">
            <input
              className="w-full rounded-full p-8 pr-14 bg-[#252525] cursor-text text-white shadow-[0_4px_20px_rgba(0,0,0,0.6)] focus:outline-none focus:ring-1 focus:ring-[#333333] focus:ring-opacity-50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                selectedChatId
                  ? "Ask something..."
                  : "Select or create a chat first"
              }
              onClick={handleInputClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) handleSend();
              }}
              disabled={loading}
              aria-label="Type your question here"
            />
            <button
              onClick={handleSend}
              className="absolute right-7 top-1/2 -translate-y-1/2 px-4 py-3 cursor-pointer text-white bg-[#2E2E2E] rounded-full disabled:opacity-50"
              disabled={loading || !selectedChatId}
              aria-label="Send"
            >
              🡹
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
