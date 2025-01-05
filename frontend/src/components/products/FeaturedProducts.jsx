import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedProductsThunk } from "../../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { FidgetSpinner } from "react-loader-spinner";
import { Button } from "flowbite-react";
import { FaCartPlus } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Star icons
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.featuredProducts || []);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    dispatch(getFeaturedProductsThunk());
  }, [dispatch]);

  if (status === "Loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          ariaLabel="fidget-spinner-loading"
        />
        <p className="mt-4 text-lg">Loading featured products...</p>
      </div>
    );
  }

  if (status === "Failed") return <p className="text-red-500">Error: {error}</p>;

  const handleViewAll = () => {
    navigate("/categories");
    window.scrollTo(0, 0);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {halfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-[95%] mx-auto mt-8">
      <div className="flex justify-between items-center my-4">
        <h2 className="text-3xl font-bold text-primary">Featured Products</h2>
        <Button gradientMonochrome="success" onClick={handleViewAll}>
          View All
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {products.slice(0, 6).map((product) => {
          const images = Array.isArray(product.imageUrl) ? product.imageUrl : [product.imageUrl];
          const firstBatch = product.batches[0] || {};
          const price = firstBatch.price || 0;
          const stock = firstBatch.stock || 0;
          const averageRating = product.ratings.averageRating || 0;
          const numberOfRatings = product.ratings.numberOfRatings || 0;

          return (
            <div
              key={product._id}
              className="relative flex flex-col gap-2 bg-gradient-to-b from-green-700 to-blue-800 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
            >
              {images.length > 1 ? (
                <Slider {...sliderSettings}>
                  {images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={product.name}
                        className="w-full h-40 object-cover rounded-t-lg lg:h-60"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img
                  src={images[0]}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-t-lg lg:h-60"
                />
              )}
              <div className="flex-1 p-4 text-gray-100">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold">{product.name}</h3>
                <p className="text-xl font-bold text-yellow-400 mt-2">₹{price.toFixed(2)}</p>
                <div className="mt-2">
                  {renderStars(averageRating)}
                  <p className="text-sm text-gray-300">
                    {averageRating.toFixed(1)} ({numberOfRatings} reviews)
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 gap-1 lg:p-4 lg:gap-4">
                <Button gradientMonochrome="success" className="!p-0 lg:p-1 buy-now">
                  <FaCartPlus className="mr-2 h-5 w-5" />
                  Buy now
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
