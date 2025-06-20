import { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface FilterOptions {
  categories: string[];
  colors: string[];
  sizes: string[];
  priceRanges: { min: number; max: number; label: string }[];
}

interface ProductFilterProps {
  options: FilterOptions;
  appliedFilters: {
    category?: string;
    color?: string;
    size?: string;
    priceRange?: string;
  };
  onFilterChange: (filterType: string, value: string | null) => void;
}

const ProductFilter = ({ options, appliedFilters, onFilterChange }: ProductFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const getActiveFilterCount = () => {
    return Object.values(appliedFilters).filter(Boolean).length;
  };

  const clearAllFilters = () => {
    Object.keys(appliedFilters).forEach(key => {
      onFilterChange(key, null);
    });
  };

  return (
    <div className="bg-white shadow-sm rounded-md">
      {/* Mobile Filter Button */}
      <div className="md:hidden p-4 border-b">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center">
            <Filter size={18} className="mr-2" />
            <span className="font-medium">Filters</span>
            {getActiveFilterCount() > 0 && (
              <span className="ml-2 bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <span className="text-sm text-primary-600">
            {isFilterOpen ? 'Hide' : 'Show'}
          </span>
        </button>
      </div>

      {/* Filter Content - Always visible on desktop, toggleable on mobile */}
      <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-medium">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary-600 hover:text-primary-800"
            >
              Clear All
            </button>
          )}
        </div>
        
        {/* Categories */}
        <div className="p-4 border-b">
          <h4 className="font-medium mb-3">Category</h4>
          <div className="space-y-2">
            {options.categories.map(category => (
              <div key={category} className="flex items-center">
                <input
                  type="radio"
                  id={`category-${category}`}
                  name="category"
                  checked={appliedFilters.category === category}
                  onChange={() => onFilterChange('category', category)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                  {category}
                </label>
                {appliedFilters.category === category && (
                  <button
                    onClick={() => onFilterChange('category', null)}
                    className="ml-auto text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Colors */}
        <div className="p-4 border-b">
          <h4 className="font-medium mb-3">Color</h4>
          <div className="flex flex-wrap gap-2">
            {options.colors.map(color => {
              const isActive = appliedFilters.color === color;
              const colorClass = getColorClass(color);
              
              return (
                <button
                  key={color}
                  onClick={() => onFilterChange('color', isActive ? null : color)}
                  className={`w-8 h-8 rounded-full ${colorClass} flex items-center justify-center ${
                    isActive ? 'ring-2 ring-offset-2 ring-primary-500' : ''
                  }`}
                  title={color}
                >
                  {isActive && <span className="text-white">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Sizes */}
        <div className="p-4 border-b">
          <h4 className="font-medium mb-3">Size</h4>
          <div className="flex flex-wrap gap-2">
            {options.sizes.map(size => {
              const isActive = appliedFilters.size === size;
              
              return (
                <button
                  key={size}
                  onClick={() => onFilterChange('size', isActive ? null : size)}
                  className={`px-3 py-1 border rounded-md text-sm ${
                    isActive
                      ? 'bg-primary-100 border-primary-500 text-primary-800'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Price Ranges */}
        <div className="p-4">
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="space-y-2">
            {options.priceRanges.map(range => (
              <div key={range.label} className="flex items-center">
                <input
                  type="radio"
                  id={`price-${range.label}`}
                  name="priceRange"
                  checked={appliedFilters.priceRange === range.label}
                  onChange={() => onFilterChange('priceRange', range.label)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor={`price-${range.label}`} className="ml-2 text-sm text-gray-700">
                  {range.label}
                </label>
                {appliedFilters.priceRange === range.label && (
                  <button
                    onClick={() => onFilterChange('priceRange', null)}
                    className="ml-auto text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get Tailwind color classes
const getColorClass = (color: string): string => {
  const colorMap: Record<string, string> = {
    'White': 'bg-white border border-gray-300',
    'Black': 'bg-black',
    'Red': 'bg-red-500',
    'Blue': 'bg-blue-500',
    'Green': 'bg-green-500',
    'Yellow': 'bg-yellow-400',
    'Gray': 'bg-gray-500',
    'Navy': 'bg-indigo-900',
    'Purple': 'bg-purple-500',
    'Pink': 'bg-pink-500',
  };
  
  return colorMap[color] || 'bg-gray-300';
};

export default ProductFilter;