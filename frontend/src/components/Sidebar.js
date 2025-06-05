import React, { useState, useEffect, useRef } from "react";
import api from "../utils/api";
import { PiChatsCircleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onSelectChat, selectedChatId }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);

  const navigate = useNavigate();
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
      navigate("/login");
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
        className="w-full h-[46px] flex items-center gap-3 hover:bg-[#1C1C1C] pb-3  px-3 rounded-lg mb-4 border-b border-gray-800 "
      >
        <PiChatsCircleBold size={20} />
        <span className="text-base shadow-lg">New Chat</span>
      </button>

      <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-4rem)] flex-1">
        {loading && (
          <div className="text-gray-400 text-center mt-4">Loading chats...</div>
        )}

        {!loading && chats.length === 0 && (
          <div className="text-gray-400  mt-3 ml-2">
            No chats yet.
            <br />
            Create a new chat!
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
                <div className="relative w-[16rem] ml-[-16px]">
                  <input
                    ref={editInputRef}
                    type="text"
                    value={editTitle}
                    onChange={handleEditChange}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleEditSubmit(chatId);
                    }}
                    className="w-[14rem] bg-[#1C1C1C] text-white rounded-lg px-2 py-2 focus:outline-none focus:ring-0 focus:border-transparent"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditSubmit(chatId);
                    }}
                    className="absolute top-2 right-2 text-xs  shadow shadow-[#181818] px-3 py-1 rounded-lg"
                  >
                    Save
                  </button>
                </div>
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
                      <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-12  bg-[#333333]  rounded-lg shadow-lg z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(chat);
                            setMenuOpenId(null);
                          }}
                          className="block w-full text-xs flex center justify-center px-6 py-1 rounded-lg hover:bg-[#222222] "
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(chatId);
                            setMenuOpenId(null);
                          }}
                          className="block w-full text-xs flex center justify-center px-4 pb-1 rounded-lg hover:bg-red-600"
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
