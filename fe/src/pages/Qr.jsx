import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import axios from "axios";
import { FiArrowLeft } from 'react-icons/fi';
export default function Qr() {
    const location = useLocation();
    const navigate = useNavigate();
    const qrData = location.state?.data || {};
    const dataTicket = location.state?.ticket || {};
    const [paymentStatus, setPaymentStatus] = useState("pending"); // Set initial status to 'pending'
    const [intervalId, setIntervalId] = useState(null);
    // const [data, setData] = useState([]);
    
    const handlePaymentSuccess = () => {
        navigate("/invoice", {
            state: {
                invoiceData: qrData,
                dataTicket: dataTicket
            },
        });
    };
    useEffect(() => {
        const checkPaymentStatus = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/check-payment-status?qrCodeId=${qrData.id}`
                    // `https://backend.fexbfebui.id/api/check-payment-status?qrCodeId=${qrData.id}`
                );
                
                // Mengecek status pembayaran
                if (response.data.status === "INACTIVE") {
                    // Menyiapkan data untuk POST request
                    let dataUser = {
                        userId: localStorage.getItem("UserId"),
                        orderDetails: qrData.dataTicket,
                    };
        
                    // Mengirim data dengan metode POST
                    const responsePostOrder = await fetch("http://localhost:3000/order", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(dataUser),
                    });
        
                    // Memeriksa apakah POST request berhasil
                    if (!responsePostOrder.ok) {
                        throw new Error("Network response was not ok");
                    }
        
                    // Mengambil hasil dari POST request jika perlu
                    const result = await responsePostOrder.json();
                    console.log(result);
        
                    // Mengatur status pembayaran dan menangani pembayaran sukses
                    setPaymentStatus("INACTIVE");
                    handlePaymentSuccess(); // Trigger navigasi pada pembayaran sukses
                    clearInterval(intervalId); // Menghentikan interval pengecekan status pembayaran
                }
            } catch (error) {
                console.error("Error checking payment status:", error);
            }
        };

        const id = setInterval(checkPaymentStatus, 5000);
        setIntervalId(id);

        return () => clearInterval(id);
    }, [qrData.id]);

    return (
        <div className="backround-payment h-screen relative">
            <div className="relative flex">
             <button
                // Navigate to home
                onClick={() => navigate('/ticket-page')}
                className=" mt-5 ml-5 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700  flex items-center space-x-2"
            >
                <FiArrowLeft size={20} />  
                <span>Back</span>
            </button>
            </div>
            <div className="relative text-center mb-8">
                <div
                    className="absolute inset-0 flex items-center justify-center z-0"
                    style={{
                        backgroundImage:
                            "url('https://ik.imagekit.io/x6p94nrv0m/scroll-01%202.png?updatedAt=1720551838052')",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        height: "120px",
                    }}
                ></div>
                <h1 className="relative text-[50px] font-bold pt-6 text-black font-custom z-10">
                    Payment
                </h1>
            </div>
            <div className="flex flex-col justify-center items-center mt-10">
            <div className="relative p-2 rounded-3xl">
    <div className="absolute inset-0 rounded-[70px] bg-cover bg-center" style={{ backgroundImage: 'url(https://ik.imagekit.io/x6p94nrv0m/kotak%20qr.png?updatedAt=1723658581369)' }}></div>
    <div className="relative bg-blue-100 flex items-center justify-center rounded-[70px] p-6 w-80 h-72">
        <QRCode value={qrData?.qr_string} size={236} />
    </div>
</div>

                <div className="mt-8">
                    <div className="relative rounded-full p-[4px] bg-gradient-to-r from-[#CE89EC] to-[#1E2F61]">
                        <div className="bg-white rounded-full px-20 py-4 cursor-pointer">
                            <span className="text-lg font-bold font-customText text-gray-700">
                                Scan this QR code!
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
