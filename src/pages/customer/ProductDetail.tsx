import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Star, Truck, RotateCcw, ShieldCheck, Minus, Plus, Check } from 'lucide-react';
import CustomerLayout from '../../components/layout/CustomerLayout';
import ProductCard from '../../components/products/ProductCard';
import { useCart } from '../../contexts/CartContext';

// Mock product data
const product = {
  _id: '1',
  name: 'Classic White Oxford Shirt',
  price: 49.99,
  description: 'A timeless white Oxford shirt crafted from premium cotton fabric. Features a classic button-down collar, comfortable regular fit, and versatile design suitable for both formal and casual occasions.',
  images: [
    'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ],
  category: 'Formal',
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['White', 'Blue', 'Black'],
  inStock: true,
  rating: 4.8,
  reviewCount: 124,
  features: [
    '100% Premium Cotton',
    'Button-down collar',
    'Regular fit',
    'Machine washable',
  ],
};

// Mock related products
const relatedProducts = [
  {
    _id: '2',
    name: 'Casual Blue Denim Shirt',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Casual',
    isNew: true,
  },
  {
    _id: '3',
    name: 'Striped Business Shirt',
    price: 54.99,
    image: 'https://images.pexels.com/photos/3782214/pexels-photo-3782214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Formal',
    isNew: false,
  },
  {
    _id: '4',
    name: 'Summer Linen Shirt',
    price: 45.99,
    image: 'https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Casual',
    isNew: true,
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('White');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity,
    });
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Get color class for color options
  const getColorClass = (color) => {
    const colorMap = {
      'White': 'bg-white border border-gray-300',
      'Black': 'bg-black',
      'Blue': 'bg-blue-500',
      'Red': 'bg-red-500',
      'Green': 'bg-green-500',
      'Yellow': 'bg-yellow-400',
      'Gray': 'bg-gray-500',
    };
    
    return colorMap[color] || 'bg-gray-300';
  };

  return (
    <CustomerLayout>
      <div className="container-custom py-8 pt-24">
        {/* Breadcrumbs */}
        <nav className="flex mb-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/products" className="hover:text-primary-600">Shirts</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900">{product.name}</span>
        </nav>
        
        {/* Product Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-1 aspect-h-1 overflow-hidden rounded-md ${
                    selectedImage === index 
                      ? 'ring-2 ring-primary-500' 
                      : 'ring-1 ring-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold font-heading tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              
              <div className="mt-2">
                <p className="text-3xl tracking-tight text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              
              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={rating}
                      className={`h-5 w-5 ${
                        product.rating > rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="ml-3 text-sm text-gray-500">
                  {product.rating} ({product.reviewCount} reviews)
                </p>
              </div>
            </div>
            
            {/* Product options */}
            <div className="mt-6">
              {/* Color selector */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <div className="mt-2 flex space-x-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-8 h-8 rounded-full ${getColorClass(color)} ${
                        selectedColor === color
                          ? 'ring-2 ring-offset-2 ring-primary-500'
                          : ''
                      }`}
                      aria-label={color}
                    >
                      {selectedColor === color && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check className={`h-4 w-4 ${color === 'White' ? 'text-gray-900' : 'text-white'}`} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <button className="text-sm font-medium text-primary-600 hover:text-primary-500">
                    Size guide
                  </button>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-4 border rounded-md text-sm font-medium ${
                        selectedSize === size
                          ? 'bg-primary-600 border-primary-600 text-white'
                          : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity selector */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                <div className="mt-2 flex">
                  <button
                    onClick={decreaseQuantity}
                    className="p-2 border border-r-0 rounded-l-md"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="p-2 w-16 text-center border-t border-b"
                  />
                  <button
                    onClick={increaseQuantity}
                    className="p-2 border border-l-0 rounded-r-md"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Add to cart button */}
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn btn-primary py-3"
                >
                  Add to Cart
                </button>
                <button className="flex-1 btn bg-gray-900 text-white hover:bg-black focus:ring-gray-500 py-3">
                  Buy Now
                </button>
              </div>
            </div>
            
            {/* Product benefits */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Truck size={20} className="text-gray-500 mr-3" />
                  <p className="text-sm text-gray-600">Free shipping over $50</p>
                </div>
                <div className="flex items-center">
                  <RotateCcw size={20} className="text-gray-500 mr-3" />
                  <p className="text-sm text-gray-600">Free 30-day returns</p>
                </div>
                <div className="flex items-center">
                  <ShieldCheck size={20} className="text-gray-500 mr-3" />
                  <p className="text-sm text-gray-600">2-year warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'description'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`py-4 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'features'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews ({product.reviewCount})
              </button>
            </nav>
          </div>
          
          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700">{product.description}</p>
                <p className="mt-4 text-gray-700">
                  This versatile shirt is perfect for everyday wear, business meetings, or special occasions. The premium cotton fabric provides exceptional comfort and breathability, while the classic design ensures timeless style.
                </p>
                <p className="mt-4 text-gray-700">
                  Easy to care for and built to last, this shirt maintains its shape and color even after multiple washes. Pair with your favorite trousers or jeans for a polished look that transitions seamlessly from day to night.
                </p>
              </div>
            )}
            
            {activeTab === 'features' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Product Features</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                  <li>Reinforced buttons for durability</li>
                  <li>Chest pocket with logo detail</li>
                  <li>Curved hem for modern look</li>
                  <li>Available in multiple colors</li>
                </ul>
                
                <div className="mt-6">
                  <h4 className="text-base font-medium mb-2">Care Instructions</h4>
                  <p className="text-gray-700">
                    Machine wash cold with similar colors. Tumble dry low. Iron on medium heat if needed. Do not bleach.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <Star
                        key={rating}
                        className={`h-5 w-5 ${
                          product.rating > rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="ml-3 text-gray-900">
                    <span className="font-medium">{product.rating}</span> out of 5 stars ({product.reviewCount} reviews)
                  </p>
                </div>
                
                <div className="space-y-6">
                  {/* Sample reviews */}
                  <div className="border-b pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <Star
                            key={rating}
                            className={`h-4 w-4 ${
                              5 > rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="ml-2 text-sm font-medium text-gray-900">John D.</p>
                      <p className="ml-auto text-sm text-gray-500">2 months ago</p>
                    </div>
                    <h4 className="text-base font-medium mb-2">Perfect fit and great quality</h4>
                    <p className="text-gray-700 text-sm">
                      I'm extremely happy with this purchase. The shirt fits perfectly and the quality is excellent. The material feels premium and it's very comfortable to wear all day.
                    </p>
                  </div>
                  
                  <div className="border-b pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <Star
                            key={rating}
                            className={`h-4 w-4 ${
                              4 > rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="ml-2 text-sm font-medium text-gray-900">Sarah M.</p>
                      <p className="ml-auto text-sm text-gray-500">1 month ago</p>
                    </div>
                    <h4 className="text-base font-medium mb-2">Great shirt, slightly large</h4>
                    <p className="text-gray-700 text-sm">
                      The quality of this shirt is outstanding. However, I found it to run a bit large. I would recommend sizing down if you prefer a more fitted look. Otherwise, it's perfect!
                    </p>
                  </div>
                  
                  <button className="btn btn-secondary w-full">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-heading">You may also like</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-800 flex items-center font-medium">
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default ProductDetail;