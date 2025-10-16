import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import { currentuser } from "../store/slices/userSlice";
import { clearChats } from "../store/slices/chatSlice";
import { clearMessages } from "../store/slices/messageSlice";
import { useState } from "react";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    if (location.pathname === "/login" || location.pathname === "/register") {
        return null;
    }

    const handleLogout = async () => {
        try {
            await axios.post("/api/auth/logout", {}, { withCredentials: true });
            dispatch(currentuser(null));
            dispatch(clearChats());
            dispatch(clearMessages());
            navigate("/");
        } catch (err) {
            console.log("Error in logout", err);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-[999] bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-xl border-b border-white/10">
            <div className=" px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
                {/* Left Section - Logo & Sidebar Toggle */}
                <div className="flex items-center gap-4">
                    {/* Sidebar Toggle Button */}
                    <button
                        onClick={toggleSidebar}
                        className={`p-2 md:hidden block rounded-lg transition-all duration-300 hover:bg-white/10 ${
                            isSidebarOpen ? "bg-white/10" : "bg-white/5"
                        }`}
                        title="Toggle sidebar"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                        >
                            <line x1="4" y1="6" x2="20" y2="6"></line>
                            <line x1="4" y1="12" x2="20" y2="12"></line>
                            <line x1="4" y1="18" x2="20" y2="18"></line>
                        </svg>
                    </button>

                    {/* Logo */}
                    <Link
                        to={user ? "/chat" : "/"}
                        className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                    >
                        OrinAI
                    </Link>
                </div>

                {/* Right Section - Auth/User Menu */}
                <div className="flex items-center gap-3 md:gap-4">
                    {user ? (
                        <div className="relative">
                            {/* User Profile Button */}
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all group"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                                    {user?.fullname?.firstname?.[0]?.toUpperCase() ||
                                        "U"}
                                </div>
                                <span className="hidden sm:block text-sm font-medium text-white truncate max-w-[120px]">
                                    {user?.fullname?.firstname || "User"}
                                </span>
                                <svg
                                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                                        dropdownOpen ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-black/95 border border-white/20 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="px-4 py-3 border-b border-white/10">
                                        <p className="text-sm font-medium text-white">
                                            {user?.fullname?.firstname}{" "}
                                            {user?.fullname?.lastname}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {user?.email}
                                        </p>
                                    </div>
                                    <div className="px-2 py-2 space-y-1">
                                        <button
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                handleLogout();
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 md:gap-3">
                            <Link
                                to="/login"
                                className="px-3 md:px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="px-3 md:px-4 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
