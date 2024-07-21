// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <nav className="bg-custom-blue-50 px-6 py-2 fixed top-0 left-0 w-full z-10">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center cursor-pointer">
          <img onClick={() => navigate('/')} src="https://ik.imagekit.io/x6p94nrv0m/Group%2066.png?updatedAt=1720116453393" alt="Logo" className="w-24" />
        </div>
        <div className="flex space-x-4 ">
        <button onClick={() => navigate('/register')} className="bg-[#CCDAEA] text-[#1B42B6] font-bold py-1.5 px-5 rounded-md">Sign up</button>
        <button onClick={() => navigate('/login')} className="bg-[#1B42B6] text-white font-bold py-1.5 px-5 rounded-md">Log in</button>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
