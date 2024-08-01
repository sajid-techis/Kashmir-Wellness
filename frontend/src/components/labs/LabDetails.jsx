// src/components/LabDetails.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLabsThunk } from '../../features/labs/labSlice';
import { FidgetSpinner } from 'react-loader-spinner';

const LabDetails = () => {
  const dispatch = useDispatch();
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

  return (
    <div className="container mx-auto mt-16">
      <h2 className="text-3xl font-bold mb-6 text-primary">{lab.name}</h2>
      <img src={lab.imageUrl} alt={lab.name} className="w-full h-60 object-cover rounded-t-lg mb-4" />
      <p className="text-sm text-gray-700">{lab.address}</p>
      <p className="text-sm text-gray-700">{lab.city}, {lab.state} - {lab.pinCode}</p>
      <p className="text-sm text-gray-700">Contact: {lab.contactNumber}</p>
      <p className="text-sm text-gray-700 mt-2"><strong>Tests Available:</strong></p>
      <ul className="list-disc list-inside text-sm text-gray-700">
        {lab.testsAvailable.map((test, index) => (
          <li key={index}>{test}</li>
        ))}
      </ul>
      <p className="text-sm text-gray-700 mt-2"><strong>Opening Hours:</strong></p>
      <p className="text-sm text-gray-700">Days: {lab.openingHours.days.join(", ")}</p>
      <p className="text-sm text-gray-700">Hours: {lab.openingHours.hours.join(", ")}</p>
    </div>
  );
};

export default LabDetails;
