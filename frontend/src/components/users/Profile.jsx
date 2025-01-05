import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfileThunk } from "../../features/users/userSlice";
import { toast } from "react-toastify";
import UserAppointments from "../appointments/UserAppointments";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FidgetSpinner } from "react-loader-spinner"; 
import UserLabAppointments from "../labAppointment/UserLabAppointments";

// Import default images at the top
import defaultBackground from '../../assets/images/Logo4.jpeg'; // Adjust path if necessary
import defaultProfileImage from '../../assets/images/Logo3.jpeg'; // Adjust path if necessary

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, token, status, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (token) {
            dispatch(getUserProfileThunk(token));
        } else {
            navigate("/login");
        }
    }, [token, dispatch, navigate]);

    if (status === "Loading") {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-800 to-blue-900">
                <FidgetSpinner visible={true} height="80" width="80" ariaLabel="loading" />
            </div>
        );
    }

    if (error) {
        toast.error(error);
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-800 to-blue-900">
            <div className="flex justify-center items-center flex-1 p-4">
                <div className="max-w-lg w-full bg-gradient-to-r from-green-900 to-blue-800 shadow-2xl rounded-3xl overflow-hidden">
                    <div
                        className="relative bg-cover bg-center h-48"
                        style={{ backgroundImage: `url(${userInfo?.image || defaultBackground})` }}
                    >
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                            <img
                                className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
                                src={userInfo?.image || defaultProfileImage} // Use imported default image
                                alt="Profile"
                            />
                        </div>
                    </div>
                    <div className="p-6 mt-16 text-gray-100">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold">{userInfo?.name}</h2>
                            <p className="text-gray-200 text-sm mt-2 flex items-center justify-center gap-2">
                                <FaEnvelope className="text-indigo-300" /> {userInfo?.email}
                            </p>
                            <p className="text-gray-200 text-sm mt-2 flex items-center justify-center gap-2">
                                <FaPhoneAlt className="text-green-400" /> {userInfo?.phoneNumber}
                            </p>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold mb-2">Address</h3>
                            <p className="text-gray-200 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-red-400" /> {userInfo?.address}, {userInfo?.city}, {userInfo?.state}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Render UserAppointments */}
            <div className="p-4 pb-24">
                <UserAppointments patientId={userInfo?._id} />
            </div>

            <div className="p-4 pb-24">
                <UserLabAppointments patientId={userInfo?._id} />
            </div>
        </div>
    );
};

export default Profile;
