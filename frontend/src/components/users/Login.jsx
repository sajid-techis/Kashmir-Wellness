import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUserThunk } from '../../features/users/userSlice';


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error, token } = useSelector((state) => state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (token) {
            navigate('/'); 
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUserThunk({ email, password })).unwrap();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    {status === 'loading' ? 'Logging in...' : 'Login'}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
