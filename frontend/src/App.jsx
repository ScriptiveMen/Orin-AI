import React, { useEffect, useState } from "react";
import MainRoutes from "./routes/MainRoutes";
import LayoutWrapper from "./layout/LayoutWrapper";
import { useDispatch, useSelector } from "react-redux";
import axios from "./utils/axios";
import { currentuser, setLoading } from "./store/slices/userSlice";
import { setChats } from "./store/slices/chatSlice";
import { ToastContainer } from "react-toastify";

const App = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    // Desktop: sidebar open by default, Mobile: sidebar closed by default
    const [isSidebarOpen, setIsSidebarOpen] = useState(
        window.innerWidth >= 768
    );

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    // Initialize user on app load
    useEffect(() => {
        const initializeUser = async () => {
            try {
                const res = await axios.get("/api/auth/me", {
                    withCredentials: true,
                });
                dispatch(currentuser(res.data.user));
            } catch (err) {
                console.log("Not authenticated", err);
                dispatch(currentuser(null));
            } finally {
                dispatch(setLoading(false));
            }
        };

        initializeUser();
    }, [dispatch]);

    // Fetch chats when user is authenticated
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!user || loading) return;

        const fetchChats = async () => {
            try {
                const res = await axios.get("/api/chat", {
                    withCredentials: true,
                });
                dispatch(setChats(res.data.chats));
            } catch (err) {
                console.error("Failed to fetch chats:", err);
            }
        };

        fetchChats();
    }, [dispatch, loading]);

    // Show loading screen while checking authentication
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-screen bg-[#111]">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <LayoutWrapper
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
        >
            <MainRoutes />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="dark"
            />
        </LayoutWrapper>
    );
};

export default App;
