import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedLabsThunk } from "../../features/labs/labSlice";
import { FidgetSpinner } from "react-loader-spinner";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const FeaturedLabs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { featuredLabs, status, error } = useSelector((state) => state.lab);

  useEffect(() => {
    dispatch(getFeaturedLabsThunk());
  }, [dispatch]);

  const handleView = () => {
    navigate('/labs')
  }

  if (status === "Pending") {
    return (
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="fidget-spinner-loading"
      />
    );
  }

  if (status === "Failed") {
    return <p>{error}</p>;
  }

  return (
    <div className="w-[95%] mx-auto my-8">
      <div className="flex justify-between items-center my-8">
        <h2 className="text-3xl font-extrabold  text-primary">
          Featured Labs
        </h2>
        <Button gradientMonochrome="success" onClick={handleView}>
          View All
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {featuredLabs &&
        featuredLabs.map((lab) => (
            <div
            key={lab._id}
            className="flex flex-col gap-2 items-start  border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
          >
            <img
              src={lab.imageUrl} 
              alt={lab.name}
              className="w-full h-60 object-cover rounded-t-lg lg:h-60"
            />
            <div className="p-4">
              <h2 className="text-sm font-semibold lg:text-xl">
                {lab.name}
              </h2>

              <p className="text-sm text-primary lg:text-lg">{lab.address},{lab.city},{lab.state}</p>
              <p className="text-sm text-primary lg:text-lg">{lab.contactNumber}</p>
            </div>
          </div>
        ))}
        </div>
    </div>
  );
};

export default FeaturedLabs;
