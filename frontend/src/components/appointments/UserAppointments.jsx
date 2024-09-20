import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentsForPatientThunk } from "../../features/appointments/appointmentSlice";
import { Link } from "react-router-dom";
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineCheckCircle } from "react-icons/ai";

const UserAppointments = ({ patientId }) => {
  const dispatch = useDispatch();
  const { appointments, status, error } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    if (patientId) {
      dispatch(fetchAppointmentsForPatientThunk(patientId));
    }
  }, [dispatch, patientId]);

  if (status === "loading") {
    return <div className="text-center text-blue-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 rounded-2xl shadow-lg">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">Your Appointments</h2>
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white shadow-md hover:shadow-xl rounded-lg p-4 sm:p-6 border border-gray-100 transform transition-all duration-300 hover:scale-105 ease-in-out"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-indigo-600">
                Appointment with {appointment.doctorId?.name || "Loading..."}
              </h3>
              <p className="text-gray-500 flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <AiOutlineCalendar /> <strong>Date:</strong>{" "}
                {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p className="text-gray-500 flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <AiOutlineClockCircle /> <strong>Time Slot:</strong> {appointment.timeSlot}
              </p>
              <p className="text-gray-500 flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <AiOutlineCheckCircle /> <strong>Status:</strong> {appointment.status}
              </p>
              <Link
                to={`/appointment/${appointment._id}`}
                className="mt-4 w-full inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg text-center hover:bg-indigo-700 transition duration-300 ease-in-out"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No appointments found.</p>
      )}
    </div>
  );
};

export default UserAppointments;
