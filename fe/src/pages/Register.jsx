import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate(); // Initialize navigate hook
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        lineId: "",
        fullName: "",
        phoneNumber: "",
        highSchool: "",
        confirmedPassword: '',
    });

    const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password' || name === 'confirmedPassword') {
      if (formData.password !== formData.confirmedPassword) {
        setError('Passwords do not match');
      } else {
        setError('');
      }
    }
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://backend.fexbfebui.id/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // alert("Registration successful!");
            navigate("/login"); 
            toast.success('Register Success', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
                });
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        // Validate passwords whenever they change
        if (formData.password && formData.confirmedPassword) {
          if (formData.password !== formData.confirmedPassword) {
            setError('Passwords do not match');
          } else {
            setError('');
          }
        }
      }, [formData.password, formData.confirmedPassword]);
    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
            style={{
                backgroundImage:
                    "url('https://ik.imagekit.io/x6p94nrv0m/LOGIN%20PAGE%20-%20DESKTOP%20(1).png?updatedAt=172054304876')",
            }}
        >
            <Navbar />
            <div className="bg-white bg-opacity-70 px-8 py-6 mt-32 rounded-[35px] shadow-lg max-w-2xl w-full">
                <h2 className="text-center text-[30px] font-bold font-custom mb-4">
                    Welcome, Dreamers!
                </h2>
                <form
                    className="font-customText text-base"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-2">
                        <label
                            htmlFor="userName"
                            className="block text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            id="userName"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-[15px] focus:outline-none"
                            type="text"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="highSchool"
                            className="block text-gray-700"
                        >
                            Highschool
                        </label>
                        <input
                            id="highSchool"
                            name="highSchool"
                            value={formData.highSchool}
                            onChange={handleChange}
                            className="w-full p-2 rounded-[15px] focus:outline-none border border-gray-300"
                            type="text"
                            required
                        />
                    </div>
                    <div className="mb-2 flex justify-between">
                        <div className="w-full mr-2">
                            <label
                                htmlFor="phoneNumber"
                                className="block text-gray-700"
                            >
                                Phone Number
                            </label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full p-2 rounded-[15px] focus:outline-none border border-gray-300"
                                type="text"
                                required
                            />
                        </div>
                        <div className="w-full ml-2">
                            <label
                                htmlFor="lineId"
                                className="block text-gray-700"
                            >
                                ID Line
                            </label>
                            <input
                                id="lineId"
                                name="lineId"
                                value={formData.lineId}
                                onChange={handleChange}
                                className="w-full p-2 rounded-[15px] focus:outline-none border border-gray-300"
                                type="text"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 rounded-[15px] focus:outline-none border border-gray-300"
                            type="email"
                            required
                        />
                    </div>
                    <div className="mb-2">
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 rounded-[15px] focus:outline-none border border-gray-300"
          type="password"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="confirmedPassword" className="block text-gray-700">
          Confirmed Password
        </label>
        {error && <p className="text-red-600 mb-1">{error}</p>} {/* Error message */}
        <input
          id="confirmedPassword"
          name="confirmedPassword"
          value={formData.confirmedPassword}
          onChange={handleChange}
          className="w-full p-2 rounded-[15px] focus:outline-none border border-gray-300"
          type="password"
          required
        />
      </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded"
                    >
                        Make An Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
