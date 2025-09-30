import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar";
import ChatMessage from "../components/Messages/ChatMessage";
import api from "../utils/api";

const Messages = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Check login
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Select chat and fetch messages
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

  // Send message
  const handleSend = async () => {
    const question = input.trim();
    if (!question || loading) return;

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    let chatIdToUse = selectedChatId;

    // Create new chat if none selected
    if (!chatIdToUse) {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          alert("Please login first.");
          navigate("/login");
          return;
        }

        const newChatTitle = `New Chat ${chats.length + 1}`;
        const res = await api.post("/chats", { title: newChatTitle, userId });
        const newChat = res.data;
        chatIdToUse = newChat._id || newChat.id;
        setSelectedChatId(chatIdToUse);
        setChats((prev) => [newChat, ...prev]);
      } catch (err) {
        console.error("Failed to create new chat:", err);
        setMessages((prev) => [
          ...prev,
          { role: "error", content: "Failed to create a new chat. Try again." },
        ]);
        return;
      }
    }

    // Add user message
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
        chatId: chatIdToUse,
      });
      const { message, from } = res.data;
      const role =
        message?.role || (from === "database" ? "database" : "cohere");
      const fullAnswer = message?.answer || "";

      // Stream response
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
    <div className="min-h-screen w-full flex" role="main">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar
          chats={chats}
          setChats={setChats}
          onSelectChat={handleChatSelect}
          selectedChatId={selectedChatId}
        />
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="w-64 h-full bg-[#1c1c1c] shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              chats={chats}
              setChats={setChats}
              onSelectChat={handleChatSelect}
              selectedChatId={selectedChatId}
            />
          </div>
        </div>
      )}

      {/* Main chat area */}
      <div className="w-full flex flex-col bg-[#212121]">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        {/* Mobile sidebar button */}
        <button
          className="md:hidden pb-4 pl-4 text-white text-xl self-start fixed lef-0 top-[1rem]"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open Sidebar"
        >
          ☰
        </button>

        {/* Messages list */}
        <div className="flex-1 md:w-4/6 md:mx-auto px-4 md:px-8 lg:px-10 py-2 items-center text-white justify-center px-4 md:px-8 lg:px-10 py-2 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {messages.length === 0 && !loading && (
            <div className="text-center text-gray-500">
              {selectedChatId
                ? "No messages yet. Start the conversation!"
                : "Select or create a chat to start messaging."}
            </div>
          )}
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} role={msg.role} content={msg.content} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="px-4 py-3 flex justify-center sticky bottom-0">
          <div className="relative w-full max-w-2xl">
            <input
              className="w-full rounded-full p-4 pr-14 bg-[#252525] text-white shadow-[0_4px_20px_rgba(0,0,0,0.6)] focus:outline-none focus:ring-1 focus:ring-[#333333] focus:ring-opacity-50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                selectedChatId
                  ? "Ask something..."
                  : "Type your question to create a new chat"
              }
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
              aria-label="Type your question here"
            />
            <button
              onClick={handleSend}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 text-white bg-[#2E2E2E] rounded-full disabled:opacity-50"
              disabled={loading}
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
