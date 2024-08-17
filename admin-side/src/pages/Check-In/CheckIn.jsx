import { useEffect, useState } from "react";
import QrScanner from "qr-scanner";
import { FaUserCircle, FaQrcode, FaStop } from "react-icons/fa";
import {  toast } from 'react-toastify';


let stopScan = false;
let hasilScan = "";

export default function CheckIn() {
  const [btnScan, setBtnScan] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  console.log(orderDetails)
  const scanNow = async (isScan) => {
    setBtnScan(isScan);
    if (isScan) stopScan = true;
    if (btnScan === false) return;
    stopScan = false;
    await new Promise(r => setTimeout(r, 100));
    const videoElement = document.getElementById('scanView');
    const scanner = new QrScanner(
      videoElement,
      async result => {
        hasilScan = result.data;
        setBtnScan(true);
        stopScan = true;
        
        // Fetch data from the server when QR code is scanned
        console.log(hasilScan);
        
        if (hasilScan) {
          try {
            const response = await fetch(hasilScan, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ qrData: hasilScan }),
            });
            const data = await response.json();
            setOrderDetails(data);
            toast.success('Scan successful!'); // Menampilkan toast notification
          } catch (error) {
            console.error('Error fetching order details:', error);
            toast.error('Error fetching order details'); // Menampilkan toast error
          }
        }
      },
      {
        onDecodeError: error => {
          console.error(error);
        },
        maxScansPerSecond: 1,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        returnDetailedScanResult: true
      }
    );
    await scanner.start();
    while (stopScan === false) await new Promise(r => setTimeout(r, 100));
    scanner.stop();
    scanner.destroy();
  };

  return (
    <div className="relative h-screen w-full ml-[50px]">
      <header className="bg-blue-500 p-4 flex items-center w-full">
        <div className="flex items-center w-full">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-2">
            <FaUserCircle className="text-white text-3xl" />
          </div>
          <h1 className="text-white text-xl">Halo</h1>
        </div>
      </header>
      <main className="pt-16 flex flex-col items-start justify-start h-full">
        {!btnScan && (
          <video
            id="scanView"
            className="w-full h-full border-dotted border-4 border-gray-300"
          ></video>
        )}
        {btnScan && (
          <div className="p-4 w-full">
            <h2 className="text-xl">Hasil Scan:</h2>
            <p className="mt-2 text-lg">{hasilScan}</p>
            {orderDetails && (
    <div className="mt-4 bg-gray-200 p-3 w-full">
        <h3 className="text-lg font-bold">Order Details:</h3>
        <p><strong>Full Name:</strong> {orderDetails.fullName}</p>
        <p><strong>Phone Number:</strong> {orderDetails.phoneNumber}</p>
        <p><strong>Email:</strong> {orderDetails.email}</p>
        <p><strong>High School:</strong> {orderDetails.highSchool}</p>
        {/* <p><strong>Ticket Name:</strong> {orderDetails.TicketPrice.Ticket.name}</p>
        <p><strong>Ticket Price:</strong> {orderDetails.TicketPrice.price}</p> */}
        <p>
            <strong>Status Scan:</strong> {orderDetails.hasAttended ? 'Sudah Scan' : 'Belum Scan'}
        </p>
        {/* <p><strong>Order ID:</strong> {orderDetails.OrderId}</p> */}
        {/* <p><strong>Ticket Price ID:</strong> {orderDetails.TicketPriceId}</p> */}
        {/* <p><strong>Created At:</strong> {new Date(orderDetails.createdAt).toLocaleString()}</p> */}
        {/* <p><strong>Updated At:</strong> {new Date(orderDetails.updatedAt).toLocaleString()}</p> */}
    </div>
)}

          </div>
        )}
      </main>
      <button
        onClick={() => scanNow(!btnScan)}
        className={`fixed bottom-4 right-4 p-4 rounded-full ${btnScan ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'} transition-colors flex items-center justify-center`}
      >
        {btnScan ? <FaQrcode className="text-2xl" /> : <FaStop className="text-2xl" />}
      </button>

    </div>
  );
}


