import React, { useEffect, useRef } from "react";
import api from "../../utils/api";
import { LuSquarePen } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import ChatItem from "./ChatItem";

const Sidebar = ({
  chats,
  setChats,
  onSelectChat,
  selectedChatId,
  closeSidebar,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [editingChatId, setEditingChatId] = React.useState(null);
  const [editTitle, setEditTitle] = React.useState("");
  const [menuOpenId, setMenuOpenId] = React.useState(null);

  const navigate = useNavigate();
  const editInputRef = useRef(null);

  // fetch chats only once (initial load)
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
  }, [setChats]);

  useEffect(() => {
    if (editingChatId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingChatId]);

  const toggleMenu = (e, chatId) => {
    e.stopPropagation();
    setMenuOpenId((prev) => (prev === chatId ? null : chatId));
  };

  // New chat creation
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
      closeSidebar?.();
      return savedChat;
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

  return (
    <div className="flex flex-col min-h-screen w-64 bg-[#181818] text-white p-4 sticky top-0">
      <button
        onClick={handleNewChat}
        className="w-full h-[46px] flex items-center gap-2 hover:bg-[#1C1C1C] pb-3 px-4 rounded-lg mb-4 border-b border-gray-800"
      >
        <LuSquarePen />
        <span className="text-base shadow-lg">New Chat</span>
      </button>

      {/* Chat list / Loading / Empty */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {loading ? (
          <div className="text-gray-400 text-center mt-4">Loading chats...</div>
        ) : chats && chats.length > 0 ? (
          chats.map((chat) => (
            <ChatItem
              key={chat._id || chat.id}
              chat={chat}
              selected={selectedChatId === (chat._id || chat.id)}
              onSelect={(id) => {
                onSelectChat(id);
                closeSidebar?.();
              }}
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
          ))
        ) : (
          <div className="text-gray-400 mt-3 ml-2">
            No chats yet.
            <br />
            Create a new chat!
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
