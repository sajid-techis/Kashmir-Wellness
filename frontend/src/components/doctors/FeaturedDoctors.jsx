import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedDoctorsThunk } from "../../features/doctors/doctorSlice";
import { useNavigate } from "react-router-dom";
import { FidgetSpinner } from "react-loader-spinner";
import { Button } from "flowbite-react";

const FeaturedDoctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { featuredDoctors, status, error } = useSelector(
    (state) => state.doctor
  );

  useEffect(() => {
    dispatch(getFeaturedDoctorsThunk());
  }, [dispatch]);

  const handleView = () => {
    navigate("/specialty");
  };

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

  return (
    <div className="w-[95%] mx-auto my-8">
      <div className="flex justify-between items-center my-8 " >
        <h2 className="text-3xl font-extrabold  text-primary">
          Featured Doctors
        </h2>
        <Button gradientMonochrome="success" onClick={handleView}>
          View All
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {featuredDoctors.length > 0 ? (
          featuredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="flex flex-col gap-2 items-start  border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
            >
              <img
                src={doctor.profileImage}
                alt={doctor.name}
                className="w-full h-60 object-cover rounded-t-lg lg:h-60"
              />
              <div className="p-4">
                <h2 className="text-sm font-semibold lg:text-xl">
                  {doctor.name}
                </h2>
                <p className="text-sm text-primary lg:text-lg">
                  {doctor.specialty}
                </p>
                <p className="text-sm text-primary lg:text-lg">
                  {doctor.qualification}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No featured doctors available.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedDoctors;
