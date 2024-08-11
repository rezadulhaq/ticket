import React, { useState } from 'react';

export default function AdminProfile() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    if (!formData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      errors.newPassword = 'New password must be at least 6 characters';
    }
    if (formData.confirmPassword !== formData.newPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage('');
    } else {
      console.log('Password Updated:', formData);
      // API call to change password goes here
      setSuccessMessage('Password updated successfully!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setErrors({});
    }
  };

  return (
    <div className='flex flex-col w-full lg:ml-12 ml-0 mt-20 lg:mt-0'>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Change-Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${
                errors.currentPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter current password"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm">{errors.currentPassword}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${
                errors.newPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">{errors.newPassword}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Change Password
          </button>

          {successMessage && (
            <p className="text-green-500 text-sm mt-4">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
    </div>
  );
}
