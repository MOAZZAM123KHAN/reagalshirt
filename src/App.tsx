// import { useEffect, useState } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import { UserProvider } from './contexts/UserContext';
// import { CartProvider } from './contexts/CartContext';
// import ScrollToTop from './components/utils/ScrollToTop';
// import ProtectedRoute from './components/utils/ProtectedRoute';
// import AdminRoute from './components/utils/AdminRoute';

// // Customer Pages
// import Home from './pages/customer/Home';
// import ProductList from './pages/customer/ProductList';
// import ProductDetail from './pages/customer/ProductDetail';
// import Cart from './pages/customer/Cart';
// import Checkout from './pages/customer/Checkout';
// import OrderSuccess from './pages/customer/OrderSuccess';
// import OrderHistory from './pages/customer/OrderHistory';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';

// // Admin Pages
// import AdminDashboard from './pages/admin/Dashboard';
// import AdminProducts from './pages/admin/Products';
// import AdminOrders from './pages/admin/Orders';
// import AdminUsers from './pages/admin/Users';

// function App() {
//   const location = useLocation();
//   const [isAdmin, setIsAdmin] = useState(false);
  
//   // Check if we're on an admin route
//   useEffect(() => {
//     setIsAdmin(location.pathname.startsWith('/admin'));
//   }, [location]);

//   return (
//     <UserProvider>
//       <CartProvider>
//         <ScrollToTop />
//         <Routes>
//           {/* Customer Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<ProductList />} />
//           <Route path="/products/:id" element={<ProductDetail />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
          
//           {/* Protected Customer Routes */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/order-success/:id" element={<OrderSuccess />} />
//             <Route path="/orders" element={<OrderHistory />} />
//           </Route>
          
//           {/* Admin Routes */}
//           <Route element={<AdminRoute />}>
//             <Route path="/admin" element={<AdminDashboard />} />
//             <Route path="/admin/products" element={<AdminProducts />} />
//             <Route path="/admin/orders" element={<AdminOrders />} />
//             <Route path="/admin/users" element={<AdminUsers />} />
//           </Route>
//         </Routes>
//       </CartProvider>
//     </UserProvider>
//   );
// }

import { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import ScrollToTop from './components/utils/ScrollToTop';

function App() {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(location.pathname.startsWith('/admin'));
  }, [location]);

  return (
    <UserProvider>
      <CartProvider>
        <ScrollToTop />
        <Outlet />
      </CartProvider>
    </UserProvider>
  );
}

export default App;
