import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("access_token"); // Or use a different method to get the token

    const handleLogout = () => {
        // Clear the access token from local storage
        localStorage.removeItem("access_token");
        // Redirect to the homepage or login page after logout
        navigate("/login");
        toast.success("Logout Success");
    };

    return (
        <nav className="bg-custom-blue-50 px-6 py-2 w-full z-10 shadow-md">
            <div className="mx-auto flex justify-between items-center">
                <div className="flex items-center cursor-pointer">
                    <img
                        onClick={() => navigate("/")}
                        src="https://ik.imagekit.io/x6p94nrv0m/LOGO%20FEXB%202025%20(OUTLINED).png?updatedAt=1723660027248"
                        alt="Logo"
                        className="w-28"
                    />
                </div>
                <div className="flex space-x-4">
                    {accessToken ? (
                        <>
                            <button
                                onClick={() => navigate("/my-orders")} // Add navigation to "My Orders"
                                className="bg-[#1B42B6] text-white font-bold py-1.5 px-5 rounded-md"
                            >
                                My Orders
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-[#1B42B6] text-white font-bold py-1.5 px-5 rounded-md"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate("/register")}
                                className="bg-[#CCDAEA] text-[#1B42B6] font-bold py-1.5 px-5 rounded-md"
                            >
                                Sign up
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-[#1B42B6] text-white font-bold py-1.5 px-5 rounded-md"
                            >
                                Log in
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
