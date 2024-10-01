import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItemsThunk,
  removeItemFromCartThunk,
  clearCart,
  updateCartItemThunk,
} from "../../features/carts/cartSlice";
import { Button } from "flowbite-react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FidgetSpinner } from "react-loader-spinner";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.userInfo?._id);
  const cartItems = useSelector((state) => state.cart.items || []);
  const status = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    if (userId) {
      dispatch(getCartItemsThunk(userId));
    }
  }, [dispatch, userId]);

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCartItemThunk({ productId, quantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeItemFromCartThunk({ productId })).then(() => {
      dispatch(getCartItemsThunk());
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart(userId));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (status === "loading") {
    return (
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
      />
    );
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="bg-gradient-to-b from-green-700 to-blue-800 p-6 w-full mx-auto mt-1 pb-20 min-h-screen overflow-y-scroll">
      <h2 className="text-3xl font-bold text-white mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-white">Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="flex flex-col gap-4 items-center justify-between bg-gradient-to-b from-green-800 to-blue-700 p-4 rounded-lg shadow-lg mb-4 text-white"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId.imageUrl[0]}
                    alt={item.productId.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold">{item.productId.name}</h3>
                    <p className="text-sm">{item.productId.description}</p>
                    <p className="text-sm font-bold">₹{item.productId.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.productId._id,
                        item.quantity > 1 ? item.quantity - 1 : 0
                      )
                    }
                    className="bg-yellow-400 p-2 rounded hover:bg-yellow-500 transition"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.productId._id, item.quantity + 1)
                    }
                    className="bg-yellow-400 p-2 rounded hover:bg-yellow-500 transition"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.productId._id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-bold text-white">Total: ₹{totalAmount.toFixed(2)}</p>
            <div className="flex gap-4">
              <Button
                gradientMonochrome="danger"
                onClick={handleClearCart}
                className="hover:shadow-lg transition"
              >
                Clear Cart
              </Button>
              <Button
                gradientMonochrome="success"
                onClick={handleCheckout}
                className="hover:shadow-lg transition"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
