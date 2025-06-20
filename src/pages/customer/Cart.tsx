import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft, X } from 'lucide-react';
import CustomerLayout from '../../components/layout/CustomerLayout';
import { useCart } from '../../contexts/CartContext';
import { useUser } from '../../contexts/UserContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleApplyPromoCode = () => {
    setIsApplyingPromo(true);
    setPromoError('');
    
    // Mock promo code validation
    setTimeout(() => {
      if (promoCode.toUpperCase() === 'DISCOUNT10') {
        setPromoDiscount(totalPrice * 0.1);
      } else if (promoCode.toUpperCase() === 'FREESHIP') {
        // Just for show - no shipping cost in this demo
        setPromoDiscount(5);
      } else {
        setPromoError('Invalid promo code');
        setPromoDiscount(0);
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  // Calculate order summary
  const shipping = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + shipping + tax - promoDiscount;

  return (
    <CustomerLayout>
      <div className="container-custom py-8 pt-24">
        <h1 className="text-3xl font-bold font-heading mb-6">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-medium">
                    Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </h2>
                </div>
                
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={`${item._id}-${item.size}`} className="p-6 flex flex-col sm:flex-row">
                      <div className="sm:flex-shrink-0 mb-4 sm:mb-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>
                      <div className="sm:ml-6 sm:flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-base font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
                          </div>
                          <p className="text-base font-medium text-gray-900">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                              className="p-2 text-gray-600 hover:text-gray-800"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 text-center w-12">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                              className="p-2 text-gray-600 hover:text-gray-800"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-gray-500 hover:text-error-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="p-6 border-t flex justify-between items-center">
                  <button
                    onClick={clearCart}
                    className="text-sm text-gray-500 hover:text-error-500 transition-colors"
                  >
                    Clear cart
                  </button>
                  <Link
                    to="/products"
                    className="flex items-center text-primary-600 hover:text-primary-800 font-medium"
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-lg font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium">${totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Shipping</p>
                    <p className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Estimated Tax</p>
                    <p className="font-medium">${tax.toFixed(2)}</p>
                  </div>
                  
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-success-700">
                      <p className="flex items-center">
                        Discount
                        <button onClick={() => setPromoDiscount(0)} className="ml-2">
                          <X size={14} />
                        </button>
                      </p>
                      <p className="font-medium">-${promoDiscount.toFixed(2)}</p>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <p className="text-lg font-bold">Total</p>
                      <p className="text-lg font-bold">${finalTotal.toFixed(2)}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Including VAT
                    </p>
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      id="promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="input-field flex-grow"
                      placeholder="Enter code"
                    />
                    <button
                      onClick={handleApplyPromoCode}
                      disabled={isApplyingPromo || !promoCode}
                      className="btn btn-secondary flex-shrink-0"
                    >
                      {isApplyingPromo ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                  {promoError && (
                    <p className="mt-2 text-sm text-error-500">{promoError}</p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    Try "DISCOUNT10" for 10% off or "FREESHIP" for free shipping
                  </p>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full btn btn-primary py-3 flex items-center justify-center"
                >
                  Checkout <ArrowRight size={18} className="ml-2" />
                </button>
                
                <div className="mt-6 text-center text-xs text-gray-500">
                  <p>We accept</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <span className="bg-gray-200 p-2 rounded">Visa</span>
                    <span className="bg-gray-200 p-2 rounded">Mastercard</span>
                    <span className="bg-gray-200 p-2 rounded">PayPal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default Cart;