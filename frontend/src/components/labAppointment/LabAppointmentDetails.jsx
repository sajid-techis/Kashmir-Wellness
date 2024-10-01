import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLabAppointmentsThunk } from "../../features/labAppointment/labAppointmentSlice";
import { getLabsThunk } from "../../features/labs/labSlice";
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { FaBuilding, FaMicroscope } from "react-icons/fa";

const LabAppointmentDetails = () => {
  const { appointmentId } = useParams();
  const dispatch = useDispatch();
  const { appointments, loading } = useSelector((state) => state.labAppointment);
  const labs = useSelector((state) => state.lab.labs || []); // Ensure labs is an array
  const [appointment, setAppointment] = useState(null);
  const [labDetail, setLabDetail] = useState(null);
  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const fetchedAppointment = appointments.find(
      (app) => app._id === appointmentId
    );

    if (fetchedAppointment) {
      setAppointment(fetchedAppointment);

      // Fetch lab details using the labId from the appointment
      const lab = labs.find((lab) => lab._id === fetchedAppointment.labId);
      if (!lab) {
        dispatch(getLabsThunk({ id: fetchedAppointment.labId }));
      } else {
        setLabDetail(lab);
      }
    } else if (!loading) {
      dispatch(getLabAppointmentsThunk(appointmentId));
    }
  }, [dispatch, appointmentId, appointments, labs, loading]);

  useEffect(() => {
    if (labs.length > 0 && appointment) {
      const lab = labs.find((lab) => lab._id === appointment.labId);
      setLabDetail(lab);
    }
  }, [labs, appointment]);

  // Check if still loading or appointment is null
  if (loading || !appointment || !labDetail) {
    return <div className="text-center text-blue-500">Loading...</div>;
  }

  const getMapEmbedUrl = (address) => {
    const query = encodeURIComponent(address);
    return `https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${query}`;
  };

  const getDirectionsUrl = () => {
    const address = `${labDetail.address}, ${labDetail.city}, ${labDetail.state}, ${labDetail.pinCode}`;
    const query = encodeURIComponent(address);
    return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
  };

  return (
    <div className="p-6 pb-24 md:p-8 bg-gradient-to-b from-green-800 to-blue-900 shadow-lg rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-100">
        Lab Appointment with {labDetail.name || "Loading..."}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-b from-green-700 to-blue-800 p-6 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out">
          <img
            src={labDetail.imageUrl || "default-lab-image.jpg"}
            alt="Lab"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div className="text-gray-100">
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
                icon: <AiOutlineCheckCircle className="text-yellow-400" />,
                label: "Status",
                value: appointment.status,
              },
              {
                icon: <FaBuilding className="text-yellow-400" />,
                label: "Address",
                value: `${labDetail.address}, ${labDetail.city}, ${labDetail.state}, ${labDetail.pinCode}`,
              },
              {
                icon: <FaMicroscope className="text-yellow-400" />,
                label: "Tests",
                value: Array.isArray(appointment.tests)
                  ? appointment.tests.join(", ")
                  : "No tests available", 
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
            title="Lab Location"
            width="100%"
            height="300"
            style={{ border: 0 }}
            src={getMapEmbedUrl(
              `${labDetail.address}, ${labDetail.city}, ${labDetail.state} ${labDetail.pinCode}`
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

export default LabAppointmentDetails;
