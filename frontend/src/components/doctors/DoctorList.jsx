import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorsBySpecialtiesThunk } from "../../features/doctors/doctorSlice";
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../common/SearchBar'; 
import SpecialtiesSidebar from "./SpecialtiesSidebar";

const DoctorList = () => {
  const { specialty } = useParams();
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor.doctors);
  const status = useSelector((state) => state.doctor.status);
  const error = useSelector((state) => state.doctor.error);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getDoctorsBySpecialtiesThunk(specialty));
  }, [dispatch, specialty]);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.qualification.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookAppointment = (doctorId) => {
    // Navigate to the booking page or open a modal with the doctorId
    navigate(`/book-appointment/${doctorId}`);
  };


  return (
    <div className="w-full">
      {/* Sticky Search Bar */}
      <div className="sticky top-0 left-0 right-0 z-20 bg-white p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl md:text-3xl font-bold text-primary hidden lg:block">Doctors in {specialty}</h2>
        <div className="relative w-full lg:w-1/2">
          <SearchBar searchTerm={searchQuery} setSearchTerm={setSearchQuery} />
        </div>
      </div>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-28 bg-white pb-14 text-primary px-2 max-h-screen overflow-y-scroll flex flex-col items-center lg:w-40 lg:py-8">
          <SpecialtiesSidebar />
        </div>
        {/* Doctors Grid */}
        <div className="mt-0 px-2 lg:px-4">
          {status === "Loading" && <p className="text-gray-500">Loading...</p>}
          {status === "Failed" && <p className="text-red-500">Error: {error}</p>}
          {status === "Success" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-scroll max-h-screen pb-20 lg:pb-10">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div key={doctor._id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                    <img src={doctor.profileImage} alt={doctor.name} className="w-full h-56 object-cover lg:h-80" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">Name: {doctor.name}</h3>
                      <p className="text-gray-700 mt-2">Specialty: {doctor.specialty}</p>
                      <p className="text-gray-700 mt-1">Qualifications: {doctor.qualification}</p>
                      <p className="text-gray-700 mt-1">Experience: {doctor.experience}</p>
                      <p className="text-gray-700 mt-1">Email: {doctor.email}</p>
                      <div className="mt-4">
                        <h4 className="text-md font-semibold text-gray-900">Clinic:</h4>
                        <p className="text-gray-700">{doctor.clinic.name}</p>
                        <p className="text-gray-700">{doctor.clinic.contactNumber}</p>
                        <p className="text-gray-700">{doctor.clinic.address.street}, {doctor.clinic.address.city}, {doctor.clinic.address.state}, {doctor.clinic.address.zipCode}, {doctor.clinic.address.country}</p>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-md font-semibold text-gray-900">Availability:</h4>
                        <p className="text-gray-700">Days: {doctor.availability.days.join(", ")}</p>
                        <p className="text-gray-700">Hours: {doctor.availability.hours.join(", ")}</p>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={() => handleBookAppointment(doctor._id)}
                          className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-300"
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No doctors found for this specialty.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
