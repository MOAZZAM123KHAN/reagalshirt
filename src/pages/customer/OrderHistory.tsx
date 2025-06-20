import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import CustomerLayout from '../../components/layout/CustomerLayout';

const OrderHistory = () => {
  // Mock orders data - in a real app this would come from an API
  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2025-03-15',
      status: 'Delivered',
      total: 149.99,
      items: [
        { name: 'Classic White Oxford Shirt', quantity: 2, price: 49.99 },
        { name: 'Blue Denim Shirt', quantity: 1, price: 39.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2025-03-10',
      status: 'Processing',
      total: 89.99,
      items: [
        { name: 'Striped Business Shirt', quantity: 1, price: 54.99 },
        { name: 'Summer Linen Shirt', quantity: 1, price: 45.99 }
      ]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-success-50 text-success-700';
      case 'Processing':
        return 'bg-warning-50 text-warning-700';
      case 'Cancelled':
        return 'bg-error-50 text-error-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <CustomerLayout>
      <div className="container-custom py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History</h1>
          
          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <Package size={64} className="text-gray-300" />
              </div>
              <h2 className="text-xl font-medium mb-2">No orders yet</h2>
              <p className="text-gray-600 mb-6">
                When you place an order, it will appear here.
              </p>
              <Link to="/products" className="btn btn-primary">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-200 mt-6 pt-6">
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {order.items.map((item, index) => (
                            <li key={index} className="py-6 flex">
                              <div className="flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h4>{item.name}</h4>
                                    <p className="ml-4">${item.price.toFixed(2)}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Quantity: {item.quantity}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 mt-6 pt-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>${order.total.toFixed(2)}</p>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Link
                          to={`/orders/${order.id}`}
                          className="flex items-center text-primary-600 hover:text-primary-800"
                        >
                          View Order Details
                          <ChevronRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default OrderHistory;