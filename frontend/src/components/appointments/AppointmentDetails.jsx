import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAppointmentsForPatientThunk } from "../../features/appointments/appointmentSlice";
import {
  AiOutlinePhone,
  AiOutlineGlobal,
  AiOutlineInfoCircle,
  AiOutlineCalendar,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { MdSchool } from "react-icons/md"; // Education icon
import { FaBriefcaseMedical, FaBuilding } from "react-icons/fa"; // Specialty icon
import { GiPathDistance } from "react-icons/gi"; // Experience icon

const AppointmentDetails = () => {
  const { appointmentId } = useParams();
  const dispatch = useDispatch();
  const { appointments, loading } = useSelector((state) => state.appointments);
  const [appointment, setAppointment] = useState(null);
  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const fetchedAppointment = appointments.find(
      (app) => app._id === appointmentId
    );

    if (fetchedAppointment) {
      setAppointment(fetchedAppointment);
    } else if (!loading) {
      dispatch(fetchAppointmentsForPatientThunk(appointmentId));
    }
  }, [dispatch, appointmentId, appointments, loading]);

  // Check if still loading or appointment is null
  if (loading || !appointment) {
    return <div className="text-center text-blue-500">Loading...</div>;
  }

  const getMapEmbedUrl = (address) => {
    const query = encodeURIComponent(address);
    return `https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${query}`;
  };

  const getDirectionsUrl = () => {
    const address = `${appointment.doctorId?.clinic?.address?.street}, ${appointment.doctorId?.clinic?.address?.city}, ${appointment.doctorId?.clinic?.address?.state} ${appointment.doctorId?.clinic?.address?.zipCode}`;
    const query = encodeURIComponent(address);
    return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  };

  return (
    <div className="p-6 pb-24 md:p-8 bg-gradient-to-b from-green-800 to-blue-900 shadow-lg rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-100">
        Appointment with {appointment.doctorId?.name || "Loading..."}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-b from-green-700 to-blue-800 p-6 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out">
          <img
            src={
              appointment.doctorId?.profileImage || "default-doctor-image.jpg"
            }
            alt="Doctor"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div className="text-gray-100">
            {" "}
            {/* Change to gray-100 for better contrast */}
            {[
              {
                icon: <AiOutlineCalendar className="text-yellow-400" />,
                label: "Date",
                value: new Date(appointment.date).toLocaleDateString(),
              },
              {
                icon: <AiOutlineClockCircle className="text-yellow-400" />,
                label: "Time Slot",
                value: appointment.timeSlot,
              },
              {
                icon: <FaBriefcaseMedical className="text-yellow-400" />,
                label: "Specialty",
                value: appointment.doctorId?.specialty || "N/A",
              },
              {
                icon: <GiPathDistance className="text-yellow-400" />,
                label: "Experience",
                value: appointment.doctorId?.experience || "N/A",
              },
              {
                icon: <MdSchool className="text-yellow-400" />,
                label: "Qualification",
                value: appointment.doctorId?.qualification || "N/A",
              },
              {
                icon: <FaBuilding className="text-yellow-400" />,
                label: "Clinic",
                value: appointment.doctorId?.clinic?.name || "N/A",
              },
              {
                icon: <AiOutlineGlobal className="text-yellow-400" />,
                label: "Address",
                value: `${
                  appointment.doctorId?.clinic?.address?.street || "N/A"
                }, ${appointment.doctorId?.clinic?.address?.city || "N/A"}, ${
                  appointment.doctorId?.clinic?.address?.state || "N/A"
                }, ${appointment.doctorId?.clinic?.address?.zipCode || "N/A"}`,
              },
              {
                icon: <AiOutlinePhone className="text-yellow-400" />,
                label: "Contact",
                value: appointment.doctorId?.clinic?.contactNumber || "N/A",
              },
            ].map((item, index) => (
              <p
                key={index}
                className="flex items-center gap-3 mb-3 text-sm md:text-base"
              >
                {item.icon}
                <span className="font-semibold">{item.label}:</span>{" "}
                {item.value}
              </p>
            ))}
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
          <div className="flex justify-center my-4">
            <a
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-transform transform hover:scale-105"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
