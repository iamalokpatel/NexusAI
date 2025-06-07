import React from "react";

const ChatInput = ({
  input,
  setInput,
  handleSend,
  loading,
  isLoggedIn,
  selectedChatId,
  navigate,
}) => {
  const handleInputClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (!selectedChatId) {
      alert("Please select or create a chat first.");
    }
  };

  return (
    <div className="mt-5 flex justify-center px-4">
      <div className="relative w-full max-w-2xl px-2">
        <input
          className="w-full rounded-full p-8 pr-14 bg-[#252525] cursor-text text-white shadow-[0_4px_20px_rgba(0,0,0,0.6)] focus:outline-none focus:ring-1 focus:ring-[#333333] focus:ring-opacity-50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            selectedChatId
              ? "Ask something..."
              : "Select or create a chat first"
          }
          onClick={handleInputClick}
          onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
          disabled={loading}
          aria-label="Type your question here"
        />
        <button
          onClick={handleSend}
          className="absolute right-7 top-1/2 -translate-y-1/2 px-4 py-3 cursor-pointer text-white bg-[#2E2E2E] rounded-full disabled:opacity-50"
          disabled={loading || !selectedChatId}
          aria-label="Send"
        >
          🡹
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
