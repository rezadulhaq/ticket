import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { MdPerson, MdLock } from "react-icons/md";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import axios from 'axios'; // Import axios

const LoginPage = () => {
    const navigate = useNavigate(); // Initialize navigate hook
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/user/login", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(response);
          

            const responseJSON = response.data;
            console.log(responseJSON);
            localStorage.setItem("access_token", responseJSON.accesstoken);
            localStorage.setItem("UserId", responseJSON.UserId);

            navigate("/"); // Navigate to landing page on successful login
            toast.success('Login Success', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });
            return { data: responseJSON };
        } catch (error) {
            console.error("Error:", error);
            toast.error('Login failed. Please try again.', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Bounce,
            });
        }
    };

    return (
        <div className="backround-login flex flex-col h-auto items-center justify-center ">
            <Navbar />
            <div className="mt-10 mb-10">
                <div className="bg-[#E5EAEA] p-8 rounded-[50px] shadow-lg w-full max-w-xl text-center ">
                    <h1 className="text-4xl font-bold mb-4 font-custom">
                        Welcome, Dreamers
                    </h1>
                    <img
                        src="https://ik.imagekit.io/x6p94nrv0m/LOGO%20FEXB%202025%20(OUTLINED).png?updatedAt=1723660027248"
                        alt="FEXB Logo"
                        className="mx-auto mb-4 h-[200px]"
                    />
                    <p className="text-[25px] font-bold mb-8 font-custom">
                        Let the journey begin
                    </p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex items-center bg-white py-2 px-3 rounded-lg">
                            <MdPerson className="text-gray-400 mr-3" size={24} />
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                required
                            />
                        </div>
                        <div className="flex items-center bg-white py-2 px-3 rounded-lg">
                            <MdLock className="text-gray-400 mr-3" size={24} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-2 px-4 rounded-full w-full"
                        >
                            Login
                        </button>
                        {/* <a href="#" className="text-blue-600 underline text-sm mt-4 block">Forgot Password?</a> */}
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
