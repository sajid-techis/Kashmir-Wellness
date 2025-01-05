import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import { toast } from 'react-toastify';

const baseUrl = import.meta.env.VITE_API_URL;

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail); 
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await axios.post(`${baseUrl}/users/verify`, { email, code });
      toast.success(response.data.message);

      // Store token for authenticated requests
      localStorage.setItem('token', response.data.token);
      localStorage.removeItem('userEmail'); 

      navigate('/profile'); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed!');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-800 to-blue-900 p-4">
      <form onSubmit={handleSubmit} className="p-8  bg-gradient-to-b from-blue-600 to-green-900 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Verify Your Account</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
          readOnly 
        />

        <input
          type="text"
          placeholder="Enter confirmation code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Spinner size="sm" /> : 'Verify'}
        </Button>
      </form>
    </div>
  );
};

export default VerifyAccount;
