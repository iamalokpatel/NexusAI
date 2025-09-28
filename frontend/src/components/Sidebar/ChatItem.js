// components/ChatItem.jsx
const ChatItem = ({
  chat,
  selected,
  onSelect,
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
  const chatId = chat._id || chat.id;

  return (
    <div
      onClick={() => onSelect(chatId)}
      className={`px-4 py-[4px] rounded-lg hover:bg-[#1C1C1C] flex justify-between items-center cursor-pointer ${
        selected ? "bg-[#1E1E1E]" : ""
      }`}
    >
      {editingChatId === chatId ? (
        <div className="relative w-[16rem] ml-[-16px]">
          <input
            ref={editInputRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEditSubmit(chatId);
            }}
            className="w-[14rem] bg-[#1C1C1C] text-white rounded-lg px-2 py-2 focus:outline-none"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditSubmit(chatId);
            }}
            className="absolute top-2 right-2 text-xs shadow shadow-[#181818] px-3 py-1 rounded-lg"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <span className="truncate max-w-[120px]">{chat.title}</span>
          <div className="relative menu-parent">
            <button
              onClick={(e) => toggleMenu(e, chatId)}
              className="px-2 py-1 rounded hover:bg-gray-700"
            >
              &#x22EE;
            </button>

            {menuOpenId === chatId && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-12 bg-[#333333] rounded-lg shadow-lg z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditClick(chat);
                    setMenuOpenId(null);
                  }}
                  className="block w-full text-xs flex justify-center px-6 py-1 hover:bg-[#222222]"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(chatId);
                    setMenuOpenId(null);
                  }}
                  className="block w-full text-xs flex justify-center px-4 pb-1 hover:bg-red-600"
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
};

export default ChatItem;
