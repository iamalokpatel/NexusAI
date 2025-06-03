import React, { useState, useRef, useEffect } from "react";
import api from "../utils/api";
import Sidebar from "./Sidebar";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const messagesEndRef = useRef(null);

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
      <div className="w-full flex flex-col p-4">
        <h1 className="text-xl font-bold mb-4 text-center">
          Message with OpenApi
        </h1>

        <div
          className="space-y-2 h-96 overflow-y-scroll border rounded p-2 bg-gray-100 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 flex-grow"
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
              className={`p-2 rounded whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-200 text-right"
                  : msg.role === "cohere"
                  ? "bg-green-200 text-left"
                  : msg.role === "database"
                  ? "bg-yellow-200 text-left"
                  : "bg-red-200 text-left"
              }`}
            >
              <strong>{getRoleLabel(msg.role)}:</strong> {msg.content}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 flex">
          <input
            className="flex-1 border rounded p-2"
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
