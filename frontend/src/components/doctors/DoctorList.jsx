import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorsBySpecialtiesThunk } from "../../features/doctors/doctorSlice";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../common/SearchBar";
import SpecialtiesSidebar from "./SpecialtiesSidebar";
import { FidgetSpinner } from "react-loader-spinner";

const DoctorList = () => {
    const { specialtyId } = useParams();
    console.log(specialtyId)
    const dispatch = useDispatch();
    const doctors = useSelector((state) => state.doctor.doctors);
    const status = useSelector((state) => state.doctor.status);
    const error = useSelector((state) => state.doctor.error);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
  
      useEffect(() => {
        
        dispatch(getDoctorsBySpecialtiesThunk(specialtyId));
      }, [dispatch, specialtyId]); 
  
  

    const filteredDoctors = doctors.filter(
        (doctor) =>
            doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.specialty.name.toLowerCase().includes(searchQuery.toLowerCase()) || // Adjust based on your data structure
            doctor.qualification.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBookAppointment = (doctorId) => {
        navigate(`/book-appointment/${doctorId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-800 to-blue-900">
            <div className="sticky top-0 left-0 right-0 z-20 bg-white p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <h2 className="text-xl md:text-3xl font-bold text-primary hidden lg:block">
                    Doctors in {specialtyId} {/* Display specialty name if available */}
                </h2>
                <div className="relative w-full lg:w-1/2">
                    <SearchBar searchTerm={searchQuery} setSearchTerm={setSearchQuery} />
                </div>
            </div>
            <div className="flex">
                <div className="w-1/5 bg-white pb-14 text-primary max-h-screen overflow-y-auto flex flex-col items-center lg:w-40 lg:py-8">
                    <SpecialtiesSidebar />
                </div>
                <div className="mt-0 px-2 lg:px-4 flex-1">
                    {status === "Loading" && (
                        <div className="flex justify-center py-8">
                            <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" />
                        </div>
                    )}
                    {status === "Failed" && (
                        <p className="text-red-500">Error: {error}</p>
                    )}
                    {status === "Success" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-screen pb-20 pt-4 lg:pb-10">
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map((doctor) => (
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
                                            <h3 className="text-lg font-semibold">{doctor.name}</h3>
                                            <p className="text-sm">Specialty: {doctor.specialty.name}</p>
                                            <p className="text-sm">Qualifications: {doctor.qualification}</p>
                                            <p className="text-sm">Experience: {doctor.experience} years</p>
                                            <p className="text-sm">Email: {doctor.email}</p>

                                            <div className="mt-4">
                                                <h4 className="text-md font-semibold">Clinic:</h4>
                                                <p>{doctor.clinic.name}</p>
                                                <p>{doctor.clinic.contactNumber}</p>
                                                <p>
                                                    {doctor.clinic.address.street}, {doctor.clinic.address.city}, {doctor.clinic.address.state}, {doctor.clinic.address.zipCode}, {doctor.clinic.address.country}
                                                </p>
                                            </div>
                                            <div className="mt-4">
                                                <h4 className="text-md font-semibold">Availability:</h4>
                                                <p>Days: {doctor.availability.days.join(", ")}</p>
                                                <p>Hours: {doctor.availability.hours.join(", ")}</p>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <button
                                                onClick={() => handleBookAppointment(doctor._id)}
                                                className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300 w-full"
                                            >
                                                Book Appointment
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-200">No doctors found for this specialty.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorList;
