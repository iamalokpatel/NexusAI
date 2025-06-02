import React, { useState } from "react";

const Sidebar = () => {
  const [chats, setChats] = useState([]);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `New Chat ${chats.length + 1}`,
    };
    setChats([newChat, ...chats]);
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4">
      <button
        onClick={handleNewChat}
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded mb-4"
      >
        + New Chat
      </button>

      <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-4rem)]">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="bg-gray-800 p-3 rounded hover:bg-gray-700 cursor-pointer"
          >
            {chat.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
