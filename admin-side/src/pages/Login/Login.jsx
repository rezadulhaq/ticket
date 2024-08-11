import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../../stores/actionCreator';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginAdmin(formData))
      navigate('/tickets')
      toast.success('Login Succesfuly')
    } catch (error) {
      console.log(error);
      setError('Failed to login. Please check your credentials.');
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#03346E] ">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center mb-6">
          <img
            src="https://ik.imagekit.io/x6p94nrv0m/Group%2066.png?updatedAt=1720116453393"
            alt="Logo"
            className="w-40 h-auto"
          />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
