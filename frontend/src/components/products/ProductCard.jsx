import { Button } from 'flowbite-react';
import React from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {HiShoppingCart} from 'react-icons/hi'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/products/${product._id}`)
  }
  return (
    <div
      key={product._id}
      className="relative flex flex-col gap-2  bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-40 object-contain rounded-t-lg lg:h-60 "
        onClick={handleClick}
      />
      <div className="flex-1 p-2">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 ">
          {product.description}
        </p>
      </div>
      <div className="flex justify-between items-center p-4 gap-4">
        <p className="text-sm md:text-base text-primary font-bold ">
        ₹{product.price.toFixed(1)}
        </p>
        <Button gradientMonochrome="success" className="!p-0 lg:p-1  buy-now">
        <FaCartPlus className="mr-2 h-5 w-5 !items-center" />
        Buy now
      </Button>
      </div>
    </div>
  );
};

export default ProductCard;
