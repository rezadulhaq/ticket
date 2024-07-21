import React from 'react';
import Navbar from '../components/Navbar';

const Register = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://ik.imagekit.io/x6p94nrv0m/LOGIN%20PAGE%20-%20DESKTOP%20(1).png?updatedAt=172054304876')" }}
    >
        <Navbar/>
      <div className="bg-white bg-opacity-70 px-8 py-6 mt-32 rounded-[35px] shadow-lg max-w-2xl w-full">
        <h2 className="text-center text-[30px] font-bold font-custom mb-4">Welcome, Dreamers!</h2>
        <form className='font-customText text-base'>
          <div className="mb-2">
            <label className="block text-gray-700">Name</label>
            <input className="w-full p-2  border border-gray-300 rounded-[15px] focus:outline-none" type="text" />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Highschool</label>
            <input className="w-full p-2 rounded-[15px] focus:outline-none border border-gray-300" type="text" />
          </div>
          <div className="mb-2 flex justify-between">
            <div className="w-full mr-2">
              <label className="block text-gray-700">Phone Number</label>
              <input className="w-full p-2 rounded-[15px] focus:outline-none border border-gray-300" type="text" />
            </div>
            <div className="w-full ml-2">
              <label className="block text-gray-700">ID Line</label>
              <input className="w-full p-2 rounded-[15px] focus:outline-none border border-gray-300" type="text" />
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Email</label>
            <input className="w-full p-2 rounded-[15px] focus:outline-none border border-gray-300" type="email" />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Password</label>
            <input className="w-full p-2 rounded-[15px] focus:outline-none border border-gray-300" type="password" />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Confirmed Password</label>
            <input className="w-full p-2 rounded-[15px] focus:outline-none border border-gray-300" type="password" />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded">Make An Account</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
