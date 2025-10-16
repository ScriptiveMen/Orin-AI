import React, { useEffect, useState } from "react";
import MainRoutes from "./routes/MainRoutes";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { currentuser, setLoading } from "./store/slices/userSlice";
import { setChats } from "./store/slices/chatSlice";
import { ToastContainer } from "react-toastify";

const App = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    useEffect(() => {
        const token = document.cookie.includes("token");
        if (!token) {
            dispatch(currentuser(null));
            return;
        }

        axios
            .get("https://orin-ai-1.onrender.com/api/auth/me", {
                withCredentials: true,
            })
            .then((res) => dispatch(currentuser(res.data.user)))
            .catch(() => dispatch(currentuser(null)))
            .finally(() => dispatch(setLoading(false)));
    }, [dispatch]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                if (!user) return;
                const res = await axios.get(
                    "https://orin-ai-1.onrender.com/api/chat",
                    {
                        withCredentials: true,
                    }
                );
                dispatch(setChats(res.data.chats));
            } catch (err) {
                console.error(err);
            }
        };

        fetchChats();
    }, [user, dispatch]);

    return (
        <div className="text-[#fff] h-screen w-screen">
            <Navbar
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
            />
            <MainRoutes />
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="dark"
            />
        </div>
    );
};

export default App;
