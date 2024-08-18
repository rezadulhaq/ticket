import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../../stores/actionCreator';
import { FaCheck, FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export default function OrderList() {
  const dispatch = useDispatch();
  const { Orders } = useSelector(state => state.Orders);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  const handleDownloadTicket = async (ticket) => {
    const doc = new jsPDF("p", "pt", "a4");
    const margin = 30;
    const ticketWidth = 500;
    const ticketHeight = 220;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let yOffset = margin;

    const fields = [
      { label: 'Name', value: ticket.fullName },
      { label: 'Email', value: ticket.email },
      { label: 'Line Id', value: ticket.lineId },
      { label: 'Phone Number', value: ticket.phoneNumber },
      { label: 'High School', value: ticket.highSchool },
      { label: 'Ticket Type', value: ticket.ticketName }
    ];

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
    
    const labelWidth = 150;
    fields.forEach((field, index) => {
      const yPosition = yOffset + 80 + (index * 20);
      doc.text(field.label.padEnd(labelWidth, ' '), margin, yPosition);
      doc.text(`: ${field.value}`, margin + labelWidth, yPosition);
    });

    // Add QR code
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(
        `http://localhost:3000/admin/get-data-qr?outputscan=Ticket-${ticket.id}-${ticket.fullName}-${ticket.ticketName}`
      );
      const base64ImageData = qrCodeDataUrl.split(",")[1];
      doc.addImage(
        base64ImageData,
        "PNG",
        pageWidth - 130,
        yOffset + 40,
        100,
        100
      );
    } catch (error) {
      console.error("Error generating QR code:", error);
    }

    doc.save("ticket.pdf");
  };

  return (
    <div className="flex flex-col w-full lg:ml-12 ml-0 mt-20 lg:mt-0">
      <Header />
      <div className='lg:p-10 bg-slate-100 h-full relative'>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Ticket ID
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Line Id
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Phone Number
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  High School
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Created At
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {Orders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-4 text-center text-gray-700">
                    No data available
                  </td>
                </tr>
              ) : (
                Orders.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {ticket.id}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {ticket.fullName}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {ticket.email}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {ticket.lineId}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {ticket.phoneNumber}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {ticket.highSchool}
                    </td>
                    {/* <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
  {ticket.hasAttended ? (
    <FaCheck className="text-green-500" />
  ) : (
    <FaTimes className="text-red-500" />
  )}
</td> */}
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      <button
                        onClick={() => handleDownloadTicket(ticket)}
                        className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 text-sm font-semibold shadow-md"
                      >
                        Download Ticket
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
