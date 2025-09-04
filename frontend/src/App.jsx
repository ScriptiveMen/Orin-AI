import React, { useState } from "react";
import MainRoutes from "./routes/MainRoutes";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="text-[#fff] h-screen w-screen">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <MainRoutes />
      <Sidebar isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default App;
