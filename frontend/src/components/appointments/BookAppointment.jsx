import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { bookAppointmentThunk } from '../../features/appointments/appointmentSlice'; 
import { getDoctorDetailsThunk } from '../../features/doctors/doctorSlice';
import { fetchAppointmentsForPatientThunk } from '../../features/appointments/appointmentSlice'; // Import the action to refetch appointments

const BookAppointment = () => {
    const { doctorId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const doctor = useSelector((state) => state.doctor.doctor);
    const user = useSelector((state) => state.user.userInfo);

    const [patientData, setPatientData] = useState({
        patientName: user?.name || "",
        phoneNumber: '',
        email: '',
        date: '',
        timeSlot: '',
    });

    const [timeSlots, setTimeSlots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                await dispatch(getDoctorDetailsThunk(doctorId));
            } catch (error) {
                console.error('Failed to fetch doctor details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorDetails();
    }, [doctorId, dispatch]);

    useEffect(() => {
        if (doctor && doctor.availability) {
            const generatedSlots = doctor.availability.hours || [];
            setTimeSlots(generatedSlots);
        }
    }, [doctor]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientData({ ...patientData, [name]: value });
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

        try {
            const response = await dispatch(bookAppointmentThunk({ doctorId, patientData: payload }));

            if (response.meta.requestStatus === 'fulfilled') {
                // Refetch appointments after successful booking
                dispatch(fetchAppointmentsForPatientThunk(user._id));
                navigate(`/user/${user._id}/appointments`);
            } else {
                console.error('Failed to book appointment:', response.payload?.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error in booking appointment:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>
            <p className="mb-4">Doctor: {doctor?.name || 'Loading...'}</p>

            <input
                name="patientName"
                type="text"
                placeholder="Enter Patient's Name"
                value={patientData.patientName}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <input
                name="phoneNumber"
                type="tel"
                placeholder="Enter Patient's Phone Number"
                value={patientData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <input
                name="email"
                type="email"
                placeholder="Enter Patient's Email"
                value={patientData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <input
                name="date"
                type="date"
                value={patientData.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <select
                name="timeSlot"
                value={patientData.timeSlot}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
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
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                Confirm Booking
            </button>
        </div>
    );
};

export default BookAppointment;
