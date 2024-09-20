// components/Categories.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategoriesThunk } from "../../features/categories/categorySlice";
import { FidgetSpinner } from "react-loader-spinner";
import { RiMedicineBottleFill } from "react-icons/ri";
import { FaUserNurse, FaHeart, FaBaby, FaFirstAid } from "react-icons/fa";
import { FaCapsules } from "react-icons/fa6";
import { IoIosWoman, IoIosMan } from "react-icons/io";

const getIconForCategory = (name) => {
  switch (name) {
    case "Pharma":
      return <RiMedicineBottleFill className="text-white text-3xl" />;
    case "Personal Care":
      return <FaUserNurse className="text-white text-3xl" />;
    case "Medical Equipment":
      return <FaHeart className="text-white text-3xl" />;
    case "Health & Wellness":
      return <FaCapsules className="text-white text-3xl" />;
    case "Baby Care":
      return <FaBaby className="text-white text-3xl" />;
    case "First Aid":
      return <FaFirstAid className="text-white text-3xl" />;
    case "Women Health":
      return <IoIosWoman className="text-white text-3xl" />;
    case "Nutrition":
      return <FaBaby className="text-white text-3xl" />;
    case "Men Health":
      return <IoIosMan className="text-white text-3xl" />;
    default:
      return null;
  }
};

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.category.categories);
  const status = useSelector((state) => state.category.status);
  const error = useSelector((state) => state.category.error);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  if (status === "Loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" />
      </div>
    );
  }

  if (status === "Failed") {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="w-full">
      <div className="bg-gradient-to-b from-green-800 to-blue-900 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-white text-center py-8 lg:text-3xl">
          Browse Products By Categories
        </h1>
      </div>
      <div className="mx-4 my-8 pb-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="relative flex flex-col items-start gap-4 bg-gradient-to-b from-green-700 to-blue-800 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => handleCategoryClick(category._id)}
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-60 object-cover rounded-t-lg"
            />
            <div className="absolute top-2 left-2 bg-primary rounded-full p-2">
              {getIconForCategory(category.name)}
            </div>
            <div className="px-4 pb-4">
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p>{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
