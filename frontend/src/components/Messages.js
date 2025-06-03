import React, { useState, useRef, useEffect } from "react";
import api from "../utils/api";
import Sidebar from "./Sidebar";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null); // New state to track selected chat
  const messagesEndRef = useRef(null);

  // When a chat is selected from Sidebar, load its messages
  const handleChatSelect = async (chatId) => {
    setSelectedChatId(chatId);
    setMessages([]); // Clear previous messages while loading
    if (!chatId) return;

    try {
      const res = await api.get(`/messages/${chatId}`);
      setMessages(
        res.data.map((msg) => ({
          role: msg.answer ? "cohere" : "user", // adjust if you store role differently
          content: msg.question || msg.answer || "",
        }))
      );
    } catch (err) {
      console.error("Failed to fetch messages for chat", err);
    }
  };

  const handleSend = async () => {
    const question = input.trim();
    if (!question || loading || !selectedChatId) return;

    // Add user's message
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    try {
      // Pass selectedChatId along with question
      const res = await api.post("/messages", {
        question,
        chatId: selectedChatId,
      });
      const data = res.data;

      const role = data.from === "database" ? "database" : "cohere";
      const fullAnswer = data.message?.answer || "";

      // Add empty response to animate typing
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

  return (
    <div className="w-full flex" role="main" aria-label="Message with Cohere">
      <div>
        {/* Pass handler to Sidebar to select chat */}
        <Sidebar
          onSelectChat={handleChatSelect}
          selectedChatId={selectedChatId}
        />
      </div>
      <div className="w-full flex flex-col">
        <h1 className="text-xl font-bold mb-4 flex center justify-center">
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
              <strong>{msg.role}:</strong> {msg.content}
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
