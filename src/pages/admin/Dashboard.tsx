import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, ShoppingBag, CreditCard, TrendingUp, Package, Clock } from 'lucide-react';

// Mock data for dashboard
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
  { name: 'Aug', sales: 4000 },
  { name: 'Sep', sales: 5000 },
  { name: 'Oct', sales: 6000 },
  { name: 'Nov', sales: 7000 },
  { name: 'Dec', sales: 8000 },
];

const revenueData = [
  { name: 'Jan', revenue: 9000 },
  { name: 'Feb', revenue: 7000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 6500 },
  { name: 'May', revenue: 4800 },
  { name: 'Jun', revenue: 5800 },
  { name: 'Jul', revenue: 8200 },
  { name: 'Aug', revenue: 9500 },
  { name: 'Sep', revenue: 11000 },
  { name: 'Oct', revenue: 13000 },
  { name: 'Nov', revenue: 15000 },
  { name: 'Dec', revenue: 18000 },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', date: '2025-05-10', total: 149.99, status: 'Delivered' },
  { id: 'ORD-002', customer: 'Jane Smith', date: '2025-05-09', total: 89.99, status: 'Processing' },
  { id: 'ORD-003', customer: 'Robert Johnson', date: '2025-05-08', total: 199.99, status: 'Shipped' },
  { id: 'ORD-004', customer: 'Emily Wilson', date: '2025-05-07', total: 129.99, status: 'Pending' },
  { id: 'ORD-005', customer: 'Michael Brown', date: '2025-05-06', total: 79.99, status: 'Delivered' },
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      // In a real application, we'd fetch from backend
      // const response = await axios.get('/api/admin/dashboard');
      
      // Mock data for now
      setTimeout(() => {
        setStats({
          totalSales: 24680,
          totalOrders: 342,
          totalCustomers: 189,
          totalProducts: 56,
        });
        setLoading(false);
      }, 1000);
    };
    
    fetchDashboardData();
  }, []);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  // Status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-success-50 text-success-700';
      case 'Shipped':
        return 'bg-primary-50 text-primary-700';
      case 'Processing':
        return 'bg-warning-50 text-warning-700';
      case 'Pending':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="admin-card flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-800 mr-4">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalSales)}</p>
              </div>
            </div>
            
            <div className="admin-card flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
                <Package size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
            
            <div className="admin-card flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
              </div>
            </div>
            
            <div className="admin-card flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-800 mr-4">
                <ShoppingBag size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Sales Chart */}
            <div className="admin-card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Sales Overview</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setTimeRange('weekly')}
                    className={`px-3 py-1 text-sm rounded-md ${
                      timeRange === 'weekly'
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setTimeRange('monthly')}
                    className={`px-3 py-1 text-sm rounded-md ${
                      timeRange === 'monthly'
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setTimeRange('yearly')}
                    className={`px-3 py-1 text-sm rounded-md ${
                      timeRange === 'yearly'
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={salesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} Orders`, 'Sales']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Bar dataKey="sales" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Revenue Chart */}
            <div className="admin-card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Revenue Analytics</h2>
                <div className="flex items-center text-green-600">
                  <TrendingUp size={18} className="mr-1" />
                  <span className="text-sm font-medium">+12.5%</span>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={revenueData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), 'Revenue']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Recent Orders */}
          <div className="admin-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
              <Link 
                to="/admin/orders" 
                className="text-primary-600 hover:text-primary-800 text-sm font-medium"
              >
                View all
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          to={`/admin/orders/${order.id}`} 
                          className="text-primary-600 hover:text-primary-900"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;