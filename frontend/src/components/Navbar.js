import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLogin();

    window.addEventListener("authChange", checkLogin);
    return () => window.removeEventListener("authChange", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setShowMenu(false);
    navigate("/login");
    window.dispatchEvent(new Event("authChange"));
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowMenu(false);
    }, 400);
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
          <div className="absolute right-0 mt-2 w-40  bg-[#333333] text-[444444] rounded shadow-lg z-10">
            {!isLoggedIn ? (
              <>
                <div
                  className="px-4 py-2 flex center justify-center cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                    setShowMenu(false);
                  }}
                >
                  Login
                </div>
                <div
                  className="px-4 py-2 flex center justify-center cursor-pointer"
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
                className="px-4 py-2 flex center justify-center cursor-pointer"
                onClick={handleLogout}
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
