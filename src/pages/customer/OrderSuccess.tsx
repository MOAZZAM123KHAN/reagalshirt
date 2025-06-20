import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import CustomerLayout from '../../components/layout/CustomerLayout';

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <CustomerLayout>
      <div className="container-custom py-16 pt-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-success-500 mx-auto" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            
            <p className="text-gray-600 mb-8">
              Thank you for your order. We've received your order and will begin processing it right away.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Package className="w-5 h-5 text-primary-600 mr-2" />
                <span className="font-medium text-gray-900">Order #{id}</span>
              </div>
              
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to your email address.
              </p>
            </div>
            
            <div className="space-y-4">
              <Link
                to="/orders"
                className="block w-full btn btn-primary py-3"
              >
                View Order Details
              </Link>
              
              <Link
                to="/products"
                className="block w-full btn btn-secondary py-3"
              >
                Continue Shopping
              </Link>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                What happens next?
              </h2>
              
              <div className="grid gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 mb-1">Order Processing</div>
                  <p className="text-sm text-gray-600">
                    We'll begin processing your order and send you updates via email.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 mb-1">Shipping</div>
                  <p className="text-sm text-gray-600">
                    Once your order ships, we'll send you tracking information.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 mb-1">Delivery</div>
                  <p className="text-sm text-gray-600">
                    Standard delivery takes 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-sm text-gray-500">
              Need help? <a href="#" className="text-primary-600 hover:text-primary-800">Contact our support team</a>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default OrderSuccess;