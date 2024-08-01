// components/Products.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../features/products/productSlice";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { FidgetSpinner } from "react-loader-spinner";
import { Button } from "flowbite-react";
import { FaCartPlus } from "react-icons/fa";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.product.products || []);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    dispatch(getProductsThunk("")); // Fetch a limited number of products
  }, [dispatch]);

  if (status === "Loading") {
    return (
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
      />
    );
  }
  if (status === "Failed") return <p>Error: {error}</p>;

  const handleViewAll = () => {
    navigate("/categories"); // Navigate to the categories page
  };

  return (
    <div className="w-[95%] mx-auto mt-8">
      <div className="flex justify-between items-center my-2">
        <h2 className="text-3xl font-bold text-primary">Featured Products</h2>
        <Button gradientMonochrome="success" onClick={handleViewAll}>
          View All
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {products.slice(0, 6).map((product) => (
          <div
            key={product._id}
            className="relative flex flex-col gap-2  bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-contain rounded-t-lg lg:h-60 "
            />
            <div className="flex-1 p-2">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-primary ">
                {product.description}
              </p>
            </div>
            <div className="flex justify-between items-center p-4 gap-4">
              <p className="text-sm md:text-base text-primary font-bold ">
                ₹{product.price.toFixed(1)}
              </p>
              <Button
                gradientMonochrome="success"
                className="!p-0 lg:p-1  buy-now"
              >
                <FaCartPlus className="mr-2 h-5 w-5 !items-center" />
                Buy now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
