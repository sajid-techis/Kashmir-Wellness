import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfileThunk } from '../../features/users/userSlice';
import Header from '../common/Header';
import { toast } from 'react-toastify';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, token, status, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (token) {
            dispatch(getUserProfileThunk(token));
        } else {
            navigate('/login');
        }
    }, [token, dispatch, navigate]);

    if (status === 'Loading') {
        return <p className="text-center text-lg">Loading...</p>;
    }

    if (error) {
        toast.error(error);
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-custom-gradient">
            <Header />
            <div className="flex justify-center items-center flex-1 p-4">
                <div className="max-w-lg w-full bg-white shadow-2xl rounded-xl overflow-hidden">
                    <div className="bg-cover bg-center h-48" style={{ backgroundImage: `url(${userInfo?.image || 'default-background.jpg'})` }}>
                        <div className="flex justify-center items-end h-full bg-gradient-to-t from-black via-transparent to-transparent">
                            {userInfo?.image && (
                                <img
                                    className="h-32 w-32 rounded-full border-4 border-white mb-4"
                                    src={userInfo.image}
                                    alt="Profile"
                                />
                            )}
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-800">{userInfo?.name}</h2>
                            <p className="text-gray-600 text-sm">{userInfo?.email}</p>
                            <p className="text-gray-600 text-sm">{userInfo?.phoneNumber}</p>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
                            <p className="text-gray-700">{userInfo?.address}</p>
                            <p className="text-gray-700">{userInfo?.city}</p>
                            <p className="text-gray-700">{userInfo?.state}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
