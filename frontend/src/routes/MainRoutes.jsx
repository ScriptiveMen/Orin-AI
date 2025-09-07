import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ChatScreen from "../pages/ChatScreen";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ProtectedRoute from "../components/ProtectedRoute";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatScreen />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  );
};

export default MainRoutes;
