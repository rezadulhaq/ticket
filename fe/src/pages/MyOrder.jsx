import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiDownload, FiChevronDown, FiChevronUp } from "react-icons/fi";
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

const MyOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userId = localStorage.getItem("UserId");
                const response = await fetch(
                    `http://localhost:3000/order/user/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }

                const data = await response.json();
                console.log(data, "<<<<"); // Check the structure of the data
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    const handleDownloadTicket = async (order) => {
        const doc = new jsPDF("p", "pt", "a4");
        const margin = 30;
        const ticketWidth = 500;
        const ticketHeight = 220; // Adjusted height
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        let yOffset = margin;

        // Sample data, replace with order details
        const dataTicket = order.OrderDetails;

        const labelWidth = 150; // Width for labels to ensure alignment of ":"
        const valueX = margin + labelWidth + 20; // X position for values

        for (const [index, ticket] of dataTicket.entries()) {
            console.log(ticket,"KKKKKK");
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
                { label: 'Ticket Type', value: ticket.TicketPrice.Ticket.name }
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
                    `http://localhost:3000/admin/get-data-qr?outputscan=Ticket-${ticket.TicketPrice.TicketId}-${ticket.fullName}-${ticket.TicketPrice.Ticket.name}`
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

    const toggleOrderDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (
        <div className="min-h-screen sm:bg-desktopTicket bg-mobileTicket w-full bg-center bg-repeat bg-cover p-4 sm:p-8">
            <div onClick={() => navigate("/")}>
                <button className="top-4 left-4 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 flex items-center space-x-2">
                    <FiArrowLeft size={20} />
                    <span>Back</span>
                </button>
            </div>

            <div className="max-w-4xl mx-auto flex flex-col">
                <div className="relative mb-8 text-center">
                    <div
                        className="absolute inset-0 flex items-center justify-center z-0"
                        style={{
                            backgroundImage:
                                "url('https://ik.imagekit.io/x6p94nrv0m/scroll-01%202.png?updatedAt=1720551838052')",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            height: "100px",
                        }}
                    ></div>
                    <h1 className="relative font-custom text-4xl pt-8 font-bold text-black z-12">
                        My Orders
                    </h1>
                </div>

                {orders.length === 0 ? (
                    <p className="text-center text-xl text-gray-700">
                        No orders found
                    </p>
                ) : (
                    orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-[#F4CD5C] py-6 px-4 rounded-lg text-black mb-6 shadow-lg flex flex-col gap-4"
                        >
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-bold">
                                    Order ID: {order.id}
                                </h2>
                                <button
                                    onClick={() => handleDownloadTicket(order)}
                                    className="flex items-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 text-sm font-semibold shadow-md"
                                >
                                    <FiDownload size={18} />
                                    <span className="ml-2">Download Ticket</span>
                                </button>
                            </div>
                            <p className="text-sm text-gray-700">
                                Date: {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                            <div className="relative">
                                <button
                                    onClick={() => toggleOrderDetails(order.id)}
                                    className="flex items-center text-sm font-semibold text-gray-800 hover:text-gray-600"
                                >
                                    {expandedOrder === order.id ? (
                                        <FiChevronUp size={18} />
                                    ) : (
                                        <FiChevronDown size={18} />
                                    )}
                                    <span className="ml-2">
                                        {expandedOrder === order.id ? 'Hide Details' : 'Show Details'}
                                    </span>
                                </button>
                                {expandedOrder === order.id && (
                                    <ul className="mt-4 space-y-2">
                                        {order.OrderDetails &&
                                        order.OrderDetails.length > 0 ? (
                                            order.OrderDetails.map((detail) => (
                                                <li
                                                    key={detail.id}
                                                    className="p-4 bg-white rounded-lg shadow-md border border-gray-300"
                                                >
                                                    <div className="mb-2">
                                                        <span className="font-bold">
                                                            Full Name:
                                                        </span> {detail.fullName}
                                                    </div>
                                                    <div className="mb-2">
                                                        <span className="font-bold">
                                                            Email:
                                                        </span> {detail.email}
                                                    </div>
                                                    <div className="mb-2">
                                                        <span className="font-bold">
                                                            Phone Number:
                                                        </span> {detail.phoneNumber}
                                                    </div>
                                                    <div>
                                                        <span className="font-bold">
                                                            High School:
                                                        </span> {detail.highSchool}
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <p>No details found</p>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyOrders;
