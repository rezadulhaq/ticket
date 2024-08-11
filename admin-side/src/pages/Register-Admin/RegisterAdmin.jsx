import React, { useState } from 'react';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';
import { postAdmin } from '../../stores/actionCreator';

export default function RegisterAdmin() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.username) {
      errors.username = 'Username is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Admin Registered:', formData);
      // Here you would typically make an API call to register the admin.
      await dispatch(postAdmin(formData))
      setFormData({
        username: '',
        email: '',
        password: '',
      });
      setErrors({});
    }
  };

  return (
    <div className='flex flex-col w-full lg:ml-12 ml-0 mt-20 lg:mt-0'>
        <Header/>
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Isi Data Berikut :</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter username"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
