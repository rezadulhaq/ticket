import React, { useState } from "react";
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { BiCreditCard } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";

const TicketPage = () => {
  const [activeSection, setActiveSection] = useState(1);

  const handleSectionToggle = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };
  const navigate = useNavigate();

  return (
    <div className="backround-ticket p-4 sm:p-8">
      <div className="max-w-5xl mx-auto rounded-lg">
        {/* Header Section */}
        <div className="relative text-center mb-10">
          <div
            className="absolute inset-0 flex items-center justify-center z-0"
            style={{
              backgroundImage: "url('https://ik.imagekit.io/x6p94nrv0m/scroll-01%202.png?updatedAt=1720551838052')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: '120px'
            }}
          ></div>
          <h1 className="relative text-3xl sm:text-[50px] font-bold pt-10 text-black font-custom z-10">
            Tickets
          </h1>
        </div>

        {/* Ticket Details Section */}
        <div
          className="pb-5 bg-blue-950 rounded-lg mb-8 w-full bg-cover text-white"
          // style={{
          //   backgroundImage:
          //     "url('https://ik.imagekit.io/x6p94nrv0m/SUMMARY.png?updatedAt=1720635008652')",
          // }}
        >
           <div className="bg-gradient-custom px-10 py-1 mb-2 rounded-t-lg">
                  <h2 className="text-2xl font-bold flex items-center">
                    <AiOutlineUser className="mr-2" />
                    Ticket Info
                  </h2>
                </div>
          <div className="mb-4 mt-2 ml-4 sm:ml-10 mr-4 sm:mr-10 flex flex-col gap-5 font-semibold">
            <div className="flex justify-between">
              <span className="flex-1">
                TROFI (Try Out Organized by FEB UI) - IPA
              </span>
              <span className="flex-1 text-center">5</span>
              <span className="flex-1 text-right">75.000</span>
            </div>
            <div className="flex justify-between">
              <span className="flex-1">
                TROFI (Try Out Organized by FEB UI) - IPS
              </span>
              <span className="flex-1 text-center">3</span>
              <span className="flex-1 text-right">45.000</span>
            </div>
            <div className="flex justify-between">
              <span className="flex-1">
                FeBa (Faculty Exhibition at FEB UI)
              </span>
              <span className="flex-1 text-center">1</span>
              <span className="flex-1 text-right">50.000</span>
            </div>
            <div className="flex justify-between">
              <span className="flex-1">
                Paket SEKAWAN (5 Tiket TROFI) - IPS
              </span>
              <span className="flex-1 text-center">2</span>
              <span className="flex-1 text-right">120.000</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-10 ml-4 sm:ml-10">
            <div className="w-full sm:w-auto">
              <label htmlFor="referral-code" className="block mb-3 font-semibold">
                Bundling ( FExB + TROFI)
              </label>
              <input
                placeholder="Referral code"
                id="referral-code"
                type="text"
                className="text-black placeholder:font-semibold rounded-[20px] p-2 w-full sm:w-auto"
              />
            </div>
            <button className="bg-gradient-custom px-8 text-lg py-1.5 rounded-full font-bold shadow-lg mt-4 sm:mt-8">
              Apply
            </button>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row justify-center items-center">
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-[80px] mt-16">
              <div className="flex flex-col items-center">
                <h3 className="mb-2 text-xl font-bold">SUBTOTAL</h3>
                <button className="bg-gradient-custom px-14 text-lg py-3 rounded-full font-bold shadow-lg">470.000</button>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="mb-2 text-xl font-bold">DISCOUNT</h3>
                <button className="bg-gradient-custom px-14 text-lg py-3 rounded-full font-bold shadow-lg">(25.000)</button>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="mb-2 text-xl font-bold">TOTAL</h3>
                <button className="bg-gradient-custom px-14 text-lg py-3 rounded-full font-bold shadow-lg">445.000</button>
              </div>
            </div>
          </div>
        </div>

        {/* Buyer Info Section */}
        <div className="relative text-center mb-12">
          <div
            className="absolute inset-0 flex items-center justify-center z-0"
            style={{
              backgroundImage: "url('https://ik.imagekit.io/x6p94nrv0m/scroll-01%202.png?updatedAt=1720551838052')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: '120px'
            }}
          ></div>
          <h1 className="relative text-3xl sm:text-[40px] pt-10 font-custom font-bold text-black z-10">
            Buyer Info
          </h1>
        </div>

        <div className="mx-auto p-4">
          <div className="flex flex-col lg:flex-row justify-center items-center">
            <div className="flex w-full flex-col lg:flex-row">
              <div className="w-full lg:w-2/3 bg-[rgb(21,44,103)] text-white rounded-lg shadow-md mb-4 lg:mb-0 lg:mr-4">
                <div className="bg-gradient-custom px-10 py-1 mb-2 rounded-t-lg">
                  <h2 className="text-2xl font-bold flex items-center">
                    <AiOutlineUser className="mr-2" />
                    Buyer Info
                  </h2>
                </div>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-10 py-6">
                  <div className="col-span-1">
                    <label htmlFor="ticket-type" className="block">Ticket Type</label>
                    <select id="ticket-type" className="w-full px-4 py-2 border rounded">
                      <option>Choices</option>
                    </select>
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="id-line" className="block">ID Line</label>
                    <input id="id-line" type="text" className="w-full px-4 py-2 border rounded" />
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="name" className="block">Name</label>
                    <input id="name" type="text" className="w-full px-4 py-2 border rounded" />
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="phone" className="block">Phone Number</label>
                    <input id="phone" type="text" className="w-full px-4 py-2 border rounded" />
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="email" className="block">Email</label>
                    <input id="email" type="email" className="w-full px-4 py-2 border rounded" />
                  </div>
                  <div className="col-span-1">
                    <label htmlFor="highschool" className="block">Highschool</label>
                    <input id="highschool" type="text" className="w-full px-4 py-2 border rounded" />
                  </div>
                </form>
              </div>
              <div className="w-full lg:w-1/3 bg-[rgb(21,44,103)] text-white rounded-lg shadow-md">
                <div className="bg-gradient-custom py-1.5 rounded-t-lg">
                  <h2 className="text-2xl font-bold text-center text-white">Payment Method</h2>
                </div>
                <form className="px-6 pt-5">
                  <div className="mb-4">
                    <input type="radio" id="virtual-accounts" name="payment-method" value="virtual-accounts" />
                    <label htmlFor="virtual-accounts" className="ml-2">Virtual Accounts</label>
                  </div>
                  <div className="mb-4">
                    <input type="radio" id="credit-debit" name="payment-method" value="credit-debit" />
                    <label htmlFor="credit-debit" className="ml-2">Credit/Debit Card</label>
                  </div>
                  <div className="mb-4">
                    <input type="radio" id="e-wallets" name="payment-method" value="e-wallets" />
                    <label htmlFor="e-wallets" className="ml-2">E-Wallets</label>
                  </div>
                  <div className="mb-4">
                    <input type="radio" id="qris" name="payment-method" value="qris" />
                    <label htmlFor="qris" className="ml-2">QRIS</label>
                  </div>
                  <div className="mb-4">
                    <input type="radio" id="direct-debit" name="payment-method" value="direct-debit" />
                    <label htmlFor="direct-debit" className="ml-2">Direct Debit</label>
                  </div>
                  <div className="mb-4">
                    <input type="radio" id="paylater" name="payment-method" value="paylater" />
                    <label htmlFor="paylater" className="ml-2">Paylater</label>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end mr-4 sm:mr-16">
            <button onClick={() => navigate('/payment')} className="bg-gradient-custom font-bold font-customText text-lg sm:text-2xl rounded-[20px] text-white py-2 px-7">
              Continue Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;