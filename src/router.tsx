// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

import Home from './pages/customer/Home';
import ProductList from './pages/customer/ProductList';
import ProductDetail from './pages/customer/ProductDetail';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import OrderSuccess from './pages/customer/OrderSuccess';
import OrderHistory from './pages/customer/OrderHistory';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';

import ProtectedRoute from './components/utils/ProtectedRoute';
import AdminRoute from './components/utils/AdminRoute';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'products', element: <ProductList /> },
        { path: 'products/:id', element: <ProductDetail /> },
        { path: 'cart', element: <Cart /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },

        {
          element: <ProtectedRoute />,
          children: [
            { path: 'checkout', element: <Checkout /> },
            { path: 'order-success/:id', element: <OrderSuccess /> },
            { path: 'orders', element: <OrderHistory /> },
          ],
        },
        {
          element: <AdminRoute />,
          children: [
            { path: 'admin', element: <AdminDashboard /> },
            { path: 'admin/products', element: <AdminProducts /> },
            { path: 'admin/orders', element: <AdminOrders /> },
            { path: 'admin/users', element: <AdminUsers /> },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);
