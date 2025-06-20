import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, ClipboardList, LogOut, Menu, X } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/products', label: 'Products', icon: <ShoppingBag size={20} /> },
    { path: '/admin/orders', label: 'Orders', icon: <ClipboardList size={20} /> },
    { path: '/admin/users', label: 'Users', icon: <Users size={20} /> },
  ];

  return (
    <div className="admin-layout">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="ShopMyShirt Logo" className="h-8 w-8" />
          <span className="font-heading font-bold text-primary-900">Admin</span>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-gray-900 bg-opacity-50"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`lg:admin-sidebar fixed z-40 h-full bg-primary-900 text-white w-64 transform transition-transform duration-300 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <Link to="/admin" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="ShopMyShirt Logo" className="h-8 w-8" />
            <span className="font-heading font-bold text-white">Admin Panel</span>
          </Link>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden p-1 rounded-full hover:bg-primary-800"
          >
            <X size={20} className="text-white" />
          </button>
        </div>
        
        <nav className="mt-8">
          <ul className="space-y-2 px-2">
            {navItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-800 text-white'
                      : 'text-gray-300 hover:bg-primary-800 hover:text-white'
                  }`}
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            <li className="pt-4 mt-4 border-t border-primary-800">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 rounded-md w-full text-left text-gray-300 hover:bg-primary-800 hover:text-white transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-xs text-gray-400 text-center">
          <Link to="/" className="hover:text-white transition-colors">
            Back to Shop
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:admin-content pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;