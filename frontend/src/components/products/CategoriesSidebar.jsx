// components/CategoriesSidebar.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCategoriesThunk } from '../../features/categories/categorySlice';
import { FidgetSpinner } from 'react-loader-spinner';

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
    return (
      <div className="flex items-center justify-center h-full">
        <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" />
      </div>
    );
  }

  if (status === 'Failed') {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="bg-gradient-to-b from-green-800 to-blue-900 w-full  p-4 max-h-screen overflow-y-auto">
      <ul>
        {categories.map((category) => (
          <li
            key={category._id}
            className={`flex flex-col items-center text-center p-2 cursor-pointer rounded-lg transition duration-300 hover:bg-green-600 hover:text-white ${
              new URLSearchParams(location.search).get('category') === category._id ? 'bg-green-700 text-white' : 'text-gray-200'
            }`}
            onClick={() => handleCategoryClick(category._id)}
          >
            <div className="flex flex-col items-center">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-12 h-12 object-cover rounded-full mb-1"
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
