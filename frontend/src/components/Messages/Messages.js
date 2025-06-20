import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "./Navbar";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

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

  const handleSend = async () => {
    const question = input.trim();
    if (!question || loading || !selectedChatId) return;

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
      { role: "cohere", content: "__loading__" },
    ]);
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

      let index = 0;
      const len = fullAnswer.length;

      while (index < len) {
        let batchSize = 8;
        if (index < len * 0.2) batchSize = 4;
        else if (index > len * 0.8) batchSize = 6;

        const partial = fullAnswer.slice(0, index + batchSize);

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role, content: partial };
          return updated;
        });

        index += batchSize;
        let delay = 10;
        if (index < len * 0.2) delay = 20;
        else if (index > len * 0.8) delay = 12;

        await new Promise((res) => setTimeout(res, delay));
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Send failed:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "error", content: "Failed to get response. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex" role="main">
      <div className="hidden md:block">
        <Sidebar
          onSelectChat={handleChatSelect}
          selectedChatId={selectedChatId}
        />
      </div>

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

      <div className="w-full flex flex-col pb-12 md:pb-6 bg-[#212121] h-screen md:h-auto">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <button
          className="md:hidden pb-4 pl-4 text-white text-xl self-start"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open Sidebar"
        >
          ☰
        </button>

        <div className="space-y-2 overflow-y-scroll p-2 bg-[#212121] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 flex-grow text-sm text-white border-t border-black h-screen md:h-96">
          {messages.length === 0 && !loading && (
            <div className="text-center text-gray-500">
              {selectedChatId
                ? "No messages yet. Start the conversation!"
                : "Select a chat to start messaging."}
            </div>
          )}
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} role={msg.role} content={msg.content} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          loading={loading}
          isLoggedIn={isLoggedIn}
          selectedChatId={selectedChatId}
          navigate={navigate}
        />
      </div>
    </div>
  );
};

export default Messages;
