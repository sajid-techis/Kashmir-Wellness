import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getSpecialtiesThunk } from "../../features/doctors/doctorSlice";
import { FidgetSpinner } from "react-loader-spinner";

const getImageForSpecialty = (name) => {
  switch (name) {
    case "Cardiology":
      return "https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382368/Category-Images/cardiology_xndpjd.jpg";
    case "Dermatology":
      return "https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382369/Category-Images/dermatology_d2ht7m.jpg";
    case "Endocrinology":
      return "https://res.cloudinary.com/dj6bt46ar/image/upload/v1722384132/Category-Images/Endocrinology_vn9zp9.jpg";
    case "Gastroenterology":
      return "https://res.cloudinary.com/dj6bt46ar/image/upload/v1722384259/Category-Images/Gastroenterology_j27u48.jpg";
    case "General Medicine":
      return "https://res.cloudinary.com/dj6bt46ar/image/upload/v1722384349/Category-Images/General-Medicine_uxkieu.jpg";
    case "Neurology":
      return "https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382377/Category-Images/neurology_hyn22q.jpg";
    case "Obstetrics and Gynecology":
      return "https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382374/Category-Images/gynecology_omwlrl.jpg";
    case "Orthopedic Surgery":
      return "https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382379/Category-Images/orthopedics_gwqgtc.jpg";
    case "Pediatrics":
      return "https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382380/Category-Images/pediatrics_rhn7r0.jpg";
    default:
      return "https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382368/Category-Images/cardiology_xndpjd.jpg";
  }
};

const SpecialtiesSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const specialties = useSelector((state) => state.doctor.specialties);
  const status = useSelector((state) => state.doctor.status);
  const error = useSelector((state) => state.doctor.error);

  useEffect(() => {
    dispatch(getSpecialtiesThunk());
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
              isActive(specialty._id) ? 'bg-green-700 text-white' : 'text-gray-200'
            }`}
            onClick={() => handleSpecialtyClick(specialty._id)}
          >
            <div className="flex flex-col items-center">
              <img
                src={getImageForSpecialty(specialty._id)} // Ensure specialty._id matches your cases
                alt={specialty._id}
                className="w-12 h-12 object-cover rounded-full mb-1"
              />
              <span className="text-xs">{specialty._id}</span> 
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecialtiesSidebar;
