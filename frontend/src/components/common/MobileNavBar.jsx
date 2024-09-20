import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaVials, FaUserMd, FaHome, FaShoppingCart } from 'react-icons/fa';
import { MdLocalPharmacy } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { getCartItemsThunk } from '../../features/carts/cartSlice'; 

const MobileNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token) {
      dispatch(getCartItemsThunk());
    }
  }, [dispatch, token]);



  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);


  const handleNavigation = (path) => {
    navigate(path);
    setActiveButton(path);
  };

  const getButtonClass = (path) => (
    activeButton === path ? 'text-light ' : 'text-primary'
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-max bg-white flex justify-around items-center h-16 md:hidden border-t border-light">
      <button onClick={() => handleNavigation('/products?category=66a97902f95469fc6db5a9f0')} className={`flex flex-col items-center ${getButtonClass('/products?category=66a97902f95469fc6db5a9f0')}`}>
        <MdLocalPharmacy className="text-2xl" />
        <span className="text-xs">Products</span>
      </button>
      <button onClick={() => handleNavigation('/labs')} className={`flex flex-col items-center ${getButtonClass('/labs')}`}>
        <FaVials className="text-2xl" />
        <span className="text-xs">Labs</span>
      </button>
      <button onClick={() => handleNavigation('/')} className={`flex flex-col items-center ${getButtonClass('/')}`}>
        <FaHome className="text-2xl" />
        <span className="text-xs">Home</span>
      </button>
      <button onClick={() => handleNavigation('/profile')} className={`flex flex-col items-center ${getButtonClass('/profile')}`}>
        <FaUser className="text-2xl" />
        <span className="text-xs">Profile</span>
      </button>
      <button onClick={() => handleNavigation('/specialty/Gastroenterology')} className={`flex flex-col items-center ${getButtonClass('/specialty/Gastroenterology')}`}>
        <FaUserMd className="text-2xl" />
        <span className="text-xs">Doctors</span>
      </button>
      <button onClick={() => handleNavigation('/cart')} className={`flex flex-col items-center ${getButtonClass('/cart')}`}>
        <div className="relative flex items-center">
          <FaShoppingCart className="text-2xl" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </div>
        <span className="text-xs">Cart</span>
      </button>
    </div>
  );
};

export default MobileNavBar;
