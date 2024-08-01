import React, { useEffect } from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { useLocation } from "react-router-dom";

export default function Invoice() {
    const location = useLocation();
    const { invoiceData = {} } = location.state || {};

    useEffect(() => {
        console.log(invoiceData, "<<<<<<<<<<<<<<<<<");
    }, [invoiceData]);

    const generatePDF = async () => {
        if (!invoiceData.tickets) {
            console.error("No tickets data available to generate PDF.");
            return;
        }

        const doc = new jsPDF("p", "pt", "a4");
        const margin = 30;
        const ticketWidth = 500;
        const ticketHeight = 150; // Reduced height
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        let yOffset = margin;

        for (const [index, ticket] of invoiceData.tickets.entries()) {
            if (yOffset + ticketHeight + margin > pageHeight) {
                doc.addPage();
                yOffset = margin;
            }

            // Add a border line
            doc.setDrawColor(0);
            doc.setLineWidth(1);
            doc.line(
                margin,
                yOffset + ticketHeight + 10,
                pageWidth - margin,
                yOffset + ticketHeight + 10
            );

            // Add ticket title and slogan
            doc.setFontSize(16);
            doc.setFont("Arial", "bold");
            doc.text("FEB UI Event", margin + 20, yOffset + 30);
            doc.setFontSize(12);
            doc.setFont("Arial", "italic");
            doc.text("Your Gateway to Innovation!", margin + 20, yOffset + 50);

            // Add ticket details
            doc.setFontSize(12);
            doc.setFont("Arial", "normal");

            // Biodata section
            doc.text(`Name: ${invoiceData.name || "N/A"}`, margin + 20, yOffset + 80);
            doc.text(
                `Order Number: ${invoiceData.orderNumber || "N/A"}`,
                margin + 20,
                yOffset + 100
            );
            doc.text(
                `Order Date: ${invoiceData.orderDate || "N/A"}`,
                margin + 20,
                yOffset + 120
            );
            doc.text(`Ticket Type: ${ticket.type || "N/A"}`, margin + 20, yOffset + 140);

            // Add QR code
            try {
                const qrCodeDataUrl = await QRCode.toDataURL(
                    `${invoiceData.orderNumber || "N/A"}-${ticket.type || "N/A"}`
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

            yOffset += ticketHeight + margin;
        }

        doc.save("tickets.pdf");
    };

    return (
        <div className="invoice-container p-8 w-full h-auto bg-gray-100">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
                Invoice
            </h1>
            <div className="flex flex-col items-center">
                <div className="ticket-container p-4 px-6 rounded-lg bg-white shadow-lg w-full max-w-4xl">
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-4 mb-6">
                            <div className="border-b-2 border-gray-300 pb-4">
                                <p>
                                    <strong>Name:</strong> {invoiceData.dataTicket[0].fullName || "N/A"}
                                </p>
                                <p>
                                    <strong>Order Number:</strong>{" "}
                                    {invoiceData.orderNumber || "N/A"}
                                </p>
                                <p>
                                    <strong>Order Date:</strong>{" "}
                                    {invoiceData.orderDate || "N/A"}
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg text-white">
                            <div className="overflow-x-auto rounded-lg">
                                <table className="min-w-full border-2 border-gray-300">
                                    <thead className="bg-gray-700">
                                        <tr>
                                            <th className="px-4 py-2 border border-gray-400">
                                                Ticket Type
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoiceData.dataTicket ? (
                                            invoiceData.dataTicket.map(
                                                (ticket, index) => (
                                                    <tr
                                                        className="bg-gray-600"
                                                        key={index}
                                                    >
                                                        <td className="px-4 py-2 border border-gray-400">
                                                            {ticket.type}
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td className="px-4 py-2 border border-gray-400">
                                                    No tickets available
                                                </td>
                                            </tr>
                                        )}
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
            </div>
        </div>
    );
}
