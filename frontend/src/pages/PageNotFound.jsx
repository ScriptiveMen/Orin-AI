import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PageNotFound = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black flex items-center justify-center px-4 pt-20">
            <div className="text-center max-w-2xl">
                {/* 404 Animation */}
                <div className="mb-8">
                    <div className="relative inline-block">
                        <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                            404
                        </div>
                        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 -z-10 animate-pulse"></div>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Page Not Found
                </h1>

                {/* Description */}
                <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                    Oops! The page you're looking for seems to have disappeared
                    into the void. It might have been moved, deleted, or perhaps
                    it never existed at all.
                </p>

                {/* Floating Elements */}
                <div className="mb-12 relative h-32">
                    <div className="absolute inset-0 flex items-center justify-center gap-8">
                        <div className="w-16 h-16 rounded-full border-2 border-blue-400/50 animate-spin" />
                        <div className="w-12 h-12 rounded-full border-2 border-purple-400/50 animate-pulse" />
                        <div className="w-16 h-16 rounded-full border-2 border-pink-400/50 animate-bounce" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all border border-white/20 hover:border-white/40"
                    >
                        ← Go Back
                    </button>

                    <Link
                        to={user ? "/chat" : "/"}
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all transform hover:scale-105"
                    >
                        {user ? "Go to Chat" : "Go to Home"}
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="pt-8 border-t border-white/10">
                    <p className="text-gray-400 text-sm mb-4">Quick Links:</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {user ? (
                            <>
                                <Link
                                    to="/chat"
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm transition-colors"
                                >
                                    Chat
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/"
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm transition-colors"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm transition-colors"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-sm transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Easter Egg Message */}
                <p className="text-gray-600 text-xs mt-12">
                    Pro tip: This page has excellent views, but terrible content
                    😄
                </p>
            </div>
        </div>
    );
};

export default PageNotFound;
