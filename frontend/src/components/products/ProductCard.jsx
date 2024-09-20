// components/ProductCard.jsx
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
      className="relative flex flex-col gap-2 bg-gradient-to-b from-green-700 to-blue-800 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-40 object-contain rounded-t-lg lg:h-60 pt-4"
        onClick={handleClick}
      />
      <div className="flex-1 p-4 text-gray-100">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm">{product.description}</p>
        <p className="text-xl font-bold text-yellow-400 mt-2">₹{product.price}</p>
      </div>
      <div className="flex justify-between items-center p-4">
        {inCart ? (
          <div className="flex items-center gap-2">
            <button 
              onClick={handleDecreaseQuantity} 
              className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 transition duration-150"
            >
              <FaMinus />
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button 
              onClick={handleIncreaseCart} 
              className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition duration-150"
            >
              <FaPlus />
            </button>
          </div>
        ) : (
          <Button gradientMonochrome="success" className="!p-0 lg:p-1 buy-now" onClick={handleAddToCart}>
            <FaCartPlus className="mr-2" />
            Buy now
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
