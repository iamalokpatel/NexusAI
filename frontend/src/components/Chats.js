import React, { useState, useRef, useEffect } from "react";
import api from "../utils/api";
import Sidebar from "./Sidebar";

const Chats = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    const question = input.trim();
    if (!question || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    try {
      // Axios call — no need for headers/body like fetch
      const res = await api.post("/chats", { question });
      const data = res.data;

      setMessages((prev) => [
        ...prev,
        {
          role: data.from === "database" ? "database" : "cohere",
          content: data.answer,
        },
      ]);
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
    <div className="w-full flex" role="main" aria-label="Chat with Cohere">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4">🧠 Chat with Cohere</h1>

        <div
          className="space-y-2 h-96 overflow-y-scroll border rounded p-2 bg-gray-100 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          aria-live="polite"
        >
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
            placeholder="Ask something..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) handleSend();
            }}
            disabled={loading}
            aria-label="Type your question here"
          />
          <button
            onClick={handleSend}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={loading}
            aria-label="Send question"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
