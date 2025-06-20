import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useUser();
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect for transparent header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="ShopMyShirt Logo" className="h-10 w-10" />
            <span className={`font-heading font-bold text-xl ${
              isScrolled || location.pathname !== '/' ? 'text-primary-900' : 'text-white'
            }`}>
              ShopMyShirt
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium ${
                isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'
              } hover:text-accent-500 transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`font-medium ${
                isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'
              } hover:text-accent-500 transition-colors`}
            >
              Shop
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop */}
            <div className="hidden md:flex items-center relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="pl-9 pr-4 py-2 rounded-full text-sm border focus:outline-none focus:ring-1 focus:ring-primary-500 w-48 lg:w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className={`w-5 h-5 ${
                isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'
              }`} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className={`p-1.5 rounded-full hover:bg-gray-100 transition-colors ${
                  isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'
                }`}>
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Orders
                  </Link>
                  {user?.isAdmin && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className={`font-medium ${
                  isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'
                } hover:text-accent-500 transition-colors`}
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Menu className={`w-6 h-6 ${
                isScrolled || location.pathname !== '/' ? 'text-gray-800' : 'text-white'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 md:hidden">
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-primary-900">Menu</h2>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="font-medium text-gray-800 hover:text-accent-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="font-medium text-gray-800 hover:text-accent-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/cart" 
                className="font-medium text-gray-800 hover:text-accent-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/orders" 
                    className="font-medium text-gray-800 hover:text-accent-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  {user?.isAdmin && (
                    <Link 
                      to="/admin" 
                      className="font-medium text-gray-800 hover:text-accent-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="font-medium text-left text-gray-800 hover:text-accent-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="font-medium text-gray-800 hover:text-accent-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;



