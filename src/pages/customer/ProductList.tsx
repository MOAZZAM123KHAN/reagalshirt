import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import CustomerLayout from '../../components/layout/CustomerLayout';
import ProductCard from '../../components/products/ProductCard';
import ProductFilter from '../../components/products/ProductFilter';

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
  {
    _id: '5',
    name: 'Navy Blue Oxford Shirt',
    price: 49.99,
    image: 'https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Formal',
    isNew: false,
  },
  {
    _id: '6',
    name: 'Floral Print Shirt',
    price: 44.99,
    image: 'https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Printed',
    isNew: true,
  },
  {
    _id: '7',
    name: 'Black Dress Shirt',
    price: 54.99,
    image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Formal',
    isNew: false,
  },
  {
    _id: '8',
    name: 'Checkered Casual Shirt',
    price: 39.99,
    image: 'https://images.pexels.com/photos/9775016/pexels-photo-9775016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Casual',
    isNew: false,
  },
];

const filterOptions = {
  categories: ['All', 'Casual', 'Formal', 'Printed'],
  colors: ['White', 'Black', 'Blue', 'Red', 'Green', 'Yellow', 'Gray', 'Navy'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  priceRanges: [
    { min: 0, max: 25, label: 'Under $25' },
    { min: 25, max: 50, label: '$25 - $50' },
    { min: 50, max: 100, label: '$50 - $100' },
    { min: 100, max: Infinity, label: '$100 & Above' },
  ],
};

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceLowToHigh', label: 'Price: Low to High' },
  { value: 'priceHighToLow', label: 'Price: High to Low' },
];

const ProductList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(true);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('featured');
  const [appliedFilters, setAppliedFilters] = useState({
    category: queryParams.get('category') || undefined,
    color: undefined,
    size: undefined,
    priceRange: undefined,
  });

  useEffect(() => {
    // Function to fetch products from backend API with filters
    const fetchProducts = async () => {
      try {
        // In a real application, we would fetch from backend with filter params
        // const response = await axios.get('/api/products', { params: appliedFilters });
        // setProducts(response.data);
        
        // For now, manually filter the mock data
        let filteredProducts = [...mockProducts];
        
        if (appliedFilters.category && appliedFilters.category !== 'All') {
          filteredProducts = filteredProducts.filter(p => p.category === appliedFilters.category);
        }
        
        // Apply sorting
        switch (sortBy) {
          case 'newest':
            filteredProducts = filteredProducts.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
            break;
          case 'priceLowToHigh':
            filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'priceHighToLow':
            filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
            break;
          default:
            // Keep default order for 'featured'
            break;
        }
        
        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [appliedFilters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setAppliedFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <CustomerLayout>
      <div className="container-custom py-8 pt-24">
        {/* Page Title */}
        <div className="pb-6 border-b">
          <h1 className="text-3xl font-bold font-heading">Shirts</h1>
          <p className="text-gray-600 mt-2">
            {products.length} products available
          </p>
        </div>
        
        {/* Mobile Filter Button */}
        <div className="md:hidden my-4">
          <button
            onClick={() => setIsFilterSidebarOpen(true)}
            className="w-full flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-md"
          >
            <Filter size={18} />
            <span>Filter Products</span>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          {/* Sidebar Filter - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <ProductFilter
              options={filterOptions}
              appliedFilters={appliedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {/* Sort and View Options */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <SlidersHorizontal size={18} className="text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${
                    viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${
                    viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
            
            {/* Products */}
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {products.map(product => (
                  <div key={product._id}>
                    {viewMode === 'grid' ? (
                      <ProductCard product={product} />
                    ) : (
                      <div className="flex bg-white rounded-lg shadow overflow-hidden">
                        <div className="w-1/3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                            <p className="font-medium text-gray-900 mb-2">${product.price.toFixed(2)}</p>
                          </div>
                          <button className="btn btn-primary w-full sm:w-auto mt-2">
                            View Details
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Sidebar */}
      {isFilterSidebarOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
               onClick={() => setIsFilterSidebarOpen(false)}></div>
          
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    onClick={() => setIsFilterSidebarOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <span className="sr-only">Close panel</span>
                    <X size={20} />
                  </button>
                </div>
                
                <div className="px-4 py-4">
                  <ProductFilter
                    options={filterOptions}
                    appliedFilters={appliedFilters}
                    onFilterChange={handleFilterChange}
                  />
                </div>
                
                <div className="border-t px-4 py-4">
                  <button
                    onClick={() => setIsFilterSidebarOpen(false)}
                    className="w-full btn btn-primary"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </CustomerLayout>
  );
};

export default ProductList;