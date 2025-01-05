import React from 'react';
import { Link } from 'react-router-dom';

const ResetPasswordNotice = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-md shadow-lg text-center">
        <h2 className="text-2xl font-bold">Check Your Email</h2>
        <p className="mt-4">We’ve sent a password reset link to your email address. Click the link to reset your password.</p>
        <Link to="/login" className="mt-6 inline-block text-blue-500 hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordNotice;
