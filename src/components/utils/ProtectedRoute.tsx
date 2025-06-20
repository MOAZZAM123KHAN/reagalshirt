import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useUser();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component
  return <Outlet />;
};

export default ProtectedRoute;