// components/LogoutButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/users/userSlice';
import { toast } from 'react-toastify';

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged out successfully")
        navigate('/');
    };

    return (
        <button onClick={handleLogout} className="text-primary hover:text-secondary transition-all ease-in-out">
            Sign out
        </button>
    );
};

export default LogoutButton;
