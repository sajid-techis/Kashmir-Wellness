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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-blue-900">
      <div className="sticky top-0 left-0 right-0 z-20 bg-white p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-xl md:text-3xl font-bold text-primary hidden lg:block">Products</h1>
        <div className="relative w-full lg:w-1/2">
          <SearchBar searchTerm={searchQuery} setSearchTerm={setSearchQuery} />
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3 bg-white pb-14 text-primary  max-h-screen overflow-y-scroll flex flex-col items-center lg:w-40 lg:py-8">
          <CategoriesSidebar />
        </div>
        {/* Products Grid */}
        <div className="mt-0 px-2 lg:px-4 flex-1">
          {status === "Loading" && (
            <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" />
          )}
          {status === "Failed" && <p>Error: {error}</p>}
          {status === "Success" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-scroll max-h-screen pb-20 pt-4 lg:pb-10">
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
