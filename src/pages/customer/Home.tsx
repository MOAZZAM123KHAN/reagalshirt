import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CustomerLayout from '../../components/layout/CustomerLayout';
import ProductCard from '../../components/products/ProductCard';
import axios from 'axios';

// Temporary mock data for hero banners
const heroBanners = [
  {
    id: 1,
    title: 'Summer Collection 2025',
    subtitle: 'Express yourself with style',
    description: 'Discover our latest shirts designed for comfort and fashion.',
    ctaText: 'Shop Now',
    ctaLink: '/products',
    image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    colorTheme: 'bg-blue-50',
  },
  {
    id: 2,
    title: 'Formal Collection',
    subtitle: 'Elegance for every occasion',
    description: 'Premium formal shirts for meetings, events and special days.',
    ctaText: 'Explore',
    ctaLink: '/products?category=formal',
    image: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    colorTheme: 'bg-gray-100',
  },
];

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data until backend is implemented
  const mockProducts = [
    {
      _id: '1',
      name: 'Classic White Oxford Shirt',
      price: 49.99,
      image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'Formal',
      isNew: false,
    },
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

  useEffect(() => {
    // Function to fetch products from backend API
    const fetchProducts = async () => {
      try {
        // This would be the actual API call when backend is implemented
        // const response = await axios.get('/api/products/featured');
        // setFeaturedProducts(response.data);
        
        // Using mock data for now
        setFeaturedProducts(mockProducts);
        setNewArrivals(mockProducts.filter(p => p.isNew));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Auto rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % heroBanners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Categories for homepage
  const categories = [
    {
      name: 'Casual',
      image: 'https://images.pexels.com/photos/3775120/pexels-photo-3775120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/products?category=casual'
    },
    {
      name: 'Formal',
      image: 'https://images.pexels.com/photos/6975538/pexels-photo-6975538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/products?category=formal'
    },
    {
      name: 'Printed',
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '/products?category=printed'
    },
  ];

  return (
    <CustomerLayout>
      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-16">
        <div className={`transition-all duration-700 ease-in-out ${heroBanners[currentBanner].colorTheme}`}>
          <div className="container-custom py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="fade-in">
                <span className="inline-block mb-2 text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                  {heroBanners[currentBanner].subtitle}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                  {heroBanners[currentBanner].title}
                </h1>
                <p className="text-gray-600 mb-8 max-w-md">
                  {heroBanners[currentBanner].description}
                </p>
                <Link 
                  to={heroBanners[currentBanner].ctaLink} 
                  className="btn btn-primary"
                >
                  {heroBanners[currentBanner].ctaText}
                </Link>
              </div>
              <div className="relative">
                <img 
                  src={heroBanners[currentBanner].image} 
                  alt={heroBanners[currentBanner].title}
                  className="rounded-lg shadow-lg fade-in object-cover w-full h-[300px] md:h-[400px]"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Banner navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentBanner === index ? 'bg-primary-600 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Find the perfect shirt for every occasion in our curated collections
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to={category.link} className="group relative overflow-hidden rounded-lg shadow-md">
                <div className="aspect-w-1 aspect-h-1">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
                    <span className="text-white flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Shop Now <ArrowRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold font-heading">Featured Products</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-800 flex items-center font-medium">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block mb-2 text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              Just Landed
            </span>
            <h2 className="text-3xl font-bold font-heading mb-4">New Arrivals</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Check out our latest styles and designs fresh off the production line
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Testimonials/Features */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">Why Choose ShopMyShirt</h2>
            <p className="text-gray-300 max-w-xl mx-auto">
              We pride ourselves on quality, style and customer satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-primary-800 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary-700 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-300">
                Our shirts are made from the finest materials for comfort and durability
              </p>
            </div>
            
            <div className="text-center p-6 bg-primary-800 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary-700 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-300">
                Free shipping on all orders with quick and reliable delivery
              </p>
            </div>
            
            <div className="text-center p-6 bg-primary-800 rounded-lg">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary-700 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-300">
                Multiple secure payment options for your convenience and security
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16">
        <div className="container-custom">
          <div className="bg-accent-50 rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold font-heading mb-4">Join Our Community</h2>
              <p className="text-gray-700 mb-8">
                Subscribe to our newsletter to get 10% off your first order and stay updated on new arrivals and exclusive offers
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow input-field"
                />
                <button className="btn btn-primary sm:flex-shrink-0">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CustomerLayout>
  );
};

export default Home;