import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom'; 
import { createLabAppointmentThunk } from '../../features/labAppointment/labAppointmentSlice';
import CustomSelect from '../common/CustomSelect';

const LabAppointments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { id: labId } = useParams();
    const location = useLocation();
    const { timeSlots = [], testsAvailable = [], labName } = location.state || {};
    const user = useSelector((state) => state.user.userInfo);
    const appointmentStatus = useSelector((state) => state.labAppointment.status); // Assuming status is in your slice
    
    const patientId = user?._id; 

    const [newAppointment, setNewAppointment] = useState({
        patientId: patientId,
        labId: labId,
        date: '',
        timeSlot: '',
        status: 'Pending',
        patientName: '',
        phoneNumber: '',
        email: '',
        selectedTests: [],
        labName: labName || '',
    });

    const handleInputChange = (e) => {
        setNewAppointment({
            ...newAppointment,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const appointmentData = {
            ...newAppointment,
            tests: newAppointment.selectedTests,
        };
        await dispatch(createLabAppointmentThunk(appointmentData));

        // Check if the appointment was created successfully
        if (appointmentStatus === 'Success') {
            navigate('/user/lab-appointments');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-800 to-blue-900">
            <div className="max-w-md w-full mx-4 bg-gradient-to-r from-green-900 to-blue-800 p-8 rounded-3xl shadow-2xl">
                <h2 className="text-4xl font-extrabold text-center text-gray-100 mb-6">Book Lab Appointment</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="labName"
                        value={newAppointment.labName}
                        readOnly
                        placeholder="Lab Name"
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-gray-800 text-gray-200 focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="date"
                        name="date"
                        value={newAppointment.date}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-gray-800 text-gray-200 focus:ring focus:ring-blue-300"
                    />
                    
                    {/* Use CustomSelect for Time Slots */}
                    <CustomSelect
                        options={timeSlots}
                        value={newAppointment.timeSlot}
                        onChange={(value) => setNewAppointment({ ...newAppointment, timeSlot: value })}
                        label="Select Time Slot"
                    />
                    
                    {/* Use CustomSelect for Tests Available */}
                    <CustomSelect
                        options={testsAvailable}
                        value={newAppointment.selectedTests.join(', ')} // Display selected tests as a comma-separated string
                        onChange={(value) => {
                            setNewAppointment((prev) => {
                                const newSelectedTests = prev.selectedTests.includes(value)
                                    ? prev.selectedTests.filter(test => test !== value)
                                    : [...prev.selectedTests, value];
                                return { ...prev, selectedTests: newSelectedTests };
                            });
                        }}
                        label="Select Tests"
                    />

                    <input
                        type="text"
                        name="patientName"
                        value={newAppointment.patientName}
                        onChange={handleInputChange}
                        placeholder="Patient Name"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-gray-800 text-gray-200 focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        value={newAppointment.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-gray-800 text-gray-200 focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="email"
                        name="email"
                        value={newAppointment.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-gray-800 text-gray-200 focus:ring focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Create Appointment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LabAppointments;
