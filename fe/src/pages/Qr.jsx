import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';

export default function Qr() {
  const location = useLocation();
  const navigate = useNavigate();
  const qrData = location.state?.data || {};

  const handlePaymentSuccess = () => {
    navigate('/invoice', { state: { invoiceData: qrData.invoiceData } });
  };

  // Simulasi polling atau metode lain untuk memeriksa status pembayaran
  React.useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        console.log("tes tes tes");
        const response = await fetch('http://localhost:3000/api/check-payment-status', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();

        if (data.status === 'paid') {
          handlePaymentSuccess();
        } else {
          // Jika status belum berhasil, lakukan polling ulang dalam interval tertentu
          setTimeout(checkPaymentStatus, 5000); // Cek setiap 5 detik
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };

    checkPaymentStatus();
  }, [navigate]);

  return (
    <div className="background-payment h-screen">
      <div className="relative text-center mb-8">
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
        <h1 className="relative text-[50px] font-bold pt-6 text-black font-custom z-10">
          Payment
        </h1>
      </div>
      <div className='flex flex-col justify-center items-center mt-10'>
        <div className="relative p-2 rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-200 to-blue-300 rounded-[70px]"></div>
          <div className="relative bg-blue-100 flex items-center justify-center rounded-[70px] p-6 w-80 h-72">
            <QRCode value={qrData?.qr_string} size={236} />
          </div>
        </div>
        <div className='mt-8'>
          <div className="relative rounded-full p-[4px] bg-gradient-to-r from-pink-200 to-blue-300">
            <div className="bg-white rounded-full px-20 py-4 cursor-pointer">
              <span className="text-lg font-bold font-customText text-gray-700">Scan this QR code!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
