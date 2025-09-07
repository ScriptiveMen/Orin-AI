import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  // ⏳ While checking auth, don't redirect yet
  if (loading) {
    return <div>Loading...</div>; // you can replace with a spinner
  }

  // 🚫 If not logged in after loading finished
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If logged in
  return children;
};

export default ProtectedRoute;
