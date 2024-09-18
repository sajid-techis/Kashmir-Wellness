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
    return <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" />;
  }

  if (status === 'Failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div >
      <ul>
        {categories.map((category) => (
          <li
            key={category._id}
            className={`flex flex-col items-center text-center p-1  cursor-pointer rounded-lg hover:bg-primary-light hover:text-white ${
              new URLSearchParams(location.search).get('category') === category._id ? 'bg-primary-dark text-white' : ''
            }`}
            onClick={() => handleCategoryClick(category._id)}
          >
            <div className='flex flex-col items-center'>
            <img
              src={(category.imageUrl)}
              alt={category._id}
              className="w-12 h-12 object-cover rounded-full"
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
