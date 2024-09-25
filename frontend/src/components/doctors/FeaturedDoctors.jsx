import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedDoctorsThunk } from "../../features/doctors/doctorSlice";
import { useNavigate } from "react-router-dom";
import { FidgetSpinner } from "react-loader-spinner";
import { Button } from "flowbite-react";
import { fetchSpecialtiesThunk } from "../../features/specialties/specialtySlice";

const FeaturedDoctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { featuredDoctors, status, error } = useSelector((state) => state.doctor);
  const specialties = useSelector((state) => state.specialty.specialties);
  
  useEffect(() => {
    dispatch(getFeaturedDoctorsThunk());
    dispatch(fetchSpecialtiesThunk());
  }, [dispatch]);

  // Helper function to get the specialty name by ID
  const getSpecialtyName = (specialtyId) => {
    const specialty = specialties.find((spec) => spec._id === specialtyId);
    return specialty ? specialty.name : "Unknown Specialty"; // Return "Unknown Specialty" if not found
  };

  const handleView = () => {
    navigate("/specialty");
    window.scrollTo(0, 0);
  };

  if (status === "Loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" />
      </div>
    );
  }

  if (status === "Failed") return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="w-[95%] mx-auto my-8">
      <div className="flex justify-between items-center my-4">
        <h2 className="text-3xl font-bold text-primary">Featured Doctors</h2>
        <Button gradientMonochrome="success" onClick={handleView}>
          View All
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {featuredDoctors.length > 0 ? (
          featuredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="relative flex flex-col gap-2 bg-gradient-to-b from-green-700 to-blue-800 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
            >
              <img
                src={doctor.profileImage}
                alt={doctor.name}
                className="w-full h-40 object-cover rounded-t-lg lg:h-60"
              />
              <div className="flex-1 p-4 text-gray-100">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold">{doctor.name}</h3>
                {/* Get the specialty name using the helper function */}
                <p className="text-xs sm:text-sm md:text-base">{getSpecialtyName(doctor.specialty)}</p>
                <p className="text-xs sm:text-sm md:text-base">{doctor.qualification}</p>
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
