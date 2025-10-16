import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth);

    // Wait for auth check to complete
    if (loading) {
        return <div>Loading...</div>;
    }

    // If no user, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User exists, show protected content
    return children;
};

export default ProtectedRoute;
