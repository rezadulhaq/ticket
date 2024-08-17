import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { useLocation, useNavigate } from "react-router-dom";
import { FaInfoCircle } from 'react-icons/fa';
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Invoice() {
    const navigate = useNavigate()
    const location = useLocation();
    const { invoiceData = {} } = location.state || {};
    const { dataTicket = [] } = location.state || {}; // Data tiket yang tersedia
    console.log(dataTicket,'data');
    const totalPrice = dataTicket?.reduce((acc, el) => acc + el.price, 0);
    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };
    const [user, setUser] = useState({})
    ;
    useEffect(() => {
        let dataUser = {};
        const getUser = async () => {
            try {
                const userId = localStorage.getItem("UserId");
                const response = await axios.get("http://localhost:3000/user/" + userId);
                const data = response.data;
                setUser(data);
                console.log(data, "lololo");
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        getUser();
    }, []);


    const generatePDF = async () => {
        const doc = new jsPDF("p", "pt", "a4");
        const margin = 30;
        const ticketWidth = 500;
        const ticketHeight = 220; // Adjusted height
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        let yOffset = margin;
    
        // console.log(dataTicket, "JJJJJJJJJ");

        
        const user= await getUser()
        console.log(user, "JJJJJJJJJ")
        const labelWidth = 150; // Width for labels to ensure alignment of ":"
        const valueX = margin + labelWidth + 20; // X position for values
    
        for (const [index, ticket] of dataTicket.entries()) {
            if (yOffset + ticketHeight + margin > pageHeight) {
                doc.addPage();
                yOffset = margin;
            }
    
            // Add ticket title and slogan
            doc.setFontSize(16);
            doc.setFont("Arial", "bold");
            doc.text("Faculty Exhibition at FEB UI", margin + 20, yOffset + 30);
            doc.setFontSize(12);
            doc.setFont("Arial", "italic");
            doc.text("Your Gateway to Innovation!", margin + 20, yOffset + 50);
    
            // Add ticket details
            doc.setFontSize(12);
            doc.setFont("Arial", "normal");
    
            // Biodata section
            const fields = [
                { label: 'Name', value: ticket.fullName },
                { label: 'Email', value: ticket.email },
                { label: 'Line Id', value: ticket.lineId },
                { label: 'Phone Number', value: ticket.phoneNumber },
                { label: 'High School', value: ticket.highSchool },
                { label: 'Ticket Type', value: ticket.ticketName }
            ];
    
            fields.forEach((field, index) => {
                const yPosition = yOffset + 80 + (index * 20); // Adjust vertical positioning
                
                // Add label and value to the PDF
                doc.text(field.label.padEnd(labelWidth, ' '), margin, yPosition);
                doc.text(`: ${field.value}`, margin + labelWidth, yPosition);
            });
    
            // Add QR code
            try {
                const qrCodeDataUrl = await QRCode.toDataURL(
                    `http://localhost:3000/admin/get-data-qr?outputscan=Ticket-${ticket.ticketId}-${ticket.fullName}-${ticket.ticketName}`
                );
                const base64ImageData = qrCodeDataUrl.split(",")[1];
    
                doc.addImage(
                    base64ImageData,
                    "PNG",
                    pageWidth - 130,
                    yOffset + 40,
                    100,
                    100
                ); // Adjusted QR code position and size
            } catch (error) {
                console.error("Error generating QR code:", error);
            }
    
            // Add a border line below the ticket
            doc.setDrawColor(0);
            doc.setLineWidth(1);
            doc.line(
                margin,
                yOffset + ticketHeight + 10,
                pageWidth - margin,
                yOffset + ticketHeight + 10
            );
    
            yOffset += ticketHeight + margin;
        }
    
        doc.save("tickets.pdf");
    };
    


    return (
        <div className="backround-invoice  w-full h-full sm:h-auto bg-black ">
            {/* <button
                onClick={() => navigate('/')}  // Navigate to home
                className="absolute top-4 left-4 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 cursor-pointer"
            >
                Back to Home
            </button> */}
        <div className="relative text-center mb-7 ">
                <div
                    className="absolute inset-0 flex items-center justify-center z-0"
                    style={{
                        backgroundImage:
                            "url('https://ik.imagekit.io/x6p94nrv0m/scroll-01%202.png?updatedAt=1720551838052')",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        height: "110px",
                    }}
                ></div>
                <h1 className="relative text-[35px] font-bold pt-6 text-black font-custom z-10">
                    Buyer Info
                </h1>
            </div>
                    <div className="text-center mb-5">
                        <h1 className="text-xl font-customText text-white">Thank tou for joining us in this journey</h1>
                    </div>
            <div
      className="flex flex-col items-center justify-center p-7 sm:p-0 h-auto bg-center bg-cover"
    //   style={{
    //     backgroundImage: 'url(https://images.unsplash.com/photo-1519666336592-e225a99dcd2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80)'
    //   }}
    >

      <div className="max-w-2xl w-full h-full max-h-md   bg-white rounded-3xl">
        <div className="flex flex-col">
          <div className="bg-blue-950 relative rounded-3xl  m-4">
            <div className="flex-none sm:flex">
              <div className="flex-auto justify-evenly">
                <div className="flex items-center justify-between bg-gradient-to-r from-[#97B5FB] to-[#A82E9F] rounded-t-lg ">
                <div className='flex items-center px-4 py-1  '>
      <span className='mr-3 rounded-full bg-white'>
        <FaInfoCircle className='text-blue-500' size={24} />
      </span>
      <h2 className='font-medium'>Detail Invoice:</h2>
    </div>
                </div>
                <div className="border-dashed border-b-2 my-5">
                <div className="absolute rounded-full w-5 h-5 bg-white -mt-2 -left-2"></div>
                <div className="absolute rounded-full w-5 h-5 bg-white -mt-2 -right-2"></div>
                </div>
                <div className="flex flex-row items-center p-4">
                <div className='bg-white rounded-xl flex flex-col ml-10 p-2 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-20 font-customText'>
        {dataTicket?.map((el,i) => {
            return (
<div>
        <div className='flex flex-col space-y-1'>
          <p>Name: {el?.fullName}</p>
          <p>Asal Sekolah: {el.highSchool}</p>
          <p>Email: {el.email}</p>
        </div>
        <div className='flex flex-col justify-end space-y-1 '>
          <p>No. Hp: {el.phoneNumber}</p>
          <p>
  Order Date: {new Date(el.orderCreate).toLocaleString('en-US', {
    weekday: 'long', // Example: "Monday"
    year: 'numeric', // Example: "2024"
    month: 'long',   // Example: "August"
    day: 'numeric',  // Example: "15"
    hour: '2-digit', // Example: "08 PM"
    minute: '2-digit', // Example: "15"
  })}
</p>

          <p>Payment Method: QRIS</p>
        </div>
</div>
            )
        })}
      </div>
    </div>
                </div>
                <div className=" border-dashed border-b-2 my-5 pt-5">
                  <div className="absolute rounded-full w-5 h-5 bg-white -mt-2 -left-2"></div>
                  <div className="absolute rounded-full w-5 h-5 bg-white -mt-2 -right-2"></div>
                </div>
                <div className="flex items-center p-4  text-sm">
                <div className='bg-[#ffffff] w-full p-4 rounded-lg'>
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border-2 border-black">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Jenis Tiket</th>
                <th className="px-4 py-2 border border-gray-300">Quantity</th>
                <th className="px-4 py-2 border border-gray-300">Price</th>
              </tr>
            </thead>
            <tbody className='text-black'>
              {dataTicket?.map((el,i) => {
                return (
              <tr className='bg-gradient-to-r from-[#97B5FB] to-[#A82E9F] '>
                <td className="px-4 py-2 border border-gray-300">{el.ticketName}</td>
                <td className="px-4 py-2 border border-gray-300">{el.quantity}</td>
                <td className="px-4 py-2 border border-gray-300">{rupiah(el.price)}</td>
              </tr>
                )
              })}
              <tr className='bg-white text-black'>
                <td className="px-4 py-2 border border-gray-300 font-bold">Total</td>
                <td className="px-4 py-2 border border-gray-300 font-bold"></td>
                <td className="px-4 py-2 border border-gray-300">{rupiah(totalPrice)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
                </div>
                <div className=" border-dashed border-b-2 my-10 pt-5">
                    <div className="flex text-center justify-center">

                    <h1 className="text-yellow-400 font-bold"> ! Harap Dowload Invoive Sebelum Meninggal Web Ini</h1>
                    </div>
                  <div className="absolute rounded-full w-5 h-5 bg-white -mt-2 -left-2"></div>
                  <div className="absolute rounded-full w-5 h-5 bg-white -mt-2 -right-2"></div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-10 mb-10">
      <button
                    onClick={generatePDF}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                >
                   Dwoload Invoice
                </button>
                <div className="text-center mt-5">
                <h1 className="font-custom text-2xl">See You On FExb 2025, Dream</h1>
            </div>
      </div>
    </div>
            {/* <div className="flex flex-col items-center">
                <div className="  bg-TicketIncoice bg-center bg-contain bg-no-repeat   w-full h-[450px]  ">
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-4 mb-6 sm:px-[270px]">
                            <div className="border-b-2 border-blue-950 pb-4">
                                Detail Ticket
                                <h1 className="font-bold text-red-500">! Harap Cetak Ticket Sebelum Meninggal Website ini </h1>
                            </div>
                        </div>
                        <div>

                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg text-white sm:mx-[250px]">
                            <div className="overflow-x-auto rounded-lg">
                                <table className="min-w-full border-2 border-gray-300">
                                    <thead className="bg-gray-700">
                                        <tr>
                                            <th className="px-4 py-2 border border-gray-400">
                                                Full Name
                                            </th>
                                            <th className="px-4 py-2 border border-gray-400">
                                                Ticket Type
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataTicket.map((ticket, index) => (
                                            <tr
                                                className="bg-gray-600"
                                                key={index}
                                            >
                                                <td className="px-4 py-2 border border-gray-400">
                                                    {ticket.fullName || "N/A"}
                                                </td>
                                                <td className="px-4 py-2 border border-gray-400">
                                                    {ticket.ticketName || "N/A"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={generatePDF}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                >
                    Cetak Tiket
                </button>
            </div> */}
           <div className="text-center pb-10">
            <h1 className="font-customText text-xl"> Jika belum mendapat invoice  dalam waktu 1 x 24 jam atau mengalami kendala dalam pemesan tiket, silakan hubungi OA @fexbfebui</h1>
           </div>
        </div>
    );
}