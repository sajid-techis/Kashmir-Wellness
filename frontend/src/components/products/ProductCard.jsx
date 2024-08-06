import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FaCartPlus, FaMinus, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItemToCartThunk, updateCartItemThunk, removeItemFromCartThunk, getCartItemsThunk } from '../../features/carts/cartSlice';

const ProductCard = ({ product }) => {
  const { _id } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.user);
  const items = useSelector((state) => state.cart.items);
  const [quantity, setQuantity] = useState(0);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const cartItem = items.find((item) => item.productId._id === _id);
    if (cartItem) {
      setInCart(true);
      setQuantity(cartItem.quantity);
    } else {
      setInCart(false);
      setQuantity(0);
    }
  }, [items, _id]);

  const handleAddToCart = async () => {
    if (!token) {
      navigate('/login');
    } else {
      await dispatch(addItemToCartThunk({ productId: _id, quantity: 1 })).unwrap();
      dispatch(getCartItemsThunk());
      setQuantity(1);
      setInCart(true);
    }
  };

  const handleIncreaseCart = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    await dispatch(updateCartItemThunk({ productId: _id, quantity: newQuantity })).unwrap();
  };

  const handleDecreaseQuantity = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      await dispatch(updateCartItemThunk({ productId: _id, quantity: newQuantity })).unwrap();
    } else {
      await dispatch(updateCartItemThunk({ productId: _id })).unwrap();
      setQuantity(0);
      setInCart(false);
    }
  };

  const handleClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div
      key={product._id}
      className="relative flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-40 object-contain rounded-t-lg lg:h-60"
        onClick={handleClick}
      />
      <div className="flex-1 p-2">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-gray-600">
          {product.description}
        </p>
      </div>
      <div className="flex justify-between items-center p-4 gap-4">
        <p className="text-sm md:text-base text-primary font-bold">
          ₹{product.price}
        </p>
        {inCart ? (
         <div className="flex items-center gap-2 p-2">
         <button 
           onClick={handleDecreaseQuantity} 
           className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-lg border border-gray-300 shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition ease-in-out duration-150"
         >
           <FaMinus className="h-5 w-5" />
         </button>
         <span className="text-lg font-semibold text-gray-800">{quantity}</span>
         <button 
           onClick={handleIncreaseCart} 
           className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-lg border border-gray-300 shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400 transition ease-in-out duration-150"
         >
           <FaPlus className="h-5 w-5" />
         </button>
       </div>
            
        ) : (
          <Button gradientMonochrome="success" className="!p-0 lg:p-1 buy-now" onClick={handleAddToCart}>
            <FaCartPlus className="mr-2 h-5 w-5 !items-center" />
            Buy now
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
