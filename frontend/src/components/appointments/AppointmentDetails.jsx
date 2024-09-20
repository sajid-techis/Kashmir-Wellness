import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAppointmentsForPatientThunk } from "../../features/appointments/appointmentSlice";
import { AiOutlinePhone, AiOutlineGlobal, AiOutlineInfoCircle, AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";

const AppointmentDetails = () => {
  const { appointmentId } = useParams();
  const dispatch = useDispatch();
  const { appointments } = useSelector((state) => state.appointments);
  const [appointment, setAppointment] = useState(null);
  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (appointmentId) {
      const fetchedAppointment = appointments.find(app => app._id === appointmentId);
      setAppointment(fetchedAppointment);
      if (!fetchedAppointment) {
        dispatch(fetchAppointmentsForPatientThunk(appointmentId)); // If details are not already fetched
      }
    }
  }, [dispatch, appointmentId, appointments]);

  if (!appointment) {
    return <div className="text-center text-blue-500">Loading...</div>;
  }

  const getMapEmbedUrl = (address) => {
    const query = encodeURIComponent(address);
    return `https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${query}`;
  };

  return (
    <div className="p-6 md:p-8 bg-gradient-to-b from-purple-500 via-indigo-500 to-blue-500  shadow-lg border border-gray-200 pb-24">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
        Appointment with {appointment.doctorId?.name || "Loading..."}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <img
            src={appointment.doctorId?.profileImage || 'default-doctor-image.jpg'}
            alt="Doctor"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div className="text-gray-800">
            <p className="flex items-center gap-3 mb-3 text-sm md:text-base">
              <AiOutlineCalendar className="text-primary" />
              <span className="font-semibold">Date:</span>{" "}
              {new Date(appointment.date).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-3 mb-3 text-sm md:text-base">
              <AiOutlineClockCircle className="text-primary" />
              <span className="font-semibold">Time Slot:</span>{" "}
              {appointment.timeSlot}
            </p>
            <p className="flex items-center gap-3 mb-3 text-sm md:text-base">
              <AiOutlineInfoCircle className="text-primary" />
              <span className="font-semibold">Specialty:</span>{" "}
              {appointment.doctorId?.specialty || "N/A"}
            </p>
            <p className="flex items-center gap-3 mb-3 text-sm md:text-base">
              <AiOutlineInfoCircle className="text-primary" />
              <span className="font-semibold">Experience:</span>{" "}
              {appointment.doctorId?.experience || "N/A"}
            </p>
            <p className="flex items-center gap-3 mb-3 text-sm md:text-base">
              <AiOutlineInfoCircle className="text-primary" />
              <span className="font-semibold">Qualification:</span>{" "}
              {appointment.doctorId?.qualification || "N/A"}
            </p>
            <p className="flex items-center gap-3 mb-3 text-sm md:text-base">
              <AiOutlineInfoCircle className="text-primary" />
              <span className="font-semibold">Clinic:</span>{" "}
              {appointment.doctorId?.clinic?.name || "N/A"}
            </p>
            <p className="flex items-center gap-3 mb-3 text-sm md:text-base">
              <AiOutlineGlobal className="text-primary" />
              <span className="font-semibold">Address:</span>{" "}
              {appointment.doctorId?.clinic?.address?.street || "N/A"},{" "}
              {appointment.doctorId?.clinic?.address?.city || "N/A"},{" "}
              {appointment.doctorId?.clinic?.address?.state || "N/A"},{" "}
              {appointment.doctorId?.clinic?.address?.zipCode || "N/A"}
            </p>
            <p className="flex items-center gap-3 mb-3 text-sm md:text-base">
              <AiOutlinePhone className="text-primary" />
              <span className="font-semibold">Contact:</span>{" "}
              {appointment.doctorId?.clinic?.contactNumber || "N/A"}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden z-low">
          <iframe
            title="Clinic Location"
            width="100%"
            height="300"
            style={{ border: 0 }}
            src={getMapEmbedUrl(
              `${appointment.doctorId?.clinic?.address?.street}, ${appointment.doctorId?.clinic?.address?.city}, ${appointment.doctorId?.clinic?.address?.state} ${appointment.doctorId?.clinic?.address?.zipCode}`
            )}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
