import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { currentuser } from "../store/slices/userSlice";

const SignUp = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerHandler = (data) => {
    axios
      .post(
        "http://localhost:3000/api/auth/register",
        {
          fullname: {
            firstname: data.firstname,
            lastname: data.lastname,
          },
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        navigate("/chat");
        dispatch(currentuser(res.data.user));
      })
      .catch((err) => {
        console.log("Registration failed", err);
      });

    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#111] px-4 md:px-15">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-xl p-8 md:p-10">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-white">
          Create an Account
        </h2>
        <p className="text-sm text-gray-400 text-center mt-2">
          Join OrinAI and start your journey today
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(registerHandler)}
          className="mt-8 space-y-5"
        >
          {/* First + Last Name */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                {...register("firstname", { required: true })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-[#111] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                {...register("lastname", { required: true })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-[#111] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
              />
            </div>
          </div>

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

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-3 bg-white text-black rounded-xl hover:scale-[1.02] transition-transform font-medium shadow-md"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-white font-medium hover:underline">
            Sign in
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

export default SignUp;
