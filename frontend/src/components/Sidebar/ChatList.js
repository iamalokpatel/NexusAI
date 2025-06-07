// components/ChatList.jsx
import React from "react";
import ChatItem from "./ChatItem";

const ChatList = ({
  chats,
  loading,
  selectedChatId,
  onSelectChat,
  onEditClick,
  onDelete,
  menuOpenId,
  toggleMenu,
  setMenuOpenId,
  editingChatId,
  editTitle,
  setEditTitle,
  handleEditSubmit,
  editInputRef,
}) => {
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
    <>
      {chats.map((chat) => (
        <ChatItem
          key={chat._id || chat.id}
          chat={chat}
          selected={selectedChatId === (chat._id || chat.id)}
          onSelect={onSelectChat}
          onEditClick={onEditClick}
          onDelete={onDelete}
          menuOpenId={menuOpenId}
          toggleMenu={toggleMenu}
          setMenuOpenId={setMenuOpenId}
          editingChatId={editingChatId}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          handleEditSubmit={handleEditSubmit}
          editInputRef={editInputRef}
        />
      ))}
    </>
  );
};

export default ChatList;
