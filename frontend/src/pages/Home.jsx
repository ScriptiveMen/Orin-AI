import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const Home = () => {
    const { user } = useSelector((state) => state.auth);

    if (user) {
        return <Navigate to={"/chat"} replace />;
    }

    return (
        <div className="min-h-screen w-full bg-black text-white overflow-hidden">
            {/* Simple gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

            {/* Subtle animated orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative z-10">
                {/* Main Hero Section */}
                <div className="container mx-auto px-4 md:px-12 lg:px-20">
                    <div className="flex py-[3rem] md:pb-0 pt-[4rem] flex-col items-center justify-center min-h-screen text-center">
                        {/* Logo/Brand */}
                        <div className="mb-6 md:mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
                                <svg
                                    className="w-8 h-8 md:w-10 md:h-10 text-white"
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
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-5xl leading-tight">
                            Your Intelligent Companion,
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                Anytime, Anywhere
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl">
                            Experience conversations with advanced AI. Get
                            instant answers, creative ideas, and personalized
                            assistance.
                        </p>

                        {/* CTA Button */}
                        <Link
                            to="/chat"
                            className="inline-flex items-center gap-2 px-5 md:px-8 py-2 md:py-3 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-200 transition-all duration-200 hover:scale-105 shadow-xl"
                        >
                            Try Orin AI
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
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </Link>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full">
                            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                                    <svg
                                        className="w-6 h-6 text-blue-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Natural Conversations
                                </h3>
                                <p className="text-gray-400">
                                    Chat naturally and get contextual responses
                                </p>
                            </div>

                            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                                    <svg
                                        className="w-6 h-6 text-purple-400"
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
                                <h3 className="text-xl font-semibold mb-2">
                                    Instant Answers
                                </h3>
                                <p className="text-gray-400">
                                    Get quick, accurate responses instantly
                                </p>
                            </div>

                            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                                <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                                    <svg
                                        className="w-6 h-6 text-pink-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Secure & Private
                                </h3>
                                <p className="text-gray-400">
                                    Your conversations stay confidential
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
