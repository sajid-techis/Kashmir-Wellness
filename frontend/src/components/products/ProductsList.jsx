import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProductsThunk } from "../../features/products/productSlice";
import ProductCard from "./ProductCard";
import CategoriesSidebar from "./CategoriesSidebar";
import { FidgetSpinner } from "react-loader-spinner";
import SearchBar from "../common/SearchBar";

const ProductsList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");

  const products = useSelector((state) => state.product.products || []);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    if (categoryId) {
      dispatch(getProductsThunk({ categoryId }));
    }
  }, [categoryId, dispatch]);

 

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <div className="w-32 bg-primary text-white py-16 px-2 h-screen flex flex-col items-center fixed top-14 left-0 overflow-y-auto z-10 lg:w-40 lg:py-14">
        <CategoriesSidebar />
      </div>
      <div className="flex-1 ml-32 lg:ml-40 ">
        {/* Header and Search Input */}
        <div className="fixed top-14 left-32 right-0 z-20 bg-primary p-4 flex flex-col lg:left-40 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-xl md:text-3xl font-bold text-white">Products</h1>
          <div className="relative w-full lg:w-1/2">
            <SearchBar searchTerm={searchQuery} setSearchTerm={setSearchQuery} />
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-36 py-6 px-4">
          {status === "Loading" && <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" />}
          {status === "Failed" && <p>Error: {error}</p>}
          {status === "Success" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p>No products found for this category.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
