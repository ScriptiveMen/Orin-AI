import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="h-full w-full  relative bg-[#111111af] px-4  md:px-15">
      <video
        autoPlay
        playsInline
        muted
        loop
        className="absolute top-0  left-0 -z-10 h-full w-full object-cover"
        src="/images/bg2.mp4"
      ></video>
      <div className="hero  flex items-center min-h-screen  justify-center flex-col gap-7">
        <h1 className="text-[6vw] font-bold text-center md:text-[2.3vw]">
          Your Intelligent Companion, Anytime, Anywhere.
        </h1>
        <div className="py-1.5 px-3 text-sm md:text-base bg-white group text-black rounded-full cursor-pointer transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2">
          Try OrinAI
          <i className="ri-external-link-fill"></i>
        </div>
      </div>
    </div>
  );
};

export default Home;
