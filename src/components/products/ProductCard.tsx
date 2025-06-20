import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    isNew?: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleQuickAdd = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: 'M', // Default size
      quantity: 1
    });
  };

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden">
        {/* Product image with hover effect */}
        <Link to={`/products/${product._id}`}>
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
        
        {/* New badge */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-accent-500 text-white px-2 py-1 text-xs font-medium rounded">
            NEW
          </span>
        )}
        
        {/* Wishlist button */}
        <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm opacity-70 hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
        
        {/* Quick add button - appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-white bg-opacity-90 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={handleQuickAdd}
            className="w-full py-2 bg-primary-600 text-white text-sm font-medium rounded hover:bg-primary-700 transition-colors"
          >
            Quick Add
          </button>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-1">
          <Link to={`/products/${product._id}`} className="hover:text-primary-600 transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-xs text-gray-500 mb-2">{product.category}</p>
        <p className="font-medium text-gray-900">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;