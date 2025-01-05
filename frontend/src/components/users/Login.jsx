import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUserThunk } from '../../features/users/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, token } = useSelector((state) => state.user);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUserThunk(data)).unwrap();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-800 to-blue-900">
      <div className="max-w-md w-full mx-4 bg-gradient-to-r from-green-900 to-blue-800 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-100 mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-300 focus:border-blue-300 ${errors.email ? 'border-red-500' : 'border-transparent'}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'Password is required' })}
              className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-300 focus:border-blue-300 ${errors.password ? 'border-red-500' : 'border-transparent'}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </form>
        <div className="flex my-4">
          <Link to="/forgot-password" className="text-blue-300 hover:underline">
            Forgot Password?
          </Link>
          </div>
          <div className="flex items-center justify-between my-4">
          <div className="flex items-center gap-2">
            <p className="text-gray-200">Don't have an account?</p>
            <Link to="/register" className="text-blue-300 hover:underline">
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
