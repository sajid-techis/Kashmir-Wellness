import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorsBySpecialtiesThunk } from "../../features/doctors/doctorSlice";
import { useParams } from 'react-router-dom';
import SearchBar from '../common/SearchBar'; 
import SpecialtiesSidebar from "./SpecialtiesSidebar";

const DoctorList = () => {
  const { specialty } = useParams();
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor.doctors);
  const status = useSelector((state) => state.doctor.status);
  const error = useSelector((state) => state.doctor.error);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getDoctorsBySpecialtiesThunk(specialty));
  }, [dispatch, specialty]);

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.qualification.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex w-full h-screen">
      <div className="w-32 bg-primary text-white p-4 h-screen fixed top-14 left-0 overflow-y-auto z-10 lg:w-60">
        <SpecialtiesSidebar />
      </div>
      <div className="flex-1 ml-32 lg:ml-60 ">
      <div className="flex justify-between items-center">
        <div className="fixed top-14 left-32 right-0 z-20 bg-primary p-4 flex flex-col lg:left-60 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-2xl font-bold  text-white">Doctors in {specialty}</h2>
          <div className="relative w-full lg:w-1/2">
            <SearchBar searchTerm={searchQuery} setSearchTerm={setSearchQuery} />
          </div>
        </div>
      </div>
      {status === "Loading" && <p className="text-gray-500">Loading...</p>}
      {status === "Failed" && <p className="text-red-500">Error: {error}</p>}
      {status === "Success" && filteredDoctors.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6 mt-48 py-4 px-2 lg:mt-36">
          {filteredDoctors.map((doctor) => (
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
              </div>
            </div>
          ))}
        </div>
      )}
      {status === "Success" && filteredDoctors.length === 0 && (
        <p className="text-gray-500">No doctors found for this specialty.</p>
      )}
    </div>
    </div>
  );
};

export default DoctorList;
