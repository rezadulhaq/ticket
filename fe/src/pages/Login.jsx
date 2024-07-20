import React from 'react';
import '../index.css';
import { MdPerson, MdLock } from 'react-icons/md';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  return (
    <div className="backround-login flex flex-col items-center justify-center">
      <Navbar/>
      <div className="bg-[#E5EAEA] p-8 rounded-[70px] shadow-lg w-full max-w-md text-center mt-14">
        <h1 className="text-4xl font-bold mb-4 font-custom">Welcome, Dreamers</h1>
        <img src="https://ik.imagekit.io/x6p94nrv0m/Group%2066.png?updatedAt=1720116453393" alt="FEXB Logo" className="mx-auto mb-4 w-[300px]" />
        <p className="text-[25px] font-bold mb-8 font-custom">Let the journey begin</p>
        <form className="space-y-4">
        <div className="flex items-center bg-white  py-2 px-3 rounded-lg">
            <MdPerson className="text-gray-400 mr-3" size={24} />
            <input
              type="text"
              placeholder="Email/No. Handphone"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
          <div className="flex items-center bg-white  py-2 px-3 rounded-lg">
          <MdLock className="text-gray-400 mr-3" size={24} />
            <input
              type="password"
              placeholder="Password"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
          </div>
          <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-2 px-4 rounded-full w-full">
            Login
          </button>
          {/* <a href="#" className="text-blue-600 underline text-sm mt-4 block">Forgot Password?</a> */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
