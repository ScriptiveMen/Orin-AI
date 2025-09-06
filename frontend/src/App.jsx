import React, { useEffect, useState } from "react";
import MainRoutes from "./routes/MainRoutes";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useDispatch } from "react-redux";
import axios from "axios";
import { currentuser } from "./store/slices/userSlice";

const App = () => {
  const dispatch = useDispatch();

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

  return (
    <div className="text-[#fff] h-screen w-screen">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <MainRoutes />
      <Sidebar isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default App;
