import { useEffect, useRef } from "react";

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
  setEditingChatId, // need this to reset edit mode
}) => {
  const chatId = chat._id || chat.id;
  const wrapperRef = useRef(null);

  // Auto save on clicking outside
  useEffect(() => {
    if (!editingChatId) return;

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleEditSubmit(chatId);
        setEditingChatId(null); // close edit mode
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingChatId, chatId, handleEditSubmit, setEditingChatId]);

  // Auto focus input when editing starts
  useEffect(() => {
    if (editingChatId === chatId && wrapperRef.current) {
      const input = wrapperRef.current.querySelector("input");
      input?.focus();
    }
  }, [editingChatId, chatId]);

  return (
    <div
      onClick={() => onSelect(chatId)}
      className={`pl-4 py-[4px] rounded-lg flex items-center cursor-pointer ${
        selected ? "bg-[#1E1E1E]" : "hover:bg-[#1C1C1C]"
      }`}
    >
      {editingChatId === chatId ? (
        <div
          ref={wrapperRef}
          className="relative rounded-lg"
          style={{ all: "unset", pointerEvents: "auto" }}
        >
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEditSubmit(chatId);
                setEditingChatId(null);
              }
            }}
            className="bg-[#1E1E1E] text-white rounded-lg w-[14rem] py-2 focus:outline-none box-border"
            style={{ textIndent: "1.8rem" }}
            placeholder="Edit chat title"
          />
        </div>
      ) : (
        <>
          <span className="truncate max-w-[120px] ">{chat.title}</span>
          <div className="relative menu-parent ml-auto">
            <button
              onClick={(e) => toggleMenu(e, chatId)}
              className="px-2 py-1 rounded hover:bg-gray-700"
              aria-label="Chat menu"
            >
              &#x22EE;
            </button>

            {menuOpenId === chatId && (
              <div className="absolute top-10 right-[-28px] w-20 bg-[#333333] rounded-lg shadow-lg z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditClick(chat);
                    setMenuOpenId(null);
                  }}
                  className="block w-full text-xs text-center px-1 pt-2 pb-[2px] hover:bg-[#fff] hover:text-black rounded-t-lg"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(chatId);
                    setMenuOpenId(null);
                  }}
                  className="block w-full text-xs text-center px-1 pt-[2px] pb-2 hover:bg-red-600 rounded-b-lg"
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
