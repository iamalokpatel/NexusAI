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
  setEditingChatId,
}) => {
  const chatId = chat._id || chat.id;
  const wrapperRef = useRef(null);

  // ====== Custom hook yahin define ======
  const useOutsideClick = (ref, callback, active = true) => {
    useEffect(() => {
      if (!active) return;
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, callback, active]);
  };
  // ======================================

  // menu ke liye ref
  const menuRef = useRef(null);

  // menu ke bahar click pe close
  useOutsideClick(
    menuRef,
    () => {
      if (menuOpenId === chatId) {
        setMenuOpenId(null);
      }
    },
    menuOpenId === chatId
  );

  // Auto save on clicking outside (edit input)
  useEffect(() => {
    if (!editingChatId) return;

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleEditSubmit(chatId);
        setEditingChatId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      className={`pl-4 py-2 rounded-lg flex items-center cursor-pointer transition-colors duration-200 ${
        selected ? "bg-[#1E1E1E]" : "hover:bg-[#1C1C1C]"
      }`}
    >
      {editingChatId === chatId ? (
        <div
          ref={wrapperRef}
          className="flex-1 relative"
          style={{ pointerEvents: "auto" }}
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
            className="bg-[#1E1E1E] text-white rounded-lg w-full py-2 px-3 focus:outline-none text-sm md:text-base"
            placeholder="Edit chat title"
          />
        </div>
      ) : (
        <>
          <span className="truncate max-w-[100px] md:max-w-[150px] text-sm md:text-base">
            {chat.title}
          </span>

          <div className="relative ml-auto" ref={menuRef}>
            <button
              onClick={(e) => toggleMenu(e, chatId)}
              className="px-2 py-1 rounded hover:bg-gray-700 text-sm md:text-base"
              aria-label="Chat menu"
            >
              &#x22EE;
            </button>

            {menuOpenId === chatId && (
              <div className="absolute top-10 right-0 w-24 md:w-28 bg-[#333333] rounded-lg shadow-lg z-10 flex flex-col">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditClick(chat);
                    setMenuOpenId(null);
                  }}
                  className="block w-full text-xs md:text-sm text-center px-2 py-1 hover:bg-gray-200 hover:text-black rounded-t-lg"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(chatId);
                    setMenuOpenId(null);
                  }}
                  className="block w-full text-xs md:text-sm text-center px-2 py-1 hover:bg-red-600 hover:text-white rounded-b-lg"
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
