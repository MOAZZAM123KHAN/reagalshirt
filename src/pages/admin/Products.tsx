import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Trash2, X, Upload, Image } from 'lucide-react';

// Mock product data
const mockProducts = [
  {
    _id: '1',
    name: 'Classic White Oxford Shirt',
    price: 49.99,
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Formal',
    inStock: true,
    stock: 24,
  },
  {
    _id: '2',
    name: 'Casual Blue Denim Shirt',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Casual',
    inStock: true,
    stock: 18,
  },
  {
    _id: '3',
    name: 'Striped Business Shirt',
    price: 54.99,
    image: 'https://images.pexels.com/photos/3782214/pexels-photo-3782214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Formal',
    inStock: true,
    stock: 15,
  },
  {
    _id: '4',
    name: 'Summer Linen Shirt',
    price: 45.99,
    image: 'https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Casual',
    inStock: false,
    stock: 0,
  },
  {
    _id: '5',
    name: 'Navy Blue Oxford Shirt',
    price: 49.99,
    image: 'https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Formal',
    inStock: true,
    stock: 12,
  },
  {
    _id: '6',
    name: 'Floral Print Shirt',
    price: 44.99,
    image: 'https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Printed',
    inStock: true,
    stock: 7,
  },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  
  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Casual',
    stock: '',
    sizes: ['S', 'M', 'L', 'XL'],
    image: null,
  });

  useEffect(() => {
    // Simulate API call to fetch products
    const fetchProducts = async () => {
      // In a real application, we'd fetch from backend
      // const response = await axios.get('/api/admin/products');
      
      // Mock data for now
      setTimeout(() => {
        setProducts(mockProducts);
        setLoading(false);
      }, 1000);
    };
    
    fetchProducts();
  }, []);

  // Filtered products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  // Handle size checkbox changes
  const handleSizeChange = (size) => {
    setNewProduct(prev => {
      if (prev.sizes.includes(size)) {
        return { ...prev, sizes: prev.sizes.filter(s => s !== size) };
      } else {
        return { ...prev, sizes: [...prev.sizes, size] };
      }
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewProduct(prev => ({ ...prev, image: e.target.files[0] }));
    }
  };

  // Handle add product form submission
  const handleAddProduct = (e) => {
    e.preventDefault();
    
    // In a real application, we'd send to backend
    // const formData = new FormData();
    // Object.keys(newProduct).forEach(key => formData.append(key, newProduct[key]));
    // await axios.post('/api/admin/products', formData);
    
    // For demo, just add to state
    const newProductId = (products.length + 1).toString();
    const productToAdd = {
      _id: newProductId,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      image: newProduct.image ? URL.createObjectURL(newProduct.image) : 'https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: newProduct.category,
      inStock: parseInt(newProduct.stock) > 0,
      stock: parseInt(newProduct.stock),
    };
    
    setProducts([...products, productToAdd]);
    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: 'Casual',
      stock: '',
      sizes: ['S', 'M', 'L', 'XL'],
      image: null,
    });
  };

  // Handle product deletion
  const confirmDeleteProduct = () => {
    if (!productToDelete) return;
    
    // In a real application, we'd send to backend
    // await axios.delete(`/api/admin/products/${productToDelete}`);
    
    // For demo, just remove from state
    setProducts(products.filter(product => product._id !== productToDelete));
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 sm:mt-0 btn btn-primary flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Add Product
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          
          <div className="w-full md:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full appearance-none focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="All">All Categories</option>
                <option value="Casual">Casual</option>
                <option value="Formal">Formal</option>
                <option value="Printed">Printed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Products Table */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
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
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No products found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="h-12 w-12 rounded-md object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">ID: {product._id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.stock}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.inStock 
                            ? 'bg-success-50 text-success-700' 
                            : 'bg-error-50 text-error-700'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => {
                            setProductToDelete(product._id);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-error-500 hover:text-error-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Add New Product</h3>
                  <button 
                    onClick={() => setIsAddModalOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleAddProduct}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 input-field"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={newProduct.description}
                        onChange={handleInputChange}
                        className="mt-1 input-field"
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Price ($) *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          id="price"
                          name="price"
                          value={newProduct.price}
                          onChange={handleInputChange}
                          required
                          className="mt-1 input-field"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                          Stock Quantity *
                        </label>
                        <input
                          type="number"
                          id="stock"
                          name="stock"
                          value={newProduct.stock}
                          onChange={handleInputChange}
                          required
                          className="mt-1 input-field"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        className="mt-1 input-field"
                      >
                        <option value="Casual">Casual</option>
                        <option value="Formal">Formal</option>
                        <option value="Printed">Printed</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Sizes
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                          <div key={size} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`size-${size}`}
                              checked={newProduct.sizes.includes(size)}
                              onChange={() => handleSizeChange(size)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`size-${size}`} className="ml-2 text-sm text-gray-700">
                              {size}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Image
                      </label>
                      <div className="flex items-center">
                        <div className="mr-4">
                          {newProduct.image ? (
                            <img
                              src={URL.createObjectURL(newProduct.image)}
                              alt="Product preview"
                              className="h-24 w-24 object-cover rounded-md"
                            />
                          ) : (
                            <div className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                              <Image className="h-8 w-8 text-gray-300" />
                            </div>
                          )}
                        </div>
                        <label className="btn btn-secondary flex items-center cursor-pointer">
                          <Upload size={18} className="mr-2" />
                          Upload Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Product
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this product? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmDeleteProduct}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;