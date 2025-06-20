import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import AdminLayout from '../layout/AdminLayout';

const AdminRoute = () => {
  const { user, isAuthenticated, loading } = useUser();

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

  // Redirect to home if not admin
  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render the admin component with admin layout
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminRoute;