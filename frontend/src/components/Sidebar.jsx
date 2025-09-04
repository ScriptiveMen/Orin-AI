import { useState } from "react";
import { useLocation } from "react-router-dom";

const Sidebar = ({ isSidebarOpen }) => {
  const homeMenus = [
    "Research",
    "Safety",
    "For Business",
    "For Developers",
    "OrinAI",
    "Stories",
    "Company",
    "News",
  ];

  const [chats, setchats] = useState([
    { title: "Test1" },
    { title: "Project Ideas" },
    { title: "Shopping List" },
    { title: "Travel Plans" },
  ]);

  const location = useLocation();
  const isChatPage = location.pathname.startsWith("/chat");

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const handleNewChat = () => {
    const newchat = prompt("Enter Chat Title");
    if (newchat && newchat.trim() != "") {
      setchats((prev) => [...prev, { title: newchat }]);
    }
  };

  return (
    <div
      className={`fixed z-50 backdrop-blur-lg top-0 transition-transform duration-300 left-0 pt-20 md:pt-30 px-3 h-screen w-[15rem]
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      {!isChatPage ? (
        <div className="content pt-7 md:pt-30 flex-col flex gap-1">
          {homeMenus.map((menu, idx) => {
            return (
              <div
                key={idx}
                className="py-2 text-sm font-light cursor-pointer rounded-[0.5rem] px-4  hover:bg-white/20 transition-colors"
              >
                {menu}
              </div>
            );
          })}

          <div className="bottom pl-6 px-2  flex items-center justify-between w-full h-12 absolute bottom-2 left-0">
            <svg
              className="opacity-60"
              width="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 12.3393C1.58579 12.3393 1.25 12.0035 1.25 11.5893L1.25 6.48933C1.25 4.55633 2.817 2.98933 4.75 2.98933L6.75 2.98933V1.97671C6.75 1.53439 7.2821 1.30991 7.59892 1.61858L9.38241 3.3562C9.58386 3.55246 9.58386 3.8762 9.38242 4.07246L7.59892 5.81008C7.2821 6.11875 6.75 5.89427 6.75 5.45196V4.48933L4.75 4.48933C3.64543 4.48933 2.75 5.38476 2.75 6.48933L2.75 11.5893C2.75 12.0035 2.41421 12.3393 2 12.3393ZM14 3.66067C14.4142 3.66067 14.75 3.99646 14.75 4.41067V9.51066C14.75 11.4437 13.183 13.0107 11.25 13.0107H9.25001V14.0233C9.25001 14.4656 8.7179 14.6901 8.40109 14.3814L6.61759 12.6438C6.41615 12.4475 6.41615 12.1238 6.61759 11.9275L8.40109 10.1899C8.7179 9.88124 9.25001 10.1057 9.25001 10.548V11.5107H11.25C12.3546 11.5107 13.25 10.6152 13.25 9.51066V4.41067C13.25 3.99646 13.5858 3.66067 14 3.66067Z"
                fill="currentColor"
              ></path>
            </svg>

            <div className="px-3 block md:hidden  py-2 rounded-full text-sm bg-[#212121]">
              Log in
            </div>
          </div>
        </div>
      ) : (
        <div className="content-chat">
          <div
            onClick={handleNewChat}
            className="py-2 px-3 text-sm flex items-baseline justify-start gap-1 font-light cursor-pointer rounded-[0.5rem]  hover:bg-white/5 transition-colors"
          >
            <i className="ri-sticky-note-add-line text-lg"></i>
            <span>New Chat</span>
          </div>
          <h4 className="px-3  pt-7 font-thin text-[#949494]">Chats</h4>
          <div className="chats pt-2 h-[100vh] md:h-[92vh] ">
            <div className="chats h-[70%] overflow-y-scroll">
              {chats.map((chat, idx) => {
                return (
                  <div
                    key={idx}
                    className="py-2 text-sm font-light cursor-pointer rounded-[0.5rem] px-3  hover:bg-white/5 transition-colors"
                  >
                    {chat.title}
                  </div>
                );
              })}
            </div>
            <div className="profile gap-2 h-[10%] flex items-center justify-start px-4 w-full">
              <div className="circle h-7 w-7 rounded-full bg-blue-500 flex items-center justify-center">
                S
              </div>
              <div className="text">
                <p className="leading-5">Satya</p>
                <span className="block font-thin text-[#949494]  text-[0.7rem]">
                  Free
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
