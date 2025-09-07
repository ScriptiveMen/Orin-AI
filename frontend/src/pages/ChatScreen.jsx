import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { addModelMessage, addUserMessage } from "../store/slices/messageSlice";
import EmptyChat from "../components/EmptyChat";

const ChatScreen = () => {
  // const [messages, setmessages] = useState([
  //   {
  //     message: "Hi Orin AI",
  //     role: "user",
  //     time: new Date().toLocaleTimeString([], {
  //       hour: "numeric",
  //       minute: "2-digit",
  //       hour12: true,
  //     }),
  //   },
  //   {
  //     message: "Hi, How can i help you today?",
  //     role: "bot",
  //     time: new Date().toLocaleTimeString([], {
  //       hour: "numeric",
  //       minute: "2-digit",
  //       hour12: true,
  //     }),
  //   },
  // ]);

  const messages = useSelector((state) => state.messages.messages);

  const [socket, setSocket] = useState();
  const activeChatId = useSelector((state) => state.chats.selectedChatId);
  const dispatch = useDispatch();
  const [inputValue, setinputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleUserMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    socket.emit("ai-message", {
      chat: activeChatId,
      message: inputValue,
    });
    dispatch(addUserMessage(inputValue));

    setinputValue("");

    setIsTyping(true);
  };

  useEffect(() => {
    const tempSocket = io("http://localhost:3000", { withCredentials: true });
    tempSocket.on("ai-response", (message) => {
      dispatch(addModelMessage(message.content));
      setIsTyping(false);
    });
    setSocket(tempSocket);
  }, []);

  return (
    <div className="h-full relative flex  justify-center w-full bg-[#111] px-4 md:px-15 pt-20">
      <div className="search z-10 w-[90%] pb-10 md:w-[60%] flex items-center justify-between absolute bottom-0 left-1/2 -translate-x-1/2">
        <form
          onSubmit={handleUserMessage}
          className={`w-full gap-3 px-3 flex items-center h-15 rounded-full 
      ${
        activeChatId
          ? "bg-[#202020]"
          : "bg-[#2f2f2f71] opacity-50 cursor-not-allowed"
      }
    `}
        >
          <i className="ri-add-line text-2xl pl-1 md:pl-3"></i>

          <input
            type="text"
            className="w-full h-full outline-none border-none bg-transparent"
            placeholder="Ask anything"
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
            disabled={!activeChatId}
          />

          <i className="ri-mic-line text-xl"></i>
          <div className="wave h-10 w-10 shrink-0 rounded-full flex items-center justify-center bg-[#2f2f2f]">
            <i className="ri-voiceprint-line text-xl hidden md:block"></i>
            <button type="submit" disabled={!activeChatId}>
              <i className="ri-arrow-up-line text-xl block md:hidden"></i>
            </button>
          </div>
        </form>
      </div>

      <div className="chatarea hide-scrollbar pb-10 overflow-y-scroll h-[90%] flex flex-col gap-5 w-full py-2 md:w-[60%]">
        {messages.length == 0 ? (
          <EmptyChat />
        ) : (
          messages.map((msg, idx) => {
            if (msg.role == "user") {
              return (
                <div
                  key={idx}
                  className="usermsg w-[50%]  flex items-center self-end justify-start flex-row-reverse gap-2"
                >
                  <p className="px-3 rounded-xl font-thin bg-[#282727] py-1.5 text-base">
                    {msg.message}
                  </p>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className="botmsg w-[80%] flex items-center self-start justify-start gap-2"
              >
                <p className="px-3 py-1.5 font-thin text-base">{msg.message}</p>
              </div>
            );
          })
        )}

        {isTyping && (
          <div className="botmsg w-[80%] flex items-center self-start justify-start gap-2">
            <div className="flex items-center gap-1 px-4 py-2 bg-[#181818] rounded-2xl">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]"></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]"></span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]"></span>
            </div>
          </div>
        )}
        {/* invisible div */}
        <div ref={messagesEndRef}></div>
      </div>
    </div>
  );
};

export default ChatScreen;
