import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchSpecialtiesThunk } from "../../features/specialties/specialtySlice";
import { FidgetSpinner } from "react-loader-spinner";

const SpecialtiesSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const specialties = useSelector((state) => state.specialty.specialties);
  const status = useSelector((state) => state.specialty.status);
  const error = useSelector((state) => state.specialty.error);

  useEffect(() => {
    dispatch(fetchSpecialtiesThunk());
  }, [dispatch]);

  const handleSpecialtyClick = (specialtyId) => {
    navigate(`/specialty/${specialtyId}`);
  };

  const isActive = (specialtyId) => {
    return new URLSearchParams(location.search).get('specialty') === specialtyId;
  };

  if (status === "Loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" />
      </div>
    );
  }

  if (status === "Failed") {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="bg-gradient-to-b from-green-800 to-blue-900 w-full p-4 max-h-screen overflow-y-auto">
      <ul>
        {specialties.map((specialty) => (
          <li
            key={specialty._id}
            className={`flex flex-col items-center text-center p-2 cursor-pointer rounded-lg transition duration-300 hover:bg-green-600 hover:text-white ${
              isActive(specialty.name) ? 'bg-green-700 text-white ' : 'text-gray-200'
            }`}
            onClick={() => handleSpecialtyClick(specialty._id)}
          >
            <div className="flex flex-col items-center">
              <img
                src={specialty.image} 
                alt={specialty.name}
                className="w-10 h-10 object-cover rounded-full mb-1"
              />
              <span className="text-xxs">{specialty.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecialtiesSidebar;
