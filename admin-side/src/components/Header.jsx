import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {UserCircleIcon } from '@heroicons/react/20/solid'; // for Heroicons v2



const Header = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const {id} = useParams()
  // Function to get the title based on the pathname
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Ticket-List';
        case '/ticket-category': 
        return 'Ticket-Category'
        case '/user-list' : 
        return 'User-List'
        case '/order' : 
        return 'Order'
        case '/register-admin' : 
        return 'Register-Admin'
      default:
        return 'Dashboard'; // Default title
    }
  };

  return (
    <div className="h-[114px] w-full bg-[#03346E]  text-white border-b-4 border-black  lg:flex hidden">
      <div className="flex justify-between items-center w-full px-4">
        <div>
          <h1 className='font-bold border-b-2 border-white text-2xl font-sans'>{getTitle()}</h1>

        </div>
        <div className="flex flex-col justify-center items-center">
          <button onClick={() => navigate('/admin-profile')}>
          <UserCircleIcon className="w-10 h-10" color="white" />
          <span className="text-lg text-white">Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
