import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults, clearSearchResults } from "../../features/search/searchSlice";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const UniversalSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.search);

  useEffect(() => {
    if (searchTerm) {
      const timer = setTimeout(() => {
        dispatch(fetchSearchResults(searchTerm));
      }, 300);
      return () => clearTimeout(timer);
    } else {
      dispatch(clearSearchResults());
    }
  }, [searchTerm, dispatch]);

  return (
    <div className="w-full lg:max-w-xl mx-auto my-0 sticky top-0 z-30">
      <div className="bg-custom-gradient shadow-md p-4 ">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products, doctors, labs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full outline-none"
          />
          <button className="absolute top-2 right-0 mt-2 mr-2 text-primary" disabled>
            <FaSearch />
          </button>
        </div>
        {loading && <p className="mt-4 text-center text-white">Loading...</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results && results.products && results.products.length > 0 && (
            <div className="col-span-full text-white">
              <h3 className="text-xl font-bold mb-2 ">Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.products.map((product) => (
                  <Link to={`/products/${product._id}`} key={product._id} className="block p-4 border rounded hover:shadow-lg">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover mb-2 rounded"/>
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p className="text-sm ">{product.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {results && results.doctors && results.doctors.length > 0 && (
            <div className="col-span-full text-white">
              <h3 className="text-xl font-bold mb-2">Doctors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.doctors.map((doctor) => (
                  <Link to={`/specialty/${doctor.specialty}`} key={doctor._id} className="block p-4 border rounded hover:shadow-lg">
                    <img src={doctor.profileImage} alt={doctor.name} className="w-full h-32 object-cover mb-2 rounded"/>
                    <h3 className="text-lg font-bold">{doctor.name}</h3>
                    <p className="text-sm">{doctor.specialty}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {results && results.labs && results.labs.length > 0 && (
            <div className="col-span-full text-white">
              <h3 className="text-xl font-bold mb-2">Labs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.labs.map((lab) => (
                  <Link to={`/labs/${lab._id}`} key={lab._id} className="block p-4 border rounded hover:shadow-lg">
                    <img src={lab.imageUrl} alt={lab.name} className="w-full h-32 object-cover mb-2 rounded"/>
                    <h3 className="text-lg font-bold">{lab.name}</h3>
                    <p className="text-sm ">{lab.testsAvailable}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {results && results.categories && results.categories.length > 0 && (
            <div className="col-span-full text-white">
              <h3 className="text-xl font-bold mb-2">Categories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.categories.map((category) => (
                  <Link to={`/categories/${category._id}`} key={category._id} className="block p-4 border rounded hover:shadow-lg">
                    <img src={category.imageUrl} alt={category.name} className="w-full h-32 object-cover mb-2 rounded"/>
                    <h3 className="text-lg font-bold">{category.name}</h3>
                    <p className="text-sm">{category.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversalSearch;
