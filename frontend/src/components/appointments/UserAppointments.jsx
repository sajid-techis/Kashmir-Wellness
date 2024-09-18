import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentsForPatientThunk } from "../../features/appointments/appointmentSlice";

const UserAppointments = ({ patientId }) => {
  const dispatch = useDispatch();
  const { appointments, status, error } = useSelector(
    (state) => state.appointments
  );
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchAppointmentsForPatientThunk(patientId));
    }
  }, [dispatch, patientId]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Appointments</h2>
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-600">
                Appointment with {appointment.doctorId?.name || "Loading..."} 
              </h3>
              <p className="text-gray-600">
                <strong>Date:</strong>{" "}
                {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <strong>Time Slot:</strong> {appointment.timeSlot}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong> {appointment.status}
              </p>
              <button
                onClick={() => setSelectedAppointment(appointment)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No appointments found.</p>
      )}

      {selectedAppointment && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Appointment with {selectedAppointment.doctorId?.name || "Loading..."}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <img
                  src={selectedAppointment.doctorId?.profileImage || 'default-doctor-image.jpg'}
                  alt="Doctor"
                  className="w-full rounded-lg mb-4"
                />
                <p className="text-gray-600">
                  <strong>Specialty:</strong>{" "}
                  {selectedAppointment.doctorId?.specialty || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Experience:</strong>{" "}
                  {selectedAppointment.doctorId?.experience || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Qualification:</strong>{" "}
                  {selectedAppointment.doctorId?.qualification || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(selectedAppointment.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  <strong>Time Slot:</strong> {selectedAppointment.timeSlot}
                </p>
                <p className="text-gray-600">
                  <strong>Clinic Name:</strong>{" "}
                  {selectedAppointment.doctorId?.clinic?.name || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Clinic Address:</strong>{" "}
                  {selectedAppointment.doctorId?.clinic?.address?.street || "N/A"},{" "}
                  {selectedAppointment.doctorId?.clinic?.address?.city || "N/A"},{" "}
                  {selectedAppointment.doctorId?.clinic?.address?.state || "N/A"},{" "}
                  {selectedAppointment.doctorId?.clinic?.address?.zipCode || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Contact:</strong>{" "}
                  {selectedAppointment.doctorId?.clinic?.contactNumber || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Status:</strong> {selectedAppointment.status}
                </p>
                <p className="text-gray-600">
                  <strong>Patient:</strong> {selectedAppointment.patientName}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedAppointment(null)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAppointments;
