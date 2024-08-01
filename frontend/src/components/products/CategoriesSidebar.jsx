// components/CategoriesSidebar.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCategoriesThunk } from '../../features/categories/categorySlice';
import { FidgetSpinner } from 'react-loader-spinner';
import { RiMedicineBottleFill } from "react-icons/ri";
import { FaUserNurse, FaHeart, FaBaby, FaFirstAid, FaCapsules } from "react-icons/fa";
import { IoIosWoman, IoIosMan } from "react-icons/io";

const getIconForCategory = (name) => {
  switch (name) {
    case "Pharma":
      return <RiMedicineBottleFill className="text-white text-xl" />;
    case "Personal Care":
      return <FaUserNurse className="text-white text-xl" />;
    case "Medical Equipment":
      return <FaHeart className="text-white text-xl" />;
    case "Health & Wellness":
      return <FaCapsules className="text-white text-xl" />;
    case "Baby Care":
      return <FaBaby className="text-white text-xl" />;
    case "First Aid":
      return <FaFirstAid className="text-white text-xl" />;
    case "Women Health":
      return <IoIosWoman className="text-white text-xl" />;
    case "Nutrition":
      return <FaBaby className="text-white text-xl" />;
    case "Men Health":
      return <IoIosMan className="text-white text-xl" />;
    default:
      return null;
  }
};

const CategoriesSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const categories = useSelector((state) => state.category.categories);
  const status = useSelector((state) => state.category.status);
  const error = useSelector((state) => state.category.error);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  if (status === 'Loading') {
    return <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" />;
  }

  if (status === 'Failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li
            key={category._id}
            className={`flex flex-col items-center text-center p-1 mb-2 cursor-pointer rounded-lg hover:bg-primary-light ${
              new URLSearchParams(location.search).get('category') === category._id ? 'bg-primary-dark' : ''
            }`}
            onClick={() => handleCategoryClick(category._id)}
          >
            <div>
            <img
              src={(category.imageUrl)}
              alt={category._id}
              className="w-20 h-20 object-cover rounded-full"
            />
            <span className="text-xs">{category.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesSidebar;
