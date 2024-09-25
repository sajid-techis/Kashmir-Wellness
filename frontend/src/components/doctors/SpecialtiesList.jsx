import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecialtiesThunk } from "../../features/specialties/specialtySlice";
import { useNavigate } from "react-router-dom";
import { FidgetSpinner } from "react-loader-spinner";


const SpecialtiesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const specialties = useSelector((state) => state.specialty.specialties);
  const status = useSelector((state) => state.specialty.status);
  const error = useSelector((state) => state.specialty.error);

  useEffect(() => {
    dispatch(fetchSpecialtiesThunk());
  }, [dispatch]);

  const onSelectSpecialty = (specialtyId) => {
    navigate(`/specialty/${specialtyId}`);
};


  return (
    <div className="w-[95%] mx-auto mb-20">
      <div className="flex justify-between items-center my-4">
        <h2 className="text-3xl font-bold text-primary">Specialties</h2>
      </div>
      {status === "Loading" && (
        <div className="flex justify-center py-8">
          <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" />
        </div>
      )}
      {status === "Failed" && <p className="text-red-500 text-center">Error: {error}</p>}
      {status === "Success" && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
          {specialties && specialties.length > 0 ? (
            specialties.map((specialty) => (
              <div
                key={specialty._id} 
                className="relative flex flex-col gap-2 bg-gradient-to-b from-green-700 to-blue-800 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
                onClick={() => onSelectSpecialty(specialty._id)} 
              >
                <img
                  src={specialty.image} // Use specialty.image directly
                  alt={specialty.name}
                  className="w-full h-40 object-cover rounded-t-lg lg:h-60"
                />
                <div className="flex-1 p-4 text-gray-100">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold">{specialty.name}</h3>
                  <p className="text-xs sm:text-sm md:text-base">{specialty.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No specialties available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SpecialtiesList;
