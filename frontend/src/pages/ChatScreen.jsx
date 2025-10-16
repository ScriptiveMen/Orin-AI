import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { addModelMessage, addUserMessage } from "../store/slices/messageSlice";
import ReactMarkdown from "react-markdown";

const ChatScreen = () => {
    const messages = useSelector((state) => state.messages.messages);
    const [socket, setSocket] = useState();
    const activeChatId = useSelector((state) => state.chats.selectedChatId);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    const handleUserMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim() || !activeChatId) return;

        socket.emit("ai-message", {
            chat: activeChatId,
            message: inputValue,
        });
        dispatch(addUserMessage(inputValue));
        setInputValue("");
        setIsTyping(true);
    };

    useEffect(() => {
        const tempSocket = io("http://localhost:3000", {
            withCredentials: true,
        });
        tempSocket.on("ai-response", (message) => {
            dispatch(addModelMessage(message.content));
            setIsTyping(false);
        });
        setSocket(tempSocket);

        return () => {
            tempSocket.disconnect();
        };
    }, [dispatch]);

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="text-center max-w-2xl">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-white"
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
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Start a Conversation
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                    Ask me anything - I'm here to help with questions, ideas,
                    and creative tasks
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
                    <button
                        onClick={() =>
                            activeChatId &&
                            setInputValue(
                                "Help me brainstorm ideas for a project"
                            )
                        }
                        className="p-4 text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                    >
                        <div className="text-2xl mb-2">💡</div>
                        <p className="text-white text-sm font-medium">
                            Brainstorm ideas
                        </p>
                    </button>
                    <button
                        onClick={() =>
                            activeChatId &&
                            setInputValue(
                                "Explain a complex topic in simple terms"
                            )
                        }
                        className="p-4 text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                    >
                        <div className="text-2xl mb-2">📚</div>
                        <p className="text-white text-sm font-medium">
                            Explain something
                        </p>
                    </button>
                    <button
                        onClick={() =>
                            activeChatId &&
                            setInputValue("Help me write creative content")
                        }
                        className="p-4 text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                    >
                        <div className="text-2xl mb-2">✍️</div>
                        <p className="text-white text-sm font-medium">
                            Write content
                        </p>
                    </button>
                    <button
                        onClick={() =>
                            activeChatId &&
                            setInputValue("Solve a problem for me")
                        }
                        className="p-4 text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                    >
                        <div className="text-2xl mb-2">🎯</div>
                        <p className="text-white text-sm font-medium">
                            Solve problems
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-screen w-full bg-black flex flex-col">
            {/* Chat Messages Area */}
            <div
                ref={chatContainerRef}
                className="flex-1 mt-[4.5rem] overflow-y-auto"
                style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#333 #000",
                }}
            >
                <div className="max-w-5xl mx-auto px-4 py-6">
                    {messages.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="space-y-6 pb-32">
                            {messages.map((msg, idx) => {
                                if (msg.role === "user") {
                                    return (
                                        <div
                                            key={idx}
                                            className="flex justify-end"
                                        >
                                            <div className="max-w-[85%] md:max-w-[70%]">
                                                <div className="bg-white text-black px-4 py-3 rounded-2xl rounded-tr-md">
                                                    <p className="text-sm md:text-base leading-relaxed">
                                                        {msg.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div
                                        key={idx}
                                        className="flex justify-start"
                                    >
                                        <div className="max-w-[90%] md:max-w-[80%]">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                                                    <svg
                                                        className="w-4 h-4 text-white"
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
                                                </div>
                                                <div className="bg-white/5 backdrop-blur-sm text-gray-100 px-4 py-3 rounded-2xl rounded-tl-md border border-white/10">
                                                    <div className="prose prose-invert prose-sm max-w-none">
                                                        <ReactMarkdown
                                                            components={{
                                                                p: ({
                                                                    node,
                                                                    ...props
                                                                }) => (
                                                                    <p
                                                                        className="mb-2 last:mb-0 leading-relaxed text-sm md:text-base"
                                                                        {...props}
                                                                    />
                                                                ),
                                                                code: ({
                                                                    node,
                                                                    inline,
                                                                    ...props
                                                                }) =>
                                                                    inline ? (
                                                                        <code
                                                                            className="bg-black/50 px-1.5 py-0.5 rounded text-blue-400 text-sm"
                                                                            {...props}
                                                                        />
                                                                    ) : (
                                                                        <code
                                                                            className="block bg-black/50 p-3 rounded-lg my-2 overflow-x-auto text-sm"
                                                                            {...props}
                                                                        />
                                                                    ),
                                                                ul: ({
                                                                    node,
                                                                    ...props
                                                                }) => (
                                                                    <ul
                                                                        className="list-disc list-inside mb-2 space-y-1"
                                                                        {...props}
                                                                    />
                                                                ),
                                                                ol: ({
                                                                    node,
                                                                    ...props
                                                                }) => (
                                                                    <ol
                                                                        className="list-decimal list-inside mb-2 space-y-1"
                                                                        {...props}
                                                                    />
                                                                ),
                                                            }}
                                                        >
                                                            {msg.message}
                                                        </ReactMarkdown>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                                            <svg
                                                className="w-4 h-4 text-white"
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
                                        </div>
                                        <div className="bg-white/5 backdrop-blur-sm px-5 py-3 rounded-2xl rounded-tl-md border border-white/10">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                                                <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:150ms]"></span>
                                                <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:300ms]"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef}></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Fixed Input Area */}
            <div className="border-t border-white/10 bg-black">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <form onSubmit={handleUserMessage}>
                        <div
                            className={`
                            flex items-center gap-2 px-4 py-3 rounded-full border transition-all
                            ${
                                activeChatId
                                    ? "bg-white/5 border-white/10 hover:border-white/20"
                                    : "bg-white/5 border-white/10 opacity-50 cursor-not-allowed"
                            }
                        `}
                        >
                            <button
                                type="button"
                                className="text-gray-400 hover:text-white transition-colors"
                                disabled={!activeChatId}
                            >
                                <svg
                                    className="w-5 h-5"
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
                            </button>

                            <input
                                type="text"
                                className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-sm md:text-base"
                                placeholder={
                                    activeChatId
                                        ? "Ask anything..."
                                        : "Select or create a chat to start"
                                }
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={!activeChatId}
                            />

                            <button
                                type="submit"
                                disabled={!activeChatId || !inputValue.trim()}
                                className={`
                                    w-8 h-8 rounded-full transition-all flex items-center justify-center flex-shrink-0
                                    ${
                                        activeChatId && inputValue.trim()
                                            ? "bg-white hover:bg-gray-200 text-black"
                                            : "bg-white/20 text-gray-600 cursor-not-allowed"
                                    }
                                `}
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
                                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-xs text-gray-600 mt-2">
                        Orin AI can make mistakes. Check important information.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;
