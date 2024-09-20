import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addAppointmentOptimistically, bookAppointmentThunk } from "../../features/appointments/appointmentSlice";
import { getDoctorDetailsThunk } from "../../features/doctors/doctorSlice";
import Calendar from "react-calendar"; 
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt } from "react-icons/fa"; 

const BookAppointment = () => {
  const { doctorId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doctor = useSelector((state) => state.doctor.doctor);
  const user = useSelector((state) => state.user.userInfo);

  const [patientData, setPatientData] = useState({
    patientName: user?.name || "",
    phoneNumber: "",
    email: "",
    date: null,
    timeSlot: "",
  });

  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableDays, setAvailableDays] = useState([]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); 

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        await dispatch(getDoctorDetailsThunk(doctorId));
      } catch (error) {
        console.error("Failed to fetch doctor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId, dispatch]);

  useEffect(() => {
    if (doctor) {
      const { availability } = doctor;
      const generatedSlots = availability?.hours || [];
      setTimeSlots(generatedSlots);
      setAvailableDays(availability?.days || []);
    }
  }, [doctor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleDateChange = (date) => {
    const selectedDate = date.toLocaleDateString("en-US", { weekday: "long" });

    if (availableDays.includes(selectedDate)) {
      const formattedDate = date.toLocaleDateString('en-CA');
      console.log("Selected date:", formattedDate);
      setPatientData({ ...patientData, date: formattedDate });
      setIsCalendarVisible(false);
    } else {
      alert("This date is not available for booking.");
    }
  };

  const handleSubmit = async () => {
    const payload = {
      patientName: patientData.patientName,
      patientId: user._id,
      phoneNumber: patientData.phoneNumber,
      email: patientData.email,
      date: patientData.date,
      timeSlot: patientData.timeSlot,
    };

    dispatch(addAppointmentOptimistically(payload));
    navigate(`/user/${user._id}/appointments`);

    try {
      await dispatch(bookAppointmentThunk({ doctorId, patientData: payload }));
    } catch (error) {
      console.error("Error in booking appointment:", error);
      alert("Failed to book the appointment. Please try again.");
    }
  };

  const tileDisabled = ({ date }) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const today = new Date();
    const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const comparisonDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    return comparisonDate < currentDate || !availableDays.includes(dayName);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-800 to-blue-900">
      <div className="max-w-md w-full mx-4 bg-gradient-to-r from-green-900 to-blue-800 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-100 mb-6">Book an Appointment</h2>
        <p className="text-gray-200 mb-4">Doctor: {doctor?.name}</p>

        <input
          name="patientName"
          type="text"
          placeholder="Enter Patient's Name"
          value={patientData.patientName}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-gray-800 text-gray-200 focus:ring focus:ring-blue-300"
        />

        <input
          name="phoneNumber"
          type="tel"
          placeholder="Enter Patient's Phone Number"
          value={patientData.phoneNumber}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-gray-800 text-gray-200 focus:ring focus:ring-blue-300"
        />

        <input
          name="email"
          type="email"
          placeholder="Enter Patient's Email"
          value={patientData.email}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-gray-800 text-gray-200 focus:ring focus:ring-blue-300"
        />

        <div className="mb-4">
          <button
            type="button"
            onClick={() => setIsCalendarVisible(!isCalendarVisible)}
            className="flex items-center space-x-2 bg-gray-200 p-2 rounded-md hover:bg-gray-300"
          >
            <FaCalendarAlt className="text-xl" />
            <span>{patientData.date ? patientData.date : "Select a Date"}</span>
          </button>
        </div>

        {isCalendarVisible && (
          <div className="mb-4">
            <Calendar
              onChange={handleDateChange}
              value={patientData.date ? new Date(patientData.date) : new Date()}
              tileDisabled={tileDisabled}
              className="rounded-lg shadow-md"
            />
          </div>
        )}

        <select
          name="timeSlot"
          value={patientData.timeSlot}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-gray-800 text-gray-200 focus:ring focus:ring-blue-300"
        >
          <option value="">Select a Time Slot</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookAppointment;
