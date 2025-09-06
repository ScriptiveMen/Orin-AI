import React, { useEffect, useState } from "react";
import MainRoutes from "./routes/MainRoutes";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { currentuser } from "./store/slices/userSlice";
import { setChats } from "./store/slices/chatSlice";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/me", { withCredentials: true })
      .then((res) => {
        dispatch(currentuser(res.data.user));
      })
      .catch((err) => {
        dispatch(currentuser(null));
      });
  }, [dispatch]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        if (!user) return;
        const res = await axios.get("http://localhost:3000/api/chat", {
          withCredentials: true,
        });
        dispatch(setChats(res.data.chats));
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, [user, dispatch]);

  return (
    <div className="text-[#fff] h-screen w-screen">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <MainRoutes />
      <Sidebar isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default App;
