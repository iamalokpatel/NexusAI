import React, { useState, useEffect, useRef } from "react";
import api from "../utils/api";
import { PiChatsCircleBold } from "react-icons/pi";

const Sidebar = ({ onSelectChat, selectedChatId }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);

  const editInputRef = useRef(null);
  const hideTimeoutRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".menu-parent")) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMouseEnter = (chatId) => {
    clearTimeout(hideTimeoutRef.current);
    setMenuOpenId(chatId);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setMenuOpenId(null);
    }, 400);
  };

  const toggleMenu = (e, chatId) => {
    e.stopPropagation();
    if (menuOpenId === chatId) {
      setMenuOpenId(null);
    } else {
      setMenuOpenId(chatId);
    }
  };

  const handleNewChat = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first.");
      return;
    }

    try {
      const newChatTitle = `New Chat ${chats.length + 1}`;
      const response = await api.post("/chats", {
        title: newChatTitle,
        userId,
      });
      const savedChat = response.data;
      setChats([savedChat, ...chats]);
      onSelectChat?.(savedChat._id);
    } catch (error) {
      console.error("Error creating chat:", error);
      alert("Failed to create chat.");
    }
  };

  const handleEditClick = (chat) => {
    setEditingChatId(chat._id || chat.id);
    setEditTitle(chat.title);
  };

  const handleEditChange = (e) => {
    setEditTitle(e.target.value);
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
    <div className="w-64 bg-[#181818] text-white h-screen p-4 flex flex-col">
      <button
        onClick={handleNewChat}
        className="w-full flex items-center gap-3 hover:bg-[#1C1C1C] py-2 px-3 rounded-lg mb-4"
      >
        <PiChatsCircleBold size={20} />
        <span className="text-base">New Chat</span>
      </button>

      <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-4rem)] flex-1">
        {loading && (
          <div className="text-gray-400 text-center mt-4">Loading chats...</div>
        )}

        {!loading && chats.length === 0 && (
          <div className="text-gray-400 text-center mt-4">
            No chats yet. Create a new chat!
          </div>
        )}

        {chats.map((chat) => {
          const chatId = chat._id || chat.id;

          return (
            <div
              key={chatId}
              onClick={() => onSelectChat?.(chatId)}
              className={` px-4 py-[4px] rounded-lg hover:bg-[#1C1C1C] flex justify-between items-center cursor-pointer ${
                selectedChatId === chatId ? "bg-[#1E1E1E]" : ""
              }`}
            >
              {editingChatId === chatId ? (
                <>
                  <input
                    ref={editInputRef}
                    type="text"
                    value={editTitle}
                    onChange={handleEditChange}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleEditSubmit(chatId);
                    }}
                    className="bg-gray-700 text-white rounded px-2 py-1 flex-grow mr-2"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditSubmit(chatId);
                    }}
                    className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="truncate max-w-[120px]">{chat.title}</span>

                  <div
                    className="relative menu-parent"
                    onMouseEnter={() => handleMouseEnter(chatId)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={(e) => toggleMenu(e, chatId)}
                      className="px-2 py-1 rounded hover:bg-gray-700"
                    >
                      &#x22EE;
                    </button>

                    {menuOpenId === chatId && (
                      <div className="absolute right-0 mt-2 w-24 bg-gray-700 rounded shadow-lg z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(chat);
                            setMenuOpenId(null);
                          }}
                          className="block w-full text-left px-3 py-2 hover:bg-gray-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(chatId);
                            setMenuOpenId(null);
                          }}
                          className="block w-full text-left px-3 py-2 hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
