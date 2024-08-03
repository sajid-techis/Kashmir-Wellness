import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaVials, FaUserMd, FaThLarge, FaHome } from 'react-icons/fa';
import { MdLocalPharmacy } from "react-icons/md";

const MobileNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);

  const handleNavigation = (path) => {
    navigate(path);
    setActiveButton(path);
  };

  const getButtonClass = (path) => (
    activeButton === path ? 'text-primary' : 'text-black'
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white flex justify-around items-center h-16 md:hidden border-t border-black">
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
      <button onClick={() => handleNavigation('/specialty/Gastroenterology')} className={`flex flex-col items-center ${getButtonClass('/specialty/Pediatrics')}`}>
        <FaUserMd className="text-2xl" />
        <span className="text-xs">Doctors</span>
      </button>
    </div>
  );
};

export default MobileNavBar;
