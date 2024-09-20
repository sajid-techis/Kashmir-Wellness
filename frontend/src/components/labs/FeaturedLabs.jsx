import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedLabsThunk } from "../../features/labs/labSlice";
import { FidgetSpinner } from "react-loader-spinner";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const FeaturedLabs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { featuredLabs, status, error } = useSelector((state) => state.lab);

  useEffect(() => {
    dispatch(getFeaturedLabsThunk());
  }, [dispatch]);

  const handleView = () => {
    navigate('/labs');
  };

  if (status === "Pending") {
    return (
      <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" />
    );
  }

  if (status === "Failed") {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="w-[95%] mx-auto mt-8 pb-20">
      <div className="flex justify-between items-center my-4">
        <h2 className="text-3xl font-bold text-primary">Featured Labs</h2>
        <Button gradientMonochrome="success" onClick={handleView}>
          View All
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {featuredLabs.map((lab) => (
          <div key={lab._id} className="relative flex flex-col gap-2 bg-gradient-to-b from-green-700 to-blue-800 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer">
            <img src={lab.imageUrl} alt={lab.name} className="w-full h-40 object-cover rounded-t-lg lg:h-60" />
            <div className="flex-1 p-4 text-gray-100">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold">{lab.name}</h3>
              <p className="text-xs sm:text-sm md:text-base">{lab.address}, {lab.city}, {lab.state}</p>
              <p className="text-xs sm:text-sm md:text-base">{lab.contactNumber}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedLabs;
