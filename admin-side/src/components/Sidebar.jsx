import React, { useState } from 'react';
import {
  HomeIcon,
  TicketIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  ArchiveBoxIcon,
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  // Import icons for Check-in and Promo Code
  CalendarIcon, // Example icon for Check-in
  GiftIcon, // Example icon for Promo Code
} from '@heroicons/react/20/solid';

import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = (path) => {
    navigate(path);
    toggleSidebar();
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Overlay for sidebar in mobile mode */}
      <div
        className={`fixed bg-gray-800 bg-opacity-50 z-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 top-0 left-0 bg-[#03346E] w-64  z-50 transform transition-transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-center p-4 bg-[#03346E] border-b-4 border-[#021526] text-black">
          <img
            className="w-[160px] h-[60px] lg:w-[150px]"
            src="https://ik.imagekit.io/x6p94nrv0m/Group%2066.png?updatedAt=1720116453393"
            alt="event Logo"
          />
          <button onClick={toggleSidebar} className="lg:hidden">
            <XMarkIcon className="w-6 h-6" color="white" />
          </button>
        </div>

        {/* Menu List */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <a
            onClick={() => handleNavigate('/tickets')}
            className={`py-3 cursor-pointer text-white rounded flex items-center ${
              isActive('/tickets') ? 'bg-[#6EACDA]' : 'hover:bg-[#6EACDA]'
            }`}
          >
            <ClipboardDocumentListIcon className="w-6 h-6" />
            <span className="ml-2">Ticket List</span>
          </a>
          <a
            onClick={() => handleNavigate('/ticket-category')}
            className={`py-3 cursor-pointer text-white rounded flex items-center ${
              isActive('/ticket-category') ? 'bg-[#6EACDA]' : 'hover:bg-[#6EACDA]'
            }`}
          >
            <TicketIcon className="w-6 h-6" />
            <span className="ml-2">Ticket Category</span>
          </a>
          <a
            onClick={() => handleNavigate('/user-list')}
            className={`py-3 cursor-pointer text-white rounded flex items-center ${
              isActive('/user-list') ? 'bg-[#6EACDA]' : 'hover:bg-[#6EACDA]'
            }`}
          >
            <UserIcon className="w-6 h-6" />
            <span className="ml-2">User List</span>
          </a>
          <a
            onClick={() => handleNavigate('/order')}
            className={`py-3 cursor-pointer text-white rounded flex items-center ${
              isActive('/order') ? 'bg-[#6EACDA]' : 'hover:bg-[#6EACDA]'
            }`}
          >
            <ArchiveBoxIcon className="w-6 h-6" />
            <span className="ml-2">Order</span>
          </a>
          <a
            onClick={() => handleNavigate('/register-admin')}
            className={`py-3 cursor-pointer text-white rounded flex items-center ${
              isActive('/register-admin') ? 'bg-[#6EACDA]' : 'hover:bg-[#6EACDA]'
            }`}
          >
            <Cog8ToothIcon className="w-6 h-6" />
            <span className="ml-2">Register Admin</span>
          </a>

          {/* New Sidebar Items */}
          <a
            onClick={() => handleNavigate('/checkin')}
            className={`py-3 cursor-pointer text-white rounded flex items-center ${
              isActive('/checkin') ? 'bg-[#6EACDA]' : 'hover:bg-[#6EACDA]'
            }`}
          >
            <CalendarIcon className="w-6 h-6" />
            <span className="ml-2">Check-in</span>
          </a>
          <a
            onClick={() => handleNavigate('/promo-code')}
            className={`py-3 cursor-pointer text-white rounded flex items-center ${
              isActive('/promo-code') ? 'bg-[#6EACDA]' : 'hover:bg-[#6EACDA]'
            }`}
          >
            <GiftIcon className="w-6 h-6" />
            <span className="ml-2">Promo Code</span>
          </a>
        </nav>

        {/* Logout at the bottom */}
        <div className="p-4 mt-auto">
          <a
            onClick={handleLogout}
            className="py-2 text-white hover:bg-[#6EACDA] rounded flex items-center"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            <span className="ml-2">Logout</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto lg:ml-64">
        {/* Header for mobile mode */}
        <header className="flex fixed items-center justify-between p-4 bg-blue-800 text-white lg:hidden w-full z-10">
          <button onClick={toggleSidebar}>
            <Bars3Icon className="w-6 h-6" />
          </button>
          <img
            className="w-[140px] h-10"
            src="https://ik.imagekit.io/x6p94nrv0m/Group%2066.png?updatedAt=1720116453393"
            alt="Yestech Logo"
          />
        </header>
      </div>
    </div>
  );
}
