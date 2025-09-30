import React, { useState, useEffect, useRef } from "react";
import api from "../../utils/api";
import { PiChatsCircleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import ChatItem from "./ChatItem";

const Sidebar = ({ onSelectChat, selectedChatId }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);

  const navigate = useNavigate();
  const editInputRef = useRef(null);

  useEffect(() => {
    const fetchChats = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      setLoading(true);
      try {
        const response = await api.get(`/chats?userId=${userId}`);
        setChats(response.data);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    if (editingChatId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingChatId]);

  const toggleMenu = (e, chatId) => {
    e.stopPropagation();
    setMenuOpenId((prev) => (prev === chatId ? null : chatId));
  };

  // Updated: returns the newly created chat object
  const handleNewChat = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first.");
      navigate("/login");
      return null;
    }

    try {
      const newChatTitle = `New Chat ${chats.length + 1}`;
      const response = await api.post("/chats", {
        title: newChatTitle,
        userId,
      });
      const savedChat = response.data;
      setChats((prev) => [savedChat, ...prev]);
      onSelectChat?.(savedChat._id || savedChat.id);
      return savedChat; // return for parent to use
    } catch (error) {
      console.error("Error creating chat:", error);
      return null;
    }
  };

  const handleEditClick = (chat) => {
    setEditingChatId(chat._id || chat.id);
    setEditTitle(chat.title);
  };

  const handleEditSubmit = async (chatId) => {
    try {
      await api.put(`/chats/${chatId}`, { title: editTitle });
      setChats((prev) =>
        prev.map((chat) =>
          (chat._id || chat.id) === chatId
            ? { ...chat, title: editTitle }
            : chat
        )
      );
      setEditingChatId(null);
    } catch (error) {
      console.error("Failed to update chat title:", error);
      alert("Failed to update chat title.");
    }
  };

  const handleDelete = async (chatId) => {
    try {
      await api.delete(`/chats/${chatId}`);
      const updatedChats = chats.filter(
        (chat) => (chat._id || chat.id) !== chatId
      );
      setChats(updatedChats);
      if (selectedChatId === chatId) {
        onSelectChat?.(updatedChats[0]?._id || updatedChats[0]?.id || null);
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
      alert("Failed to delete chat.");
    }
  };

  if (loading)
    return (
      <div className="text-gray-400 text-center mt-4">Loading chats...</div>
    );

  if (chats.length === 0)
    return (
      <div className="text-gray-400 mt-3 ml-2">
        No chats yet.
        <br />
        Create a new chat!
      </div>
    );

  return (
    <div className="w-64 bg-[#181818] text-white h-screen p-4 flex flex-col">
      <button
        onClick={handleNewChat}
        className="w-full h-[46px] flex items-center gap-3 hover:bg-[#1C1C1C] pb-3 px-4 rounded-lg mb-4 border-b border-gray-800"
      >
        <PiChatsCircleBold size={20} />
        <span className="text-base shadow-lg">New Chat</span>
      </button>

      <div className="space-y-2 flex-1">
        {chats.map((chat) => (
          <ChatItem
            key={chat._id || chat.id}
            chat={chat}
            selected={selectedChatId === (chat._id || chat.id)}
            onSelect={onSelectChat}
            onEditClick={handleEditClick}
            onDelete={handleDelete}
            menuOpenId={menuOpenId}
            toggleMenu={toggleMenu}
            setMenuOpenId={setMenuOpenId}
            editingChatId={editingChatId}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            handleEditSubmit={handleEditSubmit}
            editInputRef={editInputRef}
            setEditingChatId={setEditingChatId}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
