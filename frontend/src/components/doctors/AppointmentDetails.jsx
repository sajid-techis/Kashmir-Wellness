import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentsByDoctorThunk } from '../../features/doctors/doctorSlice';

const DoctorAppointments = ({ doctorId }) => {
    const dispatch = useDispatch();
    const { appointments, status, error } = useSelector((state) => state.doctor);

    useEffect(() => {
        dispatch(getAppointmentsByDoctorThunk(doctorId));
    }, [dispatch, doctorId]);

    if (status === 'Loading') {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Appointments</h2>
            {appointments.length > 0 ? (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment.id}>
                            <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                            <p>Time Slot: {appointment.timeSlot}</p>
                            <p>Status: {appointment.status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No appointments found for this doctor.</p>
            )}
        </div>
    );
};

export default DoctorAppointments;
