import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { currentuser, setLoading } from "../store/slices/userSlice";
import { toast } from "react-toastify";

const SignIn = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginHandler = (data) => {
        dispatch(setLoading(true)); // Set loading to true when request starts

        axios
            .post(
                "/api/auth/login",
                {
                    email: data.email,
                    password: data.password,
                },
                { withCredentials: true }
            )
            .then((res) => {
                dispatch(currentuser(res.data.user));
                navigate("/chat");
            })
            .catch((err) => {
                toast.error("Invalid email or password!", err);
                dispatch(setLoading(false));
            });

        reset();
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#111] px-4 md:px-15">
            <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-xl p-8 md:p-10">
                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-semibold text-center text-white">
                    Welcome Back
                </h2>
                <p className="text-sm text-gray-400 text-center mt-2">
                    Login to continue your journey with OrinAI
                </p>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(loginHandler)}
                    className="mt-8 space-y-5"
                >
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            {...register("email", { required: true })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-[#111] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            {...register("password", { required: true })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-[#111] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-white text-black rounded-xl hover:scale-[1.02] transition-transform font-medium shadow-md"
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-white font-medium hover:underline"
                    >
                        Sign up
                    </a>
                </p>

                <div className="text-center mt-4">
                    <Link to="/" className="text-blue-400 hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
