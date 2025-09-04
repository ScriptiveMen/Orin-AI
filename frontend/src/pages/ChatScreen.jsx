import React, { useEffect, useRef, useState } from "react";

const ChatScreen = () => {
  const [messages, setmessages] = useState([
    {
      message: "Hi Orin AI",
      role: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    },
    {
      message: "Hi, How can i help you today?",
      role: "bot",
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    },
  ]);

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

    setmessages((prev) => [
      ...prev,
      {
        message: inputValue,
        role: "user",
        time: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      },
    ]);

    setinputValue("");

    setIsTyping(true);

    setTimeout(() => {
      setmessages((prev) => [
        ...prev,
        {
          message: "Your response has been generated.",
          role: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
        },
      ]);

      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="h-full relative flex  justify-center w-full bg-[#111] px-4 md:px-15 pt-20">
      <div className="search z-10 w-[90%] pb-10 md:w-[60%] flex items-center justify-between absolute bottom-0 left-1/2 -translate-x-1/2">
        <form
          onSubmit={handleUserMessage}
          className=" w-full gap-3 px-3 flex items-center h-15 bg-[#202020] rounded-full "
        >
          <i className="ri-add-line text-2xl pl-1 md:pl-3"></i>

          <input
            type="text"
            className="w-full  h-full outline-none border-none"
            placeholder="Ask anything"
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
          />

          <i className="ri-mic-line text-xl"></i>
          <div className="wave h-10 w-10 shrink-0 rounded-full flex items-center justify-center bg-[#2f2f2f]">
            <i className="ri-voiceprint-line text-xl hidden md:block"></i>
            <button type="submit">
              <i className="ri-arrow-up-line text-xl block md:hidden"></i>
            </button>
          </div>
        </form>
      </div>

      <div className="chatarea hide-scrollbar pb-10 overflow-y-scroll h-[90%] flex flex-col gap-5 w-full py-2 md:w-[60%]">
        {messages.map((msg, idx) => {
          if (msg.role == "user") {
            return (
              <div
                key={idx}
                className="usermsg w-[50%]  flex items-center self-end justify-start flex-row-reverse gap-2"
              >
                <p className="px-3 rounded-xl bg-[#282727] py-1.5 text-base">
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
              <p className="px-3 py-1.5 text-base">{msg.message}</p>
            </div>
          );
        })}

        {isTyping && (
          <div className="botmsg w-[80%] flex items-center self-start justify-start gap-2">
            <div className="flex items-center gap-1 px-4 py-2 bg-[#1e1e1e] rounded-2xl">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
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
