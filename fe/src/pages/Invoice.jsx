import React from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { useLocation } from "react-router-dom";

export default function Invoice() {
    const location = useLocation();
    const { invoiceData = {} } = location.state || {};
    const { dataTicket = [] } = location.state || {}; // Data tiket yang tersedia

    const generatePDF = async () => {
        const doc = new jsPDF("p", "pt", "a4");
        const margin = 30;
        const ticketWidth = 500;
        const ticketHeight = 220; // Adjusted height
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        let yOffset = margin;
    
        console.log(dataTicket, "JJJJJJJJJ");
    
        // Define column widths
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
        <div className="backround-invoice p-8 w-full h-auto bg-gray-100">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
                Invoice
            </h1>
            <div className="flex flex-col items-center">
                <div className="ticket-container p-4 px-6 rounded-lg bg-white shadow-lg w-full max-w-4xl">
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-4 mb-6">
                            <div className="border-b-2 border-gray-300 pb-4">
                                Detail Ticket
                            </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg text-white">
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
            </div>
        </div>
    );
}
