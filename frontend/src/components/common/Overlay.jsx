import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // You can use any icons you like

const Overlay = ({ message, details, type, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md mx-auto">
        <div className="text-4xl mb-4">
          {type === 'success' ? (
            <FaCheckCircle className="text-green-500" />
          ) : (
            <FaTimesCircle className="text-red-500" />
          )}
        </div>
        <p className={`text-lg mb-4 ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
          {message}
        </p>
        {details && (
          <div className="text-left">
            <p><strong>Name:</strong> {details.patientName}</p>
            <p><strong>Email:</strong> {details.patientEmail}</p>
            <p><strong>Phone:</strong> {details.patientPhone}</p>
            <p><strong>Date:</strong> {details.date}</p>
            <p><strong>Time Slot:</strong> {details.timeSlot}</p>
            <p><strong>Status:</strong> {details.status}</p>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Overlay;
