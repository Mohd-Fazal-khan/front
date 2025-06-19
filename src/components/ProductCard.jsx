import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  
  console.log("Product data:", product);
  
  if (!product) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
  <Link to={`/properties/${product._id}`}>
   
    <div className="relative aspect-[4/3] sm:aspect-[3/2] md:aspect-video">
      <img 
        src={product.images?.[0] || 'placeholder-image-url'} 
        alt={product.title} 
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>

   
    <div className="p-3 sm:p-4">
      <h3 className="text-base sm:text-lg font-semibold truncate">{product.title}</h3>
      <p className="text-sm sm:text-base text-gray-600 truncate">{product.location}</p>
      <p className="text-gray-800 font-bold mt-1 sm:mt-2 text-sm sm:text-base">
        ${product.price} <span className="font-normal text-gray-600">/ night</span>
      </p>
    </div>
  </Link>
</div>

  );
};

export default ProductCard;
