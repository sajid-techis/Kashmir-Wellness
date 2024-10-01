import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; 
import { getLabsThunk } from '../../features/labs/labSlice';
import { FidgetSpinner } from 'react-loader-spinner';
import { FaClipboardCheck } from 'react-icons/fa';

const LabDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { id } = useParams();
  const status = useSelector((state) => state.lab.status);
  const lab = useSelector((state) => state.lab.labs.find(l => l._id === id));
  const error = useSelector((state) => state.lab.error);

  useEffect(() => {
    if (!lab) {
      dispatch(getLabsThunk());
    }
  }, [dispatch, lab]);

  if (status === 'Pending') {
    return <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" />;
  }

  if (status === 'Failed') {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!lab) {
    return <p className="text-center text-red-500">Lab not found.</p>;
  }

  const handleBookTestClick = () => {
    navigate(`/labs/${id}/book-test`, { 
        state: { 
            timeSlots: lab.timeSlots, 
            testsAvailable: lab.testsAvailable,
            labName: lab.name 
        } 
    }); 
};


  return (
    <div className="bg-gradient-to-b from-green-800 to-blue-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto mt-8 mb-20 px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-green-900 to-blue-800 rounded-3xl shadow-2xl p-6 md:p-8 pb-12 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
          <div className="relative">
            <img 
              src={lab.imageUrl} 
              alt={lab.name} 
              className="w-full h-60 object-cover rounded-xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-xl"></div>
          </div>

          <h2 className="text-4xl font-extrabold mb-4 text-white">{lab.name}</h2>
          <p className="text-sm text-gray-200">{lab.address}</p>
          <p className="text-sm text-gray-200">{lab.city}, {lab.state} - {lab.pinCode}</p>
          <p className="text-sm text-gray-200">Contact: <span className="font-semibold">{lab.contactNumber}</span></p>

          <div className="mt-4">
            <p className="text-sm text-gray-200 font-semibold">Tests Available:</p>
            <ul className="list-disc list-inside text-sm text-gray-200">
              {lab.testsAvailable.map((test, index) => (
                <li key={index}>{test}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-200 font-semibold">Opening Hours:</p>
            <p className="text-sm text-gray-200">Days: {lab.openingHours.days.join(", ")}</p>
            <p className="text-sm text-gray-200">Hours: {lab.openingHours.hours.join(", ")}</p>
          </div>

          <div className="mt-8">
            <button
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center transform hover:scale-110"
              onClick={handleBookTestClick}
            >
              <FaClipboardCheck className="mr-2" /> Book Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDetails;
