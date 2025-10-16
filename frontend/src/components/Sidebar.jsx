import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addChat, selectChat } from "../store/slices/chatSlice";
import { logout } from "../store/slices/userSlice";
import axios from "../utils/axios";
import { useEffect } from "react";
import { setMessages } from "../store/slices/messageSlice";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const AllChats = useSelector((state) => state.chats.chats);
    const activeId = useSelector((state) => state.chats.selectedChatId);
    const location = useLocation();
    const isChatPage = location.pathname.startsWith("/chat");

    const handleNewChat = async () => {
        const newchat = prompt("Enter Chat Title");
        if (newchat && newchat.trim() !== "") {
            try {
                const res = await axios.post(
                    "/api/chat/",
                    { title: newchat },
                    { withCredentials: true }
                );
                dispatch(addChat(res.data.chat));
                dispatch(selectChat(res.data.chat.id));
            } catch (err) {
                console.error("Error creating chat:", err);
            }
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {
            if (!activeId) return;
            try {
                const res = await axios.get(
                    `http://localhost:3000/api/chat/message/${activeId}`,
                    { withCredentials: true }
                );
                const formattedMessage = res.data.messages.map((msg) => {
                    return {
                        message: msg.content,
                        role: msg.role,
                    };
                });
                dispatch(setMessages(formattedMessage));
            } catch (err) {
                console.error("Error while fetching messages", err);
            }
        };
        fetchMessages();
    }, [activeId, dispatch]);

    return (
        <>
            {/* Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed z-50 top-0 left-0 h-screen w-64 bg-black border-r border-white/10 transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                <div className="flex flex-col h-full pt-20">
                    {/* New Chat Button */}
                    <div className="px-3 py-4 border-b border-white/10">
                        <button
                            onClick={handleNewChat}
                            className="w-full py-2.5 px-4 text-sm flex items-center justify-center gap-2 font-medium text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10"
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
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            <span>New Chat</span>
                        </button>
                    </div>

                    {/* Chat History */}
                    <div className="flex-1 overflow-hidden px-3">
                        <h4 className="py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Recent Chats
                        </h4>
                        <div
                            className="overflow-y-auto h-[calc(100%-3rem)] pr-1"
                            style={{
                                scrollbarWidth: "thin",
                                scrollbarColor: "#333 transparent",
                            }}
                        >
                            {AllChats.length === 0 ? (
                                <div className="py-8 text-center">
                                    <svg
                                        className="w-12 h-12 mx-auto mb-3 text-gray-700"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                    <p className="text-sm text-gray-500">
                                        No chats yet
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Start a new conversation
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-1 pb-4">
                                    {[...AllChats]
                                        .reverse()
                                        .map((chat, idx) => {
                                            const isActive =
                                                activeId === chat._id ||
                                                activeId === chat.id;
                                            return (
                                                <div
                                                    key={idx}
                                                    onClick={() =>
                                                        dispatch(
                                                            selectChat(
                                                                chat._id ||
                                                                    chat.id
                                                            )
                                                        )
                                                    }
                                                    className={`
                        group relative py-2.5 px-3 text-sm cursor-pointer rounded-lg transition-all
                        ${
                            isActive
                                ? "bg-white/10 text-white border border-white/10"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }
                      `}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <svg
                                                            className="w-4 h-4 flex-shrink-0"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                                            />
                                                        </svg>
                                                        <span className="truncate flex-1">
                                                            {chat.title}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Plan Info */}
                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center gap-3">
                            <svg
                                className="w-5 h-5 text-gray-400 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            <span className="text-xs text-gray-400">
                                Free Plan
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
