import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const LayoutWrapper = ({ children, isSidebarOpen, toggleSidebar }) => {
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);

    // Define routes where layout should NOT show
    const validRoutes = ["/", "/chat"];
    const noLayoutRoutes = ["/login", "/register"];

    // Check if route is valid or explicitly hidden
    const isValidChatRoute =
        location.pathname === "/chat" || location.pathname.startsWith("/chat/");
    const shouldShowLayout =
        location.pathname === "/" ||
        isValidChatRoute ||
        (location.pathname !== "/login" &&
            location.pathname !== "/register" &&
            location.pathname !== "*");

    return (
        <div className="text-[#fff] bg-black h-screen w-screen flex flex-col">
            {/* Navbar - Only on home and chat pages */}
            {(location.pathname === "/" || isValidChatRoute) && (
                <Navbar
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                />
            )}

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Only on chat pages AND when user is logged in */}
                {isValidChatRoute && user && (
                    <Sidebar
                        isSidebarOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />
                )}

                {/* Routes Container */}
                <div className="flex-1 overflow-auto">{children}</div>
            </div>
        </div>
    );
};

export default LayoutWrapper;
