import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialtiesThunk } from "../../features/doctors/doctorSlice";
import { useNavigate } from "react-router-dom";
import { FidgetSpinner } from "react-loader-spinner";

const SpecialtiesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const specialties = useSelector((state) => state.doctor.specialties);
  const status = useSelector((state) => state.doctor.status);
  const error = useSelector((state) => state.doctor.error);

  useEffect(() => {
    dispatch(getSpecialtiesThunk());
  }, [dispatch]);

  const onSelectSpecialty = (specialty) => {
    navigate(`/specialty/${encodeURIComponent(specialty)}`);
  };

  const getIconForSpecialty = (name) => {
    switch (name) {
      case "Cardiology":
        return 'https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382368/Category-Images/cardiology_xndpjd.jpg';
      case "Dermatology":
        return 'https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382369/Category-Images/dermatology_d2ht7m.jpg';
      case "Endocrinology":
        return 'https://res.cloudinary.com/dj6bt46ar/image/upload/v1722384132/Category-Images/Endocrinology_vn9zp9.jpg';
      case "Gastroenterology":
        return 'https://res.cloudinary.com/dj6bt46ar/image/upload/v1722384259/Category-Images/Gastroenterology_j27u48.jpg';
      case "General Medicine":
        return 'https://res.cloudinary.com/dj6bt46ar/image/upload/v1722384349/Category-Images/General-Medicine_uxkieu.jpg';
      case "Neurology":
        return 'https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382377/Category-Images/neurology_hyn22q.jpg';
      case "Obstetrics and Gynecology":
        return 'https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382374/Category-Images/gynecology_omwlrl.jpg';
      case "Orthopedic Surgery":
        return 'https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382379/Category-Images/orthopedics_gwqgtc.jpg';
      case "Pediatrics":
        return 'https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382380/Category-Images/pediatrics_rhn7r0.jpg';
      case "Pulmonology":
        return 'https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382383/Category-Images/radiology_xmhng9.jpg';
      case "Rheumatology":
        return 'https://res.cloudinary.com/dj6bt46ar/image/upload/v1722384925/Category-Images/Rheumatology_sxz1fg.jpg';
      case "Urology":
        return 'https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382385/Category-Images/urology_cduirb.jpg';
      default:
        return 'https://res.cloudinary.com/dj6bt46ar/image/upload/v1722382368/Category-Images/cardiology_xndpjd.jpg';
    }
  };

  return (
    <div className="w-full mx-auto mb-20">
      <h2 className="text-xl font-extrabold py-8 text-center text-white bg-custom-gradient sticky top-0 md:text-3xl">
        Browse Doctors By Specialties
      </h2>
      {status === "Loading" && (
        <div className="flex justify-center py-8">
          <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" />
        </div>
      )}
      {status === "Failed" && <p className="text-red-500 text-center">Error: {error}</p>}
      {status === "Success" && (
        <div className="grid mx-2 my-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-6 lg:mx-8">
          {specialties && specialties.length > 0 ? (
            specialties.map((specialty) => (
              <div
                key={specialty._id} 
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg flex flex-col gap-2 cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => onSelectSpecialty(specialty._id)} 
              >
                <img
                  src={getIconForSpecialty(specialty._id)} 
                  alt={specialty._id}
                  className="w-full h-60 object-cover rounded-t-lg"
                />
                <h3 className="text-lg font-semibold px-4">
                  {specialty._id}
                </h3>
                <p className="text-sm px-4 pb-4">{specialty.description}</p>
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
