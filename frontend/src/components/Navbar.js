import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showMenu, setShowMenu] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false); // logout logic
    setShowMenu(false);
  };

  const handleMouseEnter = () => {
    // Clear any existing timeout to prevent accidental hide
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    // Delay hiding by 1 second
    timeoutRef.current = setTimeout(() => {
      setShowMenu(false);
    }, 500);
  };

  return (
    <div className="w-full bg-[#212121] text-white p-4 flex justify-between items-center relative">
      <h1 className="text-lg font-bold">My Chat App</h1>

      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FaUserCircle
          size={28}
          className="cursor-pointer"
          onClick={() => setShowMenu((prev) => !prev)}
        />

        {showMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
            {!isLoggedIn ? (
              <>
                <div
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                    setShowMenu(false);
                  }}
                >
                  Login
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    navigate("/register");
                    setShowMenu(false);
                  }}
                >
                  Register
                </div>
              </>
            ) : (
              <div
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  handleLogout();
                  setShowMenu(false);
                }}
              >
                Logout
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
